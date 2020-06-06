/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { PipelineList } from './pipeline';
import { PluginStarList } from './pluginstar';
import { PluginMeta } from './pluginmeta';
import { PluginParameterList } from './pluginparameter';

/**
 * Plugin item resource object representing a plugin.
 */
export class Plugin extends ItemResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
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
   * @return {Object} - JS Promise, resolves to a ``PluginParameterList`` object
   */
  getPluginParameters(params = null, timeout = 30000) {
    const linkRelation = 'parameters';
    const resourceClass = PluginParameterList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch the plugin meta associated to this plugin from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginMeta`` object
   */
  getPluginMeta(timeout = 30000) {
    const linkRelation = 'meta';
    const resourceClass = PluginMeta;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a DELETE request to delete this plugin item resource through the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  delete(timeout = 30000) {
    return this._delete(timeout);
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
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = Plugin;
  }

  /**
   * Fetch a list of pipelines from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``PipelineList.getSearchParameters`` method
   * can be used to get a list of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PipelineList`` object
   */
  getPipelines(searchParams = null, timeout = 30000) {
    const linkRelation = 'pipelines';
    const resourceClass = PipelineList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

  /**
   * Fetch a list of plugin stars from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``PluginSttarList.getSearchParameters`` method
   * can be used to get a list of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginStarList`` object
   */
  getPluginStars(searchParams = null, timeout = 30000) {
    const linkRelation = 'plugin_stars';
    const resourceClass = PluginStarList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

  /**
   * Make a POST request to this plugin list resource to create a new plugin
   * item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.name - plugin name
   * @param {string} data.dock_image - plugin docker image
   * @param {string} data.public_repo - plugin repo
   * @param {Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.descriptor_file - file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  post(data, uploadFileObj, timeout = 30000) {
    return this._post(data, uploadFileObj, timeout);
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
   * @return {Object} - JS Promise, resolves to a ``PluginMeta`` object
   */
  getPluginMeta(timeout = 30000) {
    const linkRelation = 'meta';
    const resourceClass = PluginMeta;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}
