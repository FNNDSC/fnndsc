/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { Plugin } from './plugin';
import { Feed } from './feed';
import { PluginParameter } from './pluginparameter';
import { FeedFileList } from './feedfile';

/**
 * API plugin instance objects.
 *
 * @module plugininstance
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
   * Fetch the feed created by this plugin instance from the REST API
   * (only for fs plugins, 'ds' plugins resolve to null).
   *
   * @param {*} timeout
   * @return {*}
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
   * @param {*} timeout
   * @return {*}
   */
  getPlugin(timeout = 30000) {
    const linkRelation = 'plugin';
    const resourceClass = Plugin;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the parent plugin instance of this plugin instance from the REST API
   * (only for 'ds' plugins, 'fs' plugins resolve to null).
   *
   * @param {*} timeout
   * @return {*}
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
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getDescendantPluginInstances(params = null, timeout = 30000) {
    const linkRelation = 'descendants';
    const resourceClass = PluginInstanceList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of plugin instance parameters associated to this plugin instance from
   * the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getParameters(params = null, timeout = 30000) {
    const linkRelation = 'parameters';
    const resourceClass = PluginInstanceParameterList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of files created by this plugin instance from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getFiles(params = null, timeout = 30000) {
    const linkRelation = 'files';
    const resourceClass = FeedFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
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
    this.itemClass = PluginInstance;
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

export class PluginInstanceParameter extends ItemResource {
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
   * Fetch the plugin instance associated to this parameter item from the REST API.
   *
   * @param {*} timeout
   * @return {*}
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
   * @param {*} timeout
   * @return {*}
   */
  getPluginParameter(timeout = 30000) {
    const linkRelation = 'plugin_param';
    const resourceClass = PluginParameter;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

export class PluginInstanceParameterList extends ListResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
    this.itemClass = PluginInstanceParameter;
  }
}
