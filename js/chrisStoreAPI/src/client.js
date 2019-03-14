/** * Imports ***/
import Collection from './cj';
import Request from './request';
import StoreRequestException from './exception';

/**
 * Chris store object.
 *
 * @module client
 */
export default class StoreClient {
  /**
   * Constructor
   *
   * @param {string} storeUrl - url of the ChRIS storeservice
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   * @param {number} [timeout=30000] - request timeout
   */
  constructor(storeUrl, auth = null, timeout = 30000) {
    this.storeUrl = storeUrl;
    this.storeQueryUrl = storeUrl + 'search/';
    this.auth = auth;
    this.timeout = timeout;
    this.contentType = 'application/vnd.collection+json';
  }

  /**
   * Get a plugin's information (descriptors and parameters) given its ChRIS
   * store id.
   *
   * @param {number} id - plugin id
   * @return {Object} - JS Promise
   */
  getPlugin(id) {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        const req = new Request(self.auth, self.contentType, self.timeout);
        const searchParams = { id: id };
        let plugin;

        try {
          const resp = yield req.get(self.storeQueryUrl, searchParams);
          const coll = resp.data.collection;

          if (coll.items.length) {
            const item = coll.items[0];
            plugin = Collection.getItemDescriptors(item);
            const parametersLinks = Collection.getLinkRelationUrls(item, 'parameters');

            if (parametersLinks.length) {
              const paramList = yield self._getParameters(parametersLinks[0]); // there can only be a single parameters link
              plugin.parameters = paramList;
            }
          } else {
            const errMsg = 'Could not find plugin with id: ' + id;
            throw new StoreRequestException(errMsg);
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(plugin);
      });
    });
  }

  /**
   * Get a paginated list of plugin data (descriptors) given query search
   * parameters. If no search parameters is given then get a paginated list
   * of all plugins in the store. callback function, if provided, is called for
   * each page and passed an argument object containing the plugin list for that
   * page.
   *
   * @param {Object} [searchParams=null] - search parameters,
   * @param {function(pluginList: Object)} [callback=null]
   * @return {Object} - JS Promise
   */
  getPlugins(searchParams = null, callback = null) {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        let pluginList = [];
        let resp;

        try {
          resp = yield self.getPluginsInitialPage(searchParams);
          pluginList = pluginList.concat(resp.plugins);
          if (callback) {
            callback(resp);
          }
          while (resp.nextLink) {
            resp = yield self.getPluginsPage(resp.nextLink);
            pluginList = pluginList.concat(resp.plugins);
            if (callback) {
              callback(resp);
            }
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(pluginList);
      });
    });
  }

  /**
   * Add a new plugin to the ChRIS store.
   *
   * @param {string} name - plugin name
   * @param {string} dockImage - plugin docker image
   * @param {Object} descriptorFile - file blob
   * @param {string} publicRepo - url of the plugin public repository
   * @return {Object} - JS Promise
   */
  addPlugin(name, dockImage, descriptorFile, publicRepo) {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        const req = new Request(self.auth, self.contentType, self.timeout);
        const data = {
          name: name,
          dock_image: dockImage,
          public_repo: publicRepo,
        };
        let resp;

        try {
          resp = yield req.get(self.storeUrl);
          const coll = resp.data.collection;
          const userPluginsUrls = Collection.getLinkRelationUrls(coll, 'user_plugins');

          if (userPluginsUrls.length) {
            // use userPluginsUrls[0] bc there can only be a single user_plugins url
            resp = yield req.post(userPluginsUrls[0], data, { descriptor_file: descriptorFile });
          } else {
            const errMsg = 'Could not find url for POST request. Make sure you are authenticated';
            throw new StoreRequestException(errMsg);
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(resp.data.collection);
      });
    });
  }

  /**
   * Modify an existing plugin in the ChRIS store.
   *
   * @param {number} id - plugin id
   * @param {string} dockImage - plugin docker image
   * @param {string} publicRepo - url of the plugin public repository
   * @param {string} newOwner - username of a new owner for the plugin
   * @return {Object} - JS Promise
   */
  modifyPlugin(id, dockImage = '', publicRepo = '', newOwner = '') {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        const req = new Request(self.auth, self.contentType, self.timeout);
        let resp;

        try {
          const searchParams = { id: id };
          resp = yield req.get(self.storeQueryUrl, searchParams);
          const coll = resp.data.collection;

          if (coll.items.length) {
            const url = coll.items[0].href;
            let data = {};

            if (dockImage) {
              data.dock_image = dockImage;
            } else {
              data.dock_image = coll.items[0].data.filter(descriptor => {
                return descriptor.name === 'dock_image';
              })[0].value;
            }
            if (publicRepo) {
              data.public_repo = publicRepo;
            } else {
              data.public_repo = coll.items[0].data.filter(descriptor => {
                return descriptor.name === 'public_repo';
              })[0].value;
            }
            if (newOwner) {
              data.owner = newOwner;
            }

            if (self.contentType === 'application/vnd.collection+json') {
              data = { template: Collection.makeTemplate(data) };
            }
            resp = yield req.put(url, data);
          } else {
            const errMsg = 'Could not find plugin with id: ' + id;
            throw new StoreRequestException(errMsg);
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(resp.data.collection);
      });
    });
  }

  /**
   * Remove an existing plugin from the ChRIS store.
   *
   * @param {number} id - plugin id
   * @return {Object} - JS Promise
   */
  removePlugin(id) {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        const req = new Request(self.auth, self.contentType, self.timeout);
        const searchParams = { id: id };
        let resp;

        try {
          resp = yield req.get(self.storeQueryUrl, searchParams);
          const coll = resp.data.collection;

          if (coll.items.length) {
            const url = coll.items[0].href;
            resp = yield req.delete(url);
          } else {
            const errMsg = 'Could not find plugin with id: ' + id;
            throw new StoreRequestException(errMsg);
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve();
      });
    });
  }

  /**
   * Get the first page of a paginated list of plugin data (descriptors) given
   * query search parameters. If no search parameters is given then return the
   * first page of a paginated list of all plugins in the store.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @return {Object} - JS Promise
   */
  getPluginsInitialPage(searchParams = null) {
    return this._getPluginsPage(undefined, searchParams);
  }

  /**
   * Get the single page corresponding to the url argument from a paginated list
   * of plugin data (descriptors).
   *
   * @param {string} url - url of the page
   * @return {Object} - JS Promise
   */
  getPluginsPage(url) {
    return this._getPluginsPage(url);
  }

  /**
   * Internal method to get a paginated list of plugin data (descriptors) given
   * query search parameters. If no search parameters is given then return a
   * paginated list of all plugins in the store.
   *
   * @param {string} url - url
   * @param {Object} [searchParams=null] - search parameters
   * @return {Object} - JS Promise
   */
  _getPluginsPage(url, searchParams = null) {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        const req = new Request(self.auth, self.contentType, self.timeout);
        const pluginList = [];
        let resp;
        let coll;

        try {
          if (url) {
            resp = yield req.get(url);
          } else if (searchParams) {
            // then it's a query and should use the query url
            resp = yield req.get(self.storeQueryUrl, searchParams);
          } else {
            resp = yield req.get(self.storeUrl);
          }
          coll = resp.data.collection;
          // for each plugin item get its data
          for (let item of coll.items) {
            pluginList.push(Collection.getItemDescriptors(item));
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        let nextLink = '';
        let next = Collection.getLinkRelationUrls(coll, 'next');
        if (next.length) {
          nextLink = next[0];
        }

        let previousLink = '';
        let previous = Collection.getLinkRelationUrls(coll, 'previous');
        if (previous.length) {
          previousLink = previous[0];
        }

        resolve({
          plugins: pluginList,
          nextLink: nextLink,
          currentLink: coll.href,
          previousLink: previousLink,
        });
      });
    });
  }

  /**
   * Internal method to get the list of the parameters data given the url of
   * the parameters.
   *
   * @param {string} url - url of the plugin parameters
   * @return {Object} - JS Promise
   */
  _getParameters(url) {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        const req = new Request(self.auth, self.contentType, self.timeout);
        let paramList;

        try {
          const resp = yield req.get(url); // there can only be a single parameters link

          paramList = yield self._getItemsFromPaginatedCollections(resp.data.collection);
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(paramList);
      });
    });
  }

  /**
   * Internal method to tet the initial collection in a linked list of paginated
   * collections.
   *
   * @param {string} url - url
   * @param {Object} [searchParams=null] - search parameters
   * @return {Object} - JS Promise
   */
  _getInitialCollection(url, searchParams = null) {
    const self = this;

    return new Promise(function(resolve, reject) {
      const req = new Request(self.auth, self.contentType, self.timeout);
      const result = req.get(url, searchParams);

      result
        .then(resp => {
          resolve(resp.data.collection);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Internal method to get the next collection in a linked list of paginated
   * collections.
   *
   * @param {Object} coll - collection object
   * @return {Object} - JS Promise
   */
  _getNextCollection(coll) {
    const self = this;

    return new Promise(function(resolve, reject) {
      const req = new Request(self.auth, self.contentType, self.timeout);
      let nextPageUrls = Collection.getLinkRelationUrls(coll, 'next');

      const result = req.get(nextPageUrls[0]);

      result
        .then(resp => {
          resolve(resp.data.collection);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Internal method to recursively get the data (descriptors and related item's
   * descriptors) of all the items in a linked list of paginated collections.
   *
   * @param {Object} coll - collection object
   * @param {string[]} followLinkRelations - array of link relation names
   * @return {Object} - JS Promise
   */
  _getItemsFromPaginatedCollections(coll, followLinkRelations = []) {
    const self = this;
    const req = new Request(this.auth, this.contentType, this.timeout);
    const ix = followLinkRelations.indexOf('next');

    if (ix !== -1) {
      followLinkRelations.splice(ix, 1);
    }

    function getItemsFromPaginatedColl(collObj) {
      let itemList = [];

      return new Promise((resolve, reject) => {
        StoreClient.runAsyncTask(function*() {
          try {
            // execution stops here before collections is assigned, and resumed in runAsyncTask
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
                    let newItemList = yield getItemsFromPaginatedColl(resp.data.collection); // wait for resp
                    itemObj[link_relation] = itemObj[link_relation].concat(newItemList);
                  }
                }
                itemObjList.push(itemObj);
              }
              itemList = itemList.concat(itemObjList);
            }
          } catch (ex) {
            reject(ex);
            return;
          }

          resolve(itemList);
        });
      });
    }

    // start the recursive process
    return getItemsFromPaginatedColl(coll);
  }

  /**
   * Get a full list of paginated collections.
   *
   * @param {Object} coll - collection object
   * @return {Object} - JS Promise
   */
  _getPaginatedCollections(coll) {
    let collections = [coll];
    const req = new Request(this.auth, this.contentType, this.timeout);

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        try {
          let nextPageUrls = Collection.getLinkRelationUrls(coll, 'next');

          while (nextPageUrls.length) {
            // there is only a single next page
            // execution stops here before resp is assigned, and resumed in runAsyncTask
            let resp = yield req.get(nextPageUrls[0]);
            collections = collections.concat(resp.data.collection);
            nextPageUrls = Collection.getLinkRelationUrls(resp.data.collection, 'next');
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(collections);
      });
    });
  }

  /**
   * Get currently authenticated user's information.
   *
   * @return {Object} - JS Promise
   */
  getUser() {
    const storeUrl = this.storeUrl;
    const req = new Request(this.auth, this.contentType, this.timeout);

    return new Promise((resolve, reject) => {
      StoreClient.runAsyncTask(function*() {
        let resp;

        try {
          resp = yield req.get(storeUrl);
          let userUrls = Collection.getLinkRelationUrls(resp.data.collection, 'user');
          resp = yield req.get(userUrls[0]); // there is only a single user url
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(resp.data.collection);
      });
    });
  }

  /**
   * Update currently authenticated user's information (email and or password).
   *
   * @param {Object} userInfoObj - collection object
   * @param {string} userInfoObj.email - user's email
   * @param {string} userInfoObj.password - user's password
   * @return {Object} - JS Promise
   */
  updateUser(userInfoObj) {
    const storeUrl = this.storeUrl;
    const req = new Request(this.auth, this.contentType, this.timeout);

    const userData = {
      template: {
        data: [
          { name: 'email', value: userInfoObj.email },
          { name: 'password', value: userInfoObj.password },
        ],
      },
    };

    return new Promise((resolve, reject) => {
      StoreClient.runAsyncTask(function*() {
        let resp;

        try {
          resp = yield req.get(storeUrl);
          let userUrls = Collection.getLinkRelationUrls(resp.data.collection, 'user');
          resp = yield req.put(userUrls[0], userData); // there is only a single user url
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(resp.data.collection);
      });
    });
  }

  /**
   * Create a new store user account.
   *
   * @param {string} usersUrl - url of the user accounts service
   * @param {string} username - user's username
   * @param {string} password - user's password
   * @param {string} email - user's email
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise
   */
  static createUser(usersUrl, username, password, email, timeout = 30000) {
    const req = new Request(undefined, 'application/vnd.collection+json', timeout);
    const userData = {
      template: {
        data: [
          { name: 'username', value: username },
          { name: 'password', value: password },
          { name: 'email', value: email },
        ],
      },
    };
    const result = req.post(usersUrl, userData);

    return new Promise((resolve, reject) => {
      result
        .then(response => {
          resolve(response.data.collection);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Get a user's login authorization token.
   * @param {string} authUrl - url of the authentication service
   * @param {string} username - user's username
   * @param {string} password - user's password
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise
   */
  static getAuthToken(authUrl, username, password, timeout = 30000) {
    const req = new Request(undefined, 'application/json', timeout);
    const authData = {
      username: username,
      password: password,
    };
    const result = req.post(authUrl, authData);

    return new Promise((resolve, reject) => {
      result
        .then(response => {
          resolve(response.data.token);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Helper method to run an asynchronous task defined by a task generator function.
   *
   * @param {function*()} taskGenerator - generator function
   */
  static runAsyncTask(taskGenerator) {
    Request.runAsyncTask(taskGenerator);
  }

  /*export const login = credentials => {
    return axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
      // process response somehow
    });
  };*/
}
