/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';
import User from './user';
import { FeedList } from './feed';
import { PluginList } from './plugin';

/**
 * API client object.
 */
export default class Client {
  /**
   * Constructor
   *
   * @param {string} url - url of the ChRIS service
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    /** @type {string} */
    this.url = url;
    if (!auth) {
      throw new RequestException('Authentication object is required');
    }
    /** @type {Object} */
    this.auth = auth;

    /* Urls of the API resources */
    this.feedsUrl = '';
    this.pluginsUrl = '';
  }

  /**
   * Set the url of the feeds.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  setFeedsUrl() {
    this.feedsUrl = this.feedsUrl || this.url;
    return Promise.resolve();
  }

  /**
   * Get a paginated list of currently authenticated user's feeds (descriptors)
   * from the REST API given query search parameters. If no search parameters
   * then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match feed id exactly with this number
   * @param {number} [searchParams.min_id] - match feed id gte this number
   * @param {number} [searchParams.max_id] - match feed id lte this number
   * @param {string} [searchParams.name] - match feed name containing this string
   * @param {number} [searchParams.min_creation_date] - match feed creation date gte this date
   * @param {number} [searchParams.max_creation_date] - match feed creation date lte this date
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``FeedList`` object
   */
  getFeeds(searchParams = null, timeout = 30000) {
    this.setFeedsUrl().then(() => {
      const feedList = new FeedList(this.feedsUrl, this.auth);
      return this._fetchResource(feedList, searchParams, timeout);
    });
  }

  /**
   * Get a feed resource object given its id.
   *
   * @param {number} id - feed id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(id, timeout = 30000) {
    return this.getFeeds({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Set the url of the plugins.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  setPluginsUrl(timeout = 30000) {
    if (this.pluginsUrl) {
      return Promise.resolve();
    }
    return this.setFeedsUrl().then(() =>
      this._fetchCollection(this.feedsUrl, null, timeout).then(coll => {
        this.pluginsUrl = Collection.getLinkRelationUrls(coll, 'plugins');
      })
    );
  }

  /**
   * Get a paginated list of plugins (descriptors) from the REST API given
   * query search parameters. If no search parameters then get the default
   * first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {string} [searchParams.name] - match plugin name containing this string
   * @param {string} [searchParams.name_exact] - match plugin name exactly with this string
   * @param {string} [searchParams.version] - match plugin version exactly with this string
   * @param {string} [searchParams.dock_image] - match plugin docker image exactly with this string
   * @param {string} [searchParams.type] - match plugin type exactly with this string
   * @param {string} [searchParams.category] - match plugin category containing this string
   * @param {string} [searchParams.description] - match plugin description containing this string
   * @param {string} [searchParams.title] - match plugin title containing this string
   * @param {string} [searchParams.authors] - match plugin authors containing this string
   * @param {string} [searchParams.min_creation_date] - match plugin creation date gte this date
   * @param {string} [searchParams.max_creation_date] - match plugin creation date lte this date
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginList`` object
   */
  getPlugins(searchParams = null, timeout = 30000) {
    this.setPluginsUrl().then(() => {
      const pluginList = new PluginList(this.pluginsUrl, this.auth);
      return this._fetchResource(pluginList, searchParams, timeout);
    });
  }

  /**
   * Get a plugin resource object given its id.
   *
   * @param {number} id - plugin id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``Plugin`` object
   */
  getPlugin(id, timeout = 30000) {
    return this.getPlugins({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Get a plugin's paginated parameters given the plugin's id.
   *
   * @param {number} pluginId - plugin id
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginParameterList`` object
   */
  getPluginParameters(pluginId, params = null, timeout = 30000) {
    return this.getPlugin(pluginId, timeout).then(plg => plg.getPluginParameters(params, timeout));
  }

  /**
   * Get a plugin's paginated instances given the plugin's id.
   *
   * @param {number} pluginId - plugin id
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginParameterList`` object
   */
  getPluginInstances(pluginId, params = null, timeout = 30000) {
    return this.getPlugin(pluginId, timeout).then(plg => plg.getPluginInstances(params, timeout));
  }

  /**
   * Create a new user account.
   *
   * @param {string} usersUrl - url of the user accounts service
   * @param {string} username - username
   * @param {string} password - password
   * @param {string} email - user email
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``User`` object
   */
  static createUser(usersUrl, username, password, email, timeout = 30000) {
    const req = new Request(undefined, 'application/vnd.collection+json', timeout);
    const userData = {
      template: {
        data: [
          { name: 'username', value: username },
          { name: 'password', value: password },
          { name: 'email', value: email },
        ],
      },
    };
    return req.post(usersUrl, userData).then(resp => {
      const coll = resp.data.collection;
      const userUrl = coll.items[0].href;
      const auth = { username: username, password: password };
      const user = new User(userUrl, auth);
      user.collection = coll;
      return user;
    });
  }

  /**
   * Fetch a user's login authorization token from the REST API.
   * @param {string} authUrl - url of the authorization service
   * @param {string} username - username
   * @param {string} password - password
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``string`` value
   */
  static getAuthToken(authUrl, username, password, timeout = 30000) {
    const req = new Request(undefined, 'application/json', timeout);
    const authData = {
      username: username,
      password: password,
    };
    return req.post(authUrl, authData).then(resp => resp.data.token);
  }

  /**
   * Helper method to run an asynchronous task defined by a task generator function.
   *
   * @param {function*()} taskGenerator - generator function
   */
  static runAsyncTask(taskGenerator) {
    Request.runAsyncTask(taskGenerator);
  }

  /**
   * Internal method to fetch a collection object from a resource url.
   *
   * @param {string} url - url
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  _fetchCollection(url, searchParams = null, timeout = 30000) {
    const req = new Request(this.auth, 'application/vnd.collection+json', timeout);

    return req.get(url, searchParams).then(resp => resp.data.collection);
  }

  /**
   * Internal method to fetch a resource object based on search parameters.
   *
   * @param {Object} resourceObj - API resource object
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to the resource object
   */
  _fetchResource(resourceObj, searchParams = null, timeout = 30000) {
    if (searchParams) {
      for (let prop in searchParams) {
        if (searchParams.hasOwnProperty(prop) && prop !== 'limit' && prop !== 'offset') {
          // here we assume a fixed queryUrl form but API resource objecs are more flexible than this
          resourceObj.queryUrl = resourceObj.url + 'search/';
          return resourceObj.getSearch(searchParams, timeout);
        }
      }
      return resourceObj.get(searchParams, timeout);
    }
    return resourceObj.get(timeout);
  }
}
