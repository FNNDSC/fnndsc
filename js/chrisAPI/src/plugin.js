/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { FeedList } from './feed';
import { PluginParameterList } from './pluginparameter';
import { PluginInstanceList } from './plugininstance';

/**
 * Plugin item resource object representing a plugin.
 */
export class Plugin extends ItemResource {
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
   * Fetch a list of plugin parameters associated to this plugin from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginParameterList`` object
   */
  getPluginParameters(params = null, timeout = 30000) {
    const linkRelation = 'parameters';
    const resourceClass = PluginParameterList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of plugin instances associated to this plugin from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginInstanceList`` object
   */
  getPluginInstances(params = null, timeout = 30000) {
    const linkRelation = 'instances';
    const resourceClass = PluginInstanceList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}

/**
 * Plugin list resource object representing a list of plugins.
 */
export class PluginList extends ListResource {
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
    this.itemClass = Plugin;
  }

  /**
   * Fetch a list of feeds from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``FeedList`` object
   */
  getFeeds(params = null, timeout = 30000) {
    const linkRelation = 'feeds';
    const resourceClass = FeedList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}
