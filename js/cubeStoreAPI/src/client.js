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
   * @return {*}
   */
  getPaginatedCollections(coll) {
    let collections = [];
    let next_page_urls;
    const req = new Request({ username: this.username, password: this.password });

    do {
      collections = collections.concat(coll);
      next_page_urls = Collection.get_link_relation_urls(coll, 'next');

      if (next_page_urls.length) {
        // there is only a single next page
        const response = req.get(next_page_urls[0]);

        response
          .then(obj => {
            coll = obj;
            window.console.log('cj: ', cj.collection);
          })
          .catch(error => {
            window.console.log('error: ', error);
          });
      }
    } while (next_page_urls.length);
  }
}
