/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';
import { FeedList } from './feed';
import { PluginParameterList } from './pluginparameter';
import { PluginInstanceList } from './plugininstance';

/**
 * API plugin objects.
 *
 * @module plugin
 */
export class Plugin extends ItemResource {
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
   * Fetch a list of plugin parameters associated to this plugin from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getPluginParameters(params = null, timeout = 30000) {
    const linkRelation = 'parameters';
    const resourceClass = PluginParameterList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of plugin instances associated to this plugin from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getPluginInstances(params = null, timeout = 30000) {
    const linkRelation = 'instances';
    const resourceClass = PluginInstanceList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}

export class PluginList extends ListResource {
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
    return this._getItems(Plugin);
  }

  /**
   * Fetch a list of feeds from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getFeeds(params = null, timeout = 30000) {
    const linkRelation = 'feeds';
    const resourceClass = FeedList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}
