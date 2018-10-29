/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import User from './user';
import { PluginList } from './plugin';
import { UploadedFileList } from './uploadedfile';
import Note from './note';
import { TagList } from './tag';
import { CommentList } from './comment';
import { FeedFileList } from './feedfile';
import { PluginInstance } from './plugininstance';

/**
 * Feed item resource object.
 */
export class Feed extends ItemResource {
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
   * Fetch the note associated to this feed from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Note`` object
   */
  getNote(timeout = 30000) {
    const linkRelation = 'note';
    const resourceClass = Note;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch a list of tags associated to this feed from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``TagList`` object
   */
  getTags(params = null, timeout = 30000) {
    const linkRelation = 'tags';
    const resourceClass = TagList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of comments associated to this feed from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``CommentList`` object
   */
  getComments(params = null, timeout = 30000) {
    const linkRelation = 'comments';
    const resourceClass = CommentList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of files associated to this feed from the REST API.
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

  /**
   * Fetch the plugin instance that created this feed from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginInstance`` object
   */
  getPluginInstance(timeout = 30000) {
    const linkRelation = 'plugin_inst';
    const resourceClass = PluginInstance;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Feed list resource object.
 */
export class FeedList extends ListResource {
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
    this.itemClass = Feed;
  }

  /**
   * Fetch currently authenticated user's information from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``User`` object
   */
  getUser(timeout = 30000) {
    const linkRelation = 'user';
    const resourceClass = User;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch a list of plugins from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``PluginList`` object
   */
  getPlugins(params = null, timeout = 30000) {
    const linkRelation = 'plugins';
    const resourceClass = PluginList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of tags from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``TagList`` object
   */
  getTags(params = null, timeout = 30000) {
    const linkRelation = 'tags';
    const resourceClass = TagList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of uploaded files from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``UploadedFileList`` object
   */
  getUploadedFiles(params = null, timeout = 30000) {
    const linkRelation = 'uploadedfiles';
    const resourceClass = UploadedFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}
