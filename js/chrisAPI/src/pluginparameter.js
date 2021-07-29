/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { Plugin } from './plugin';

/**
 * Plugin parameter item resource object representing a plugin parameter.
 */
export class PluginParameter extends ItemResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the plugin associated to this parameter item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
   */
  getPlugin(timeout = 30000) {
    const linkRelation = 'plugin';
    const resourceClass = Plugin;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Plugin parameter list resource object representing a list of plugin parameters.
 */
export class PluginParameterList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PluginParameter;
  }

  /**
   * Fetch the plugin associated to this list of parameters from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
   */
  getPlugin(timeout = 30000) {
    const linkRelation = 'plugin';
    const resourceClass = Plugin;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}
