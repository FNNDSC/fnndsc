/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';
import { Plugin } from './plugin';

/**
 * API plugin instance objects.
 *
 * @module plugin
 */
export class PluginInstance extends ItemResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the plugin associated to this plugin instance from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getPlugin(timeout = 30000) {
    const linkRelation = 'plugin';
    const resourceClass = Plugin;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

export class PluginInstanceList extends ListResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Get the list of items' data descriptors.
   *
   * @return {*}
   */
  get items() {
    return this._getItems(PluginInstance);
  }

  /**
   * Fetch the plugin associated to this plugin instance list from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getPlugin(timeout = 30000) {
    const linkRelation = 'plugin';
    const resourceClass = Plugin;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}
