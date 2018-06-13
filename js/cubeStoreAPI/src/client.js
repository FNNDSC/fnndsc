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
}
