/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { Plugin } from './plugin';
import { Feed } from './feed';
import { PluginParameter } from './pluginparameter';
import { FeedFileList } from './feedfile';

/**
 * Plugin instance item resource object.
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
   * @return {Object} - JS Promise, resolves to a ``FeedFileList`` object
   */
  getFiles(params = null, timeout = 30000) {
    const linkRelation = 'files';
    const resourceClass = FeedFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}

/**
 * Plugin instance list resource object.
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
 * Plugin instance parameter item resource object.
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
 * Plugin instance parameter list resource object.
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
