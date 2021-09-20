/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { PluginMeta } from './pluginmeta';
import User from './user';

/**
 * Plugin collaborator item resource object representing a plugin collaborator.
 */
export class PluginCollaborator extends ItemResource {
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
   * Fetch the plugin meta associated to this plugin collaborator from the REST API.
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
   * Fetch the user associated to this plugin collaborator from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``User`` object
   */
  getUser(timeout = 30000) {
    const linkRelation = 'user';
    const resourceClass = User;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a PUT request to modify this plugin collaborator item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.role - collaborator role
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  }

  /**
   * Make a DELETE request to delete this plugin collaborator item resource through the
   * REST API.
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
 * Plugin meta-specific plugin collaborator list resource object representing a list
 * of plugin collaborators associated to an specific plugin meta.
 */
export class PluginCollaboratorList extends ListResource {
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
    this.itemClass = PluginCollaborator;
  }

  /**
   * Fetch the plugin meta associated to this plugin meta-specific list of
   * plugin collaborators from the REST API.
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
   * Make a POST request to this plugin collaborator list resource to create a new
   * plugin collaborator item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.username - collaborator username
   * @param {string} data.role - collaborator role
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}
