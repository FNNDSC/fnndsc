/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { Plugin } from './plugin';
import { Feed } from './feed';
import { PluginParameter } from './pluginparameter';
import { PluginInstanceFileList } from './feedfile';

/**
 * Plugin instance item resource object representing a plugin instance.
 */
export class PluginInstance extends ItemResource {
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
   * Fetch the feed created by this plugin instance from the REST API
   * (only for fs plugins, 'ds' plugins pass null to the resultant Promise).
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Feed`` object or ``null``
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    try {
      // 'feed' link relation only exists for 'fs' plugin instances
      return this._getResource(linkRelation, resourceClass, null, timeout);
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  /**
   * Fetch the plugin associated to this plugin instance item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Plugin`` object
   */
  getPlugin(timeout = 30000) {
    const linkRelation = 'plugin';
    const resourceClass = Plugin;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the parent plugin instance of this plugin instance from the REST API
   * (only for 'ds' plugins, 'fs' plugins pass null to the resultant Promise).
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginInstance`` object or ``null``
   */
  getPreviousPluginInstance(timeout = 30000) {
    const linkRelation = 'previous';
    const resourceClass = PluginInstance;

    try {
      // 'previous' link relation only exists for 'ds' plugin instances
      return this._getResource(linkRelation, resourceClass, null, timeout);
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  /**
   * Fetch a list of plugin instances that are descendents of this plugin instance from the
   * REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginInstanceDescendantList`` object
   */
  getDescendantPluginInstances(params = null, timeout = 30000) {
    const linkRelation = 'descendants';
    const resourceClass = PluginInstanceDescendantList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of plugin instance parameters associated to this plugin instance from
   * the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginInstanceParameterList`` object
   */
  getParameters(params = null, timeout = 30000) {
    const linkRelation = 'parameters';
    const resourceClass = PluginInstanceParameterList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of files created by this plugin instance from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginInstanceFileList`` object
   */
  getFiles(params = null, timeout = 30000) {
    const linkRelation = 'files';
    const resourceClass = PluginInstanceFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}

/**
 * Plugin instance list resource object representing a list of plugin instances.
 */
export class PluginInstanceList extends ListResource {
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
    this.itemClass = PluginInstance;
  }

  /**
   * Fetch the plugin associated to this plugin instance list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Plugin`` object
   */
  getPlugin(timeout = 30000) {
    const linkRelation = 'plugin';
    const resourceClass = Plugin;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a POST request to this plugin instance list resource to create a new plugin
   * instance item resource through the REST API.
   *
   * @param {Object} data - request JSON data object which is plugin-specific and it's
   * properties can be determined by calling the ``getPOSTDataParameters`` method on this
   * resource object
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}

/**
 * Feed-specific plugin instance list resource object representing a list of plugin
 * instances associated to an specific feed.
 */
export class FeedPluginInstanceList extends ListResource {
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
    this.itemClass = PluginInstance;
  }

  /**
   * Fetch the feed associated to this feed-specific list of plugin instances from
   * the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Plugin instance descendant list resource object. This is a list of all plugin
 * instances that have this plugin instance as an ancestor in a pipeline tree.
 */
export class PluginInstanceDescendantList extends ListResource {
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
    this.itemClass = PluginInstance;
  }
}

/**
 * Plugin instance parameter item resource object representing a parameter that the
 * plugin instance was run with.
 */
export class PluginInstanceParameter extends ItemResource {
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
   * Fetch the plugin instance associated to this parameter item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginInstance`` object
   */
  getPluginInstance(timeout = 30000) {
    const linkRelation = 'plugin_inst';
    const resourceClass = PluginInstance;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the plugin parameter definition associated to this plugin instance item
   * from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginParameter`` object
   */
  getPluginParameter(timeout = 30000) {
    const linkRelation = 'plugin_param';
    const resourceClass = PluginParameter;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Plugin instance parameter list resource object representing a list of parameters that
 * the plugin instance was run with.
 */
export class PluginInstanceParameterList extends ListResource {
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
    this.itemClass = PluginInstanceParameter;
  }
}
