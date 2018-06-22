/** * Imports ***/
import Collection from './cjson';
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
  constructor(store_url, username, password, timeout = 30000) {
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
    const plugins = this.getPlugins(searchParams);

    if (plugins) {
      return plugins[0]; /*plugin names are unique*/
    }
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
    if (searchParams) {
      return searchParams;
    }
    return null;
  }

  /**
   * Get a list of paginated collections.
   *
   * @param {*} coll
   * @param {*} follow_link_relations
   * @return {*}
   */
  get_items_from_paginated_collections(coll, follow_link_relations = []) {}

  /**
   * Get a list of paginated collections.
   *
   * @param {*} coll
   * @return {*}
   */
  getPaginatedCollections(coll) {
    let collections = [coll];
    const req = new Request({ username: this.username, password: this.password });

    return new Promise(function(resolve, reject) {
      StoreClient._runAsyncTask(function*() {
        try {
          let next_page_urls = Collection.get_link_relation_urls(coll, 'next');

          while (next_page_urls.length) {
            // there is only a single next page
            // execution stops here before resp is assigned, and resumed in _runAsyncTask
            let resp = yield req.get(next_page_urls[0]);
            collections = collections.concat(resp.collection);
            next_page_urls = Collection.get_link_relation_urls(resp.collection, 'next');
          }
        } catch (ex) {
          reject(ex);
        }

        resolve(collections);
      });
    });
  }

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
}
