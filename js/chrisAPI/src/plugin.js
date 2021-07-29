/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { FeedList } from './feed';
import { PluginParameterList } from './pluginparameter';
import { PluginComputeResourceList } from './computeresource';
import { PluginInstanceList } from './plugininstance';
import { PluginMeta } from './pluginmeta';

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
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginParameterList>} - JS Promise, resolves to a ``PluginParameterList`` object
   */
  getPluginParameters(params = null, timeout = 30000) {
    const linkRelation = 'parameters';
    const resourceClass = PluginParameterList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of compute resources registered with this plugin from the REST
   * API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginComputeResourceList>} - JS Promise, resolves to a ``PluginComputeResourceList`` object
   */
  getPluginComputeResources(params = null, timeout = 30000) {
    const linkRelation = 'compute_resources';
    const resourceClass = PluginComputeResourceList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of plugin instances associated to this plugin from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginInstanceList>} - JS Promise, resolves to a ``PluginInstanceList`` object
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
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``FeedList.getSearchParameters`` method
   * can be used to get a list of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FeedList>} - JS Promise, resolves to a ``FeedList`` object
   */
  getFeeds(searchParams = null, timeout = 30000) {
    const linkRelation = 'feeds';
    const resourceClass = FeedList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }
}

/**
 * Plugin meta-specific plugin list resource object representing a list of
 * plugins associated to an specific plugin meta.
 */
export class PluginMetaPluginList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = Plugin;
  }

  /**
   * Fetch the plugin meta associated to this plugin meta-specific list of
   * plugins from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginMeta>} - JS Promise, resolves to a ``PluginMeta`` object
   */
  getPluginMeta(timeout = 30000) {
    const linkRelation = 'meta';
    const resourceClass = PluginMeta;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}
