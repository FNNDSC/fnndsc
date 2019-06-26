/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';
import User from './user';
import { FeedList } from './feed';
import { PluginList } from './plugin';
import { AllPluginInstanceList } from './plugininstance';
import { PipelineList } from './pipeline';
import { TagList } from './tag';
import { UploadedFileList } from './uploadedfile';

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
    this.feedsUrl = this.url;
    this.userUrl = '';
    this.pluginsUrl = '';
    this.pluginInstancesUrl = '';
    this.pipelinesUrl = '';
    this.pipelineInstancesUrl = '';
    this.tagsUrl = '';
    this.uploadedFilesUrl = '';
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
   * Set the url of the currently authenticated user.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  setUserUrl(timeout = 30000) {
    if (this.userUrl) {
      return Promise.resolve();
    }
    return this._fetchCollection(this.feedsUrl, null, timeout).then(coll => {
      this.userUrl = Collection.getLinkRelationUrls(coll, 'user');
    });
  }

  /**
   * Get a user resource object for the currently authenticated user.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``User`` object
   */
  getUser(timeout = 30000) {
    return this.setUserUrl().then(() => {
      const user = new User(this.userUrl, this.auth);
      return user.get(timeout);
    });
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
    const feedList = new FeedList(this.feedsUrl, this.auth);

    return feedList.get(searchParams, timeout).then(feedList => {
      const coll = feedList.collection;
      const getUrl = Collection.getLinkRelationUrls;

      this.userUrl = this.userUrl || getUrl(coll, 'user');
      this.pluginsUrl = this.pluginsUrl || getUrl(coll, 'plugins');
      this.pluginInstancesUrl = this.pluginInstancesUrl || getUrl(coll, 'plugin_instances');
      this.pipelinesUrl = this.pipelinesUrl || getUrl(coll, 'pipelines');
      this.pipelineInstancesUrl = this.pipelineInstancesUrl || getUrl(coll, 'pipeline_instances');
      this.tagsUrl = this.tagsUrl || getUrl(coll, 'tags');
      this.uploadedFilesUrl = this.uploadedFilesUrl || getUrl(coll, 'uploadedfiles');

      return feedList;
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
    return this._fetchCollection(this.feedsUrl, null, timeout).then(coll => {
      this.pluginsUrl = Collection.getLinkRelationUrls(coll, 'plugins');
    });
  }

  /**
   * Get a paginated list of plugins (descriptors) from the REST API given
   * query search parameters. If no search parameters then get the default
   * first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin id exactly with this number
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
    return this.setPluginsUrl().then(() => {
      const pluginList = new PluginList(this.pluginsUrl, this.auth);
      return pluginList.get(searchParams, timeout);
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
   * Set the url of the plugin instances.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  setPluginInstancesUrl(timeout = 30000) {
    if (this.pluginInstancesUrl) {
      return Promise.resolve();
    }
    return this._fetchCollection(this.feedsUrl, null, timeout).then(coll => {
      this.pluginInstancesUrl = Collection.getLinkRelationUrls(coll, 'plugin_instances');
    });
  }

  /**
   * Get a paginated list of plugin instances from the REST API given
   * query search parameters. If no search parameters then get the default
   * first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin instance id exactly with this number
   * @param {string} [searchParams.title] - match plugin instance title containing this string
   * @param {string} [searchParams.status] - match plugin instance execution status exactly with this string
   * @param {string} [searchParams.owner_username] - match plugin instances's owner username exactly with this string
   * @param {number} [searchParams.feed_id] - match associated feed's id exactly with this number
   * @param {number} [searchParams.root_id] - match root plugin instance's id exactly with this number
   * @param {number} [searchParams.plugin_id] - match associated plugin's id exactly with this number
   * @param {number} [searchParams.plugin_name] - match associated plugin's name containing this string
   * @param {number} [searchParams.plugin_name_exact] - match associated plugin's name exact with this string
   * @param {number} [searchParams.plugin_version] - match associated plugin's verion exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``AllPluginInstanceList`` object
   */
  getPluginInstances(searchParams = null, timeout = 30000) {
    return this.setPluginInstancesUrl().then(() => {
      const plgInstList = new AllPluginInstanceList(this.pluginInstancesUrl, this.auth);
      return plgInstList.get(searchParams, timeout);
    });
  }

  /**
   * Get a plugin instance resource object given its id.
   *
   * @param {number} id - plugin instance id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PluginInstance`` object
   */
  getPluginInstance(id, timeout = 30000) {
    return this.getPluginInstances({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Set the url of the pipelines.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  setPipelinesUrl(timeout = 30000) {
    if (this.pipelinesUrl) {
      return Promise.resolve();
    }
    return this._fetchCollection(this.feedsUrl, null, timeout).then(coll => {
      this.pipelinesUrl = Collection.getLinkRelationUrls(coll, 'pipelines');
    });
  }

  /**
   * Get a paginated list of pipelines (descriptors) from the REST API given
   * query search parameters. If no search parameters then get the default
   * first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin id exactly with this number
   * @param {string} [searchParams.name] - match plugin name containing this string
   * @param {string} [searchParams.owner_username] - match pipeline's owner username exactly with this string
   * @param {string} [searchParams.category] - match plugin category containing this string
   * @param {string} [searchParams.description] - match plugin description containing this string
   * @param {string} [searchParams.authors] - match plugin authors containing this string
   * @param {string} [searchParams.min_creation_date] - match plugin creation date gte this date
   * @param {string} [searchParams.max_creation_date] - match plugin creation date lte this date
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``PipelineList`` object
   */
  getPipeliness(searchParams = null, timeout = 30000) {
    return this.setPipelinesUrl().then(() => {
      const pipelineList = new PipelineList(this.pipelinesUrl, this.auth);
      return pipelineList.get(searchParams, timeout);
    });
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
   * Set the url of the tags.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  setTagsUrl(timeout = 30000) {
    if (this.tagsUrl) {
      return Promise.resolve();
    }
    return this._fetchCollection(this.feedsUrl, null, timeout).then(coll => {
      this.tagsUrl = Collection.getLinkRelationUrls(coll, 'tags');
    });
  }

  /**
   * Get a paginated list of tags (descriptors) from the REST API given
   * query search parameters. If no search parameters then get the default
   * first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match tag id exactly with this number
   * @param {string} [searchParams.name] - match tag name containing this string
   * @param {string} [searchParams.owner_username] - match tag's owner username exactly with this string
   * @param {string} [searchParams.color] - match plugin color containing this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``TagList`` object
   */
  getTags(searchParams = null, timeout = 30000) {
    return this.setTagsUrl().then(() => {
      const tagList = new TagList(this.tagsUrl, this.auth);
      return tagList.get(searchParams, timeout);
    });
  }

  /**
   * Get a tag resource object given its id.
   *
   * @param {number} id - tag id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``Tag`` object
   */
  getTag(id, timeout = 30000) {
    return this.getTags({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Set the url of the uploaded files.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise
   */
  setUploadedFilesUrl(timeout = 30000) {
    if (this.uploadedFilesUrl) {
      return Promise.resolve();
    }
    return this._fetchCollection(this.feedsUrl, null, timeout).then(coll => {
      this.uploadedFilesUrl = Collection.getLinkRelationUrls(coll, 'uploadedfiles');
    });
  }

  /**
   * Get a paginated list of uploaded files (descriptors) from the REST API given
   * query search parameters. If no search parameters then get the default
   * first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.upload_path] - match file's upload path containing this string
   * @param {string} [searchParams.owner_username] - match file's owner username exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``UploadedFileList`` object
   */
  getUploadedFiles(searchParams = null, timeout = 30000) {
    return this.setUploadedFilesUrl().then(() => {
      const uploadedFileList = new UploadedFileList(this.uploadedFilesUrl, this.auth);
      return uploadedFileList.get(searchParams, timeout);
    });
  }

  /**
   * Get an uploaded file resource object given its id.
   *
   * @param {number} id - uploaded file id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to an ``UploadedFile`` object
   */
  getUploadedFile(id, timeout = 30000) {
    return this.getUploadedFiles({ id: id }, timeout).then(listRes => listRes.getItem(id));
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
}
