/** * Imports ***/
import Collection from './cj';
import Request from './request';
import { PluginList } from './plugin';
import { PluginMetaList, UserCollabPluginMetaList } from './pluginmeta';
import { UserFavoritePluginMetaList } from './pluginmeta';
import { PluginStarList } from './pluginstar';
import { PluginCollaboratorList } from './plugincollab';
import { PipelineList } from './pipeline';
import User from './user';

/**
 * API client object.
 */
export default class Client {
  /**
   * Constructor
   *
   * @param {string} url - url of the ChRIS store service
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    /** @type {string} */
    this.url = url;

    /** @type {Object} */
    this.auth = auth;

    /* Urls of the high level API resources */
    this.pluginMetasUrl = this.url;
    this.favoritePluginMetasUrl = '';
    this.collabPluginMetasUrl = '';
    this.pluginStarsUrl = '';
    this.pluginsUrl = '';
    this.pipelinesUrl = '';
    this.userUrl = '';
  }

  /**
   * Set the urls of the high level API resources.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  setUrls(timeout = 30000) {
    return this.getPluginMetas(null, timeout);
  }

  /**
   * Get a paginated list of plugin metas from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin meta id exactly with this number
   * @param {string} [searchParams.name] - match plugin meta name containing this string
   * @param {string} [searchParams.name_exact] - match plugin meta name exactly with this string
   * @param {string} [searchParams.title] - match plugin meta title containing this string
   * @param {string} [searchParams.type] - match plugin meta type exactly with this string
   * @param {string} [searchParams.category] - match plugin meta category exactly with this string
   * @param {string} [searchParams.authors] - match plugin meta authors containing this string
   * @param {number} [searchParams.min_creation_date] - match feed creation date gte this date
   * @param {number} [searchParams.max_creation_date] - match feed creation date lte this date
   * @param {string} [searchParams.name_title_category] - match plugin meta name, title or
   * category containing this string
   * @param {string} [searchParams.name_authors_category] - match plugin meta name, authors or
   * category containing this string
   * @param {string} [searchParams.owner_username] - match plugin meta owner's username exactly
   * with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginMetaList`` object
   */
  getPluginMetas(searchParams = null, timeout = 30000) {
    const plgMetaList = new PluginMetaList(this.pluginMetasUrl, this.auth);

    return plgMetaList.get(searchParams, timeout).then(plgMetaList => {
      const coll = plgMetaList.collection;
      const getUrl = Collection.getLinkRelationUrls;

      if (!this.favoritePluginMetasUrl && this.auth) {
        this.favoritePluginMetasUrl = getUrl(coll, 'favorite_plugin_metas')[0];
      }
      if (!this.collabPluginMetasUrl && this.auth) {
        this.collabPluginMetasUrl = getUrl(coll, 'collab_plugin_metas')[0];
      }
      this.pluginStarsUrl = this.pluginStarsUrl || getUrl(coll, 'plugin_stars')[0];
      this.pluginsUrl = this.pluginsUrl || getUrl(coll, 'plugins')[0];
      this.pipelinesUrl = this.pipelinesUrl || getUrl(coll, 'pipelines')[0];
      this.userUrl = this.userUrl || getUrl(coll, 'user')[0];

      return plgMetaList;
    });
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
    return this._fetchRes('favoritePluginMetasUrl', UserFavoritePluginMetaList, params, timeout);
  }

  /**
   * Fetch a list of authenticated user's collaborated plugin metas from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``UserCollabPluginMetaList`` object
   */
  getCollabPluginMetas(params = null, timeout = 30000) {
    return this._fetchRes('collabPluginMetasUrl', UserCollabPluginMetaList, params, timeout);
  }

  /**
   * Get a plugin meta resource object given its id.
   *
   * @param {number} id - plugin meta id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginMeta`` object
   */
  getPluginMeta(id, timeout = 30000) {
    return this.getPluginMetas({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Get a paginated list of authenticated-user-specific plugin star data (descriptors)
   * given query search parameters. If no search parameters is given then get the default
   * first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin star id exactly with this number
   * @param {string} [searchParams.plugin_name] - match plugin name exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginStarList`` object
   */
  getPluginStars(searchParams = null, timeout = 30000) {
    return this._fetchRes('pluginStarsUrl', PluginStarList, searchParams, timeout);
  }

  /**
   * Get an authenticated-user-specific plugin star resource object given its id.
   *
   * @param {number} id - plugin star id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginStar`` object
   */
  getPluginStar(id, timeout = 30000) {
    return this.getPluginStars({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Create a new plugin star resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.plugin_name - plugin's name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``PluginStar`` object
   */
  createPluginStar(data, timeout = 30000) {
    const createRes = () => {
      const res = new PluginStarList(this.pluginStarsUrl, this.auth);
      return res.post(data, timeout).then(res => res.getItems()[0]);
    };
    return this.pluginStarsUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Create a new plugin collaborator resource through the REST API.
   *
   * @param {number} pluginMetaId - plugin meta id
   * @param {Object} data - request JSON data object
   * @param {string} data.username - collaborator username
   * @param {string} data.role - collaborator role
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``PluginCollaborator`` object
   */
  createPluginCollaborator(pluginMetaId, data, timeout = 30000) {
    return this.getPluginMeta(pluginMetaId, timeout)
      .then(plgMeta => {
        const collaboratorsUrl = Collection.getLinkRelationUrls(plgMeta.collection.items[0], 'collaborators');
        const collabList = new PluginCollaboratorList(collaboratorsUrl[0], this.auth);
        return collabList.post(data, timeout);
      })
      .then(collabList => collabList.getItems()[0]);
  }

  /**
   * Get a paginated list of plugin data (descriptors) given query search
   * parameters. If no search parameters is given then get the default first
   * page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin id exactly with this number
   * @param {string} [searchParams.name] - match plugin name containing this string
   * @param {string} [searchParams.name_latest] - match plugin name containing this string
   * and return only the latest version
   * @param {string} [searchParams.name_exact] - match plugin name exactly with this string
   * @param {string} [searchParams.name_exact_latest] - match plugin name exactly with this string
   * and return only the latest version
   * @param {string} [searchParams.dock_image] - match plugin docker image exactly with this string
   * @param {string} [searchParams.type] - match plugin type with this string
   * @param {string} [searchParams.category] - match plugin category containing this string
   * @param {string} [searchParams.owner_username] - match plugin username containing this string
   * @param {string} [searchParams.min_creation_date] - match plugin creation date after this date
   * @param {string} [searchParams.max_creation_date] - match plugin creation date before this date
   * @param {string} [searchParams.title] - match plugin title containing this string
   * @param {string} [searchParams.version] - match plugin version exactly with this string
   * @param {string} [searchParams.description] - match plugin description containing this string
   * @param {string} [searchParams.name_title_category] - match plugin name, title or category
   * containing this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginList`` object
   */
  getPlugins(searchParams = null, timeout = 30000) {
    return this._fetchRes('pluginsUrl', PluginList, searchParams, timeout);
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
   * Create a new plugin resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.name - plugin name
   * @param {string} data.dock_image - plugin docker image
   * @param {string} data.public_repo - plugin repo
   * @param {Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.descriptor_file - file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``Plugin`` object
   */
  createPlugin(data, uploadFileObj, timeout = 30000) {
    const createRes = () => {
      const res = new PluginList(this.pluginsUrl, this.auth);
      return res.post(data, uploadFileObj, timeout).then(res => res.getItems()[0]);
    };
    return this.pluginsUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a paginated list of pipeline data (descriptors) given query search parameters.
   * If no search parameters is given then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match pipeline id exactly with this number
   * @param {string} [searchParams.name] - match pipeline name containing this string
   * @param {string} [searchParams.category] - match pipeline category containing this string
   * @param {string} [searchParams.owner_username] - match pipeline's owner username exactly with this string
   * @param {string} [searchParams.description] - match pipeline description containing this string
   * @param {string} [searchParams.authors] - match pipeline authors containing this string
   * @param {string} [searchParams.min_creation_date] - match pipeline creation date after this date
   * @param {string} [searchParams.max_creation_date] - match pipeline creation date before this date
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PipelineList`` object
   */
  getPipelines(searchParams = null, timeout = 30000) {
    return this._fetchRes('pipelinesUrl', PipelineList, searchParams, timeout);
  }

  /**
   * Get a pipeline resource object given its id.
   *
   * @param {number} id - pipeline id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``Pipeline`` object
   */
  getPipeline(id, timeout = 30000) {
    return this.getPipelines({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Create a new pipeline resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.name - pipeline name
   * @param {string} data.plugin_tree - JSON string containing a plugin tree list
   * @param {string} [data.authors] - pipeline authors
   * @param {string} [data.category] - pipeline category
   * @param {string} [data.description] - pipeline description
   * @param {boolean} [data.locked=true] - pipeline status
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``Pipeline`` object
   */
  createPipeline(data, timeout = 30000) {
    const createRes = () => {
      const res = new PipelineList(this.pipelinessUrl, this.auth);
      return res.post(data, timeout).then(res => res.getItems()[0]);
    };
    return this.pipelinesUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a user resource object for the currently authenticated user.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``User`` object
   */
  getUser(timeout = 30000) {
    return this._fetchRes('userUrl', User, null, timeout);
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
   * Internal method to fetch a high level resource through the REST API.
   *
   * @param {string} resUrlProp -  property of the `this` object containing the url of the resource
   * @param {string} ResClass - resource class
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  _fetchRes(resUrlProp, ResClass, searchParams = null, timeout = 30000) {
    const getRes = () => {
      const res = new ResClass(this[resUrlProp], this.auth);
      return searchParams ? res.get(searchParams, timeout) : res.get(timeout);
    };
    return this[resUrlProp] ? getRes() : this.setUrls().then(() => getRes());
  }
}
