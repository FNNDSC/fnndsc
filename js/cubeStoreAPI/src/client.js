/** * Imports ***/
import Collection from './cj';
import Request from './request';

/**
 * Chris store object.
 *
 * @module client
 */
export default class StoreClient {
  /**
   * Constructor
   */
  constructor(store_url, username = '', password = '', timeout = 30000) {
    this.store_url = store_url;
    this.store_query_url = store_url + 'search/';
    this.username = username;
    this.password = password;
    this.timeout = timeout;
    this.contentType = 'application/vnd.collection+json';
  }

  /**
   * Get a plugin's information (descriptors and parameters) given its ChRIS
   * store name.
   *
   * @param {*} pluginName
   * @return {*}
   */
  getPlugin(pluginName) {
    const searchParams = { name: pluginName };

    return new Promise((resolve, reject) => {
      let plugin;
      const resp = this.getPlugins(searchParams);

      resp
        .then(plugins => {
          if (plugins.length) {
            plugin = plugins[0]; /*plugin names are unique*/
          }
          resolve(plugin);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Get the data (descriptors and parameters) of a list of plugins given
   * query search parameters. If no search parameters is given then return
   * all plugins in the store.
   *
   * @param {*} searchParams
   * @return {*}
   */
  getPlugins(searchParams) {
    const self = this;
    const auth = { username: this.username, password: this.password };
    const req = new Request(auth, this.contentType, this.timeout);

    return new Promise(function(resolve, reject) {
      StoreClient._runAsyncTask(function*() {
        let resp;
        let pluginList;

        try {
          if (searchParams) {
            resp = yield req.get(self.store_query_url, searchParams);
          } else {
            resp = yield req.get(self.store_url);
            let allPluginsUrl = Collection.getLinkRelationUrls(resp.collection, 'all_plugins')[0];
            resp = yield req.get(allPluginsUrl);
          }
          // follow the 'parameters' link relation in each collection document
          pluginList = yield self._getItemsFromPaginatedCollections(resp.collection, [
            'parameters',
          ]);
        } catch (ex) {
          reject(ex);
        }

        resolve(pluginList);
      });
    });
  }

  /**
   * Recursively get the data (descriptors and related item's descriptors) of
   * all the items in a linked list of paginated collections.
   *
   * @param {*} coll
   * @param {*} followLinkRelations
   * @return {*}
   */
  _getItemsFromPaginatedCollections(coll, followLinkRelations = []) {
    const self = this;
    const auth = { username: this.username, password: this.password };
    const req = new Request(auth, this.contentType, this.timeout);
    const ix = followLinkRelations.indexOf('next');

    if (ix !== -1) {
      followLinkRelations.splice(ix, 1);
    }

    function getItemsFromPaginatedColl(collObj) {
      let itemList = [];

      return new Promise((resolve, reject) => {
        StoreClient._runAsyncTask(function*() {
          try {
            // execution stops here before collections is assigned, and resumed in _runAsyncTask
            let collections = yield self._getPaginatedCollections(collObj); // wait for resp

            for (let collection of collections) {
              let itemObjList = [];
              let items = collection.items;

              // for each item get its data and the data of all related items in a depth-first search
              for (let item of items) {
                let itemObj = Collection.getItemDescriptors(item);

                for (let link_relation of followLinkRelations) {
                  let related_urls = Collection.getLinkRelationUrls(item, link_relation);

                  if (related_urls.length && !(link_relation in itemObj)) {
                    // assumes link relations and descriptors in an item never have the same name
                    itemObj[link_relation] = [];
                  }
                  for (let url of related_urls) {
                    let resp = yield req.get(url); // wait for resp
                    let newItemList = yield getItemsFromPaginatedColl(resp.collection); // wait for resp
                    itemObj[link_relation] = itemObj[link_relation].concat(newItemList);
                  }
                }
                itemObjList.push(itemObj);
              }
              itemList = itemList.concat(itemObjList);
            }
          } catch (ex) {
            reject(ex);
          }
          resolve(itemList);
        });
      });
    }

    // start the recursive process
    return getItemsFromPaginatedColl(coll);
  }

  /**
   * Get a list of paginated collections.
   *
   * @param {*} coll
   * @return {*}
   */
  _getPaginatedCollections(coll) {
    let collections = [coll];
    const auth = { username: this.username, password: this.password };
    const req = new Request(auth, this.contentType, this.timeout);

    return new Promise(function(resolve, reject) {
      StoreClient._runAsyncTask(function*() {
        try {
          let nextPageUrls = Collection.getLinkRelationUrls(coll, 'next');

          while (nextPageUrls.length) {
            // there is only a single next page
            // execution stops here before resp is assigned, and resumed in _runAsyncTask
            let resp = yield req.get(nextPageUrls[0]);
            collections = collections.concat(resp.collection);
            nextPageUrls = Collection.getLinkRelationUrls(resp.collection, 'next');
          }
        } catch (ex) {
          reject(ex);
        }

        resolve(collections);
      });
    });
  }

  /**
   * Create a new store user account.
   *
   * @param {*} username
   * @param {*} password
   * @param {*} email
   * @return {*}
   */
  createUser(username, password, email) {}

  /**
   * Get a user's information.
   *
   * @param {*} username
   * @return {*}
   */
  getUser(username) {}

  /**
   * Get a user's login authorization token.
   *
   * @return {*}
   */
  getAuthToken() {}

  /**
   * Run asynchronous task defined by a task generator function.
   *
   * @param {*} taskGenerator
   * @return {*}
   */
  static _runAsyncTask(taskGenerator) {
    // create the iterator
    let task = taskGenerator();
    // start the task
    let result = task.next();

    // recursive function to iterate through
    (function step() {
      // if there's more to do (result.value and result.done are iterator's properties)
      if (!result.done) {
        result.value
          .then(resp => {
            result = task.next(resp); // send this resp value to the yield
            step();
          })
          .catch(error => {
            result = task.throw(error); // throws error within taskGenerator generator
            step();
          });
      }
    })(); // start the recursive process by calling it immediatly
  }

  /*export const login = credentials => {
    return axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
      // process response somehow
    });
  };*/
}
