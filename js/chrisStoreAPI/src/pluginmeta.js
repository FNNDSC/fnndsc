/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { PluginList, PluginMetaPluginList } from './plugin';
import { PipelineList } from './pipeline';
import { PluginStarList } from './pluginstar';
import User from './user';

/**
 * Plugin meta item resource object representing a plugin meta.
 */
export class PluginMeta extends ItemResource {
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
   * Fetch a list of plugins associated to this plugin meta from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginMetaPluginList`` object
   */
  getPlugins(params = null, timeout = 30000) {
    const linkRelation = 'plugins';
    const resourceClass = PluginMetaPluginList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Make a PUT request to modify this plugin meta item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.public_repo - public repo
   * @param {string} [data.new_owner] - new additional owner for this plugin meta
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  }

  /**
   * Make a DELETE request to delete this plugin meta item resource through the REST API.
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
 * User-specific plugin meta list resource object representing a list of
 * plugin metas owned by an specific user.
 */
export class UserOwnedPluginMetaList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    if (!this.auth) {
      throw new RequestException('Authentication object is required');
    }

    /** @type {Object} */
    this.itemClass = PluginMeta;
  }

  /**
   * Fetch the owner user from the REST API.
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
}

/**
 * User-specific plugin meta list resource object representing a list of
 * plugin metas favored by an specific user.
 */
export class UserFavoritePluginMetaList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    if (!this.auth) {
      throw new RequestException('Authentication object is required');
    }

    /** @type {Object} */
    this.itemClass = PluginMeta;
  }

  /**
   * Fetch the fan user from the REST API.
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
}

/**
 * Plugin meta list resource object representing a list of plugin metas.
 */
export class PluginMetaList extends ListResource {
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
    this.itemClass = PluginMeta;
  }

  /**
   * Fetch a list of plugins from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``PluginList.getSearchParameters`` method
   * can be used to get a list of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginList`` object
   */
  getPlugins(searchParams = null, timeout = 30000) {
    const linkRelation = 'plugins';
    const resourceClass = PluginList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
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
   * resource-specific, the ``PluginStarList.getSearchParameters`` method
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
   * Fetch the authenticated user from the REST API.
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
   * Fetch a list of authenticated user's favorite plugin metas from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``UserFavoritePluginMetaList`` object
   */
  getFavoritePluginMetas(params = null, timeout = 30000) {
    const linkRelation = 'favorite_plugin_metas';
    const resourceClass = UserFavoritePluginMetaList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of authenticated user's owned plugin metas from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``UserOwnedPluginMetaList`` object
   */
  getOwnedPluginMetas(params = null, timeout = 30000) {
    const linkRelation = 'owned_plugin_metas';
    const resourceClass = UserOwnedPluginMetaList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}
