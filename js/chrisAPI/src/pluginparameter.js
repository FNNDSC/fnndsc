/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { Plugin } from './plugin';

/**
 * API plugin parameter objects.
 *
 * @module pluginparameter
 */
export class PluginParameter extends ItemResource {
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
   * Fetch the plugin associated to this parameter item from the REST API.
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

export class PluginParameterList extends ListResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
    this.itemClass = PluginParameter;
  }

  /**
   * Fetch the plugin associated to this list of parameters from the REST API.
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
