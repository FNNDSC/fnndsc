/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import User from './user';
import { PluginList } from './plugin';
import { UploadedFileList } from './uploadedfile';
import Note from './note';
import { TagList } from './tag';
import { CommentList } from './comment';
import { FileList } from './feedfile';
import { PluginInstanceList } from './plugininstance';

/**
 * API feed objects.
 *
 * @module feed
 */
export class Feed extends ItemResource {
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
   * Fetch the note associated to this feed from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getNote(timeout = 30000) {
    const linkRelation = 'note';
    const resourceClass = Note;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch a list of tags associated to this feed from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getTags(params = null, timeout = 30000) {
    const linkRelation = 'tags';
    const resourceClass = TagList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of comments associated to this feed from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getComments(params = null, timeout = 30000) {
    const linkRelation = 'comments';
    const resourceClass = CommentList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of files associated to this feed from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getFiles(params = null, timeout = 30000) {
    const linkRelation = 'files';
    const resourceClass = FileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch the plugin instance that created this feed from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getPluginInstance(timeout = 30000) {
    const linkRelation = 'plugin_inst';
    const resourceClass = PluginInstanceList;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

export class FeedList extends ListResource {
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
   * Get the list of item objects.
   *
   * @return {*}
   */
  get items() {
    return this._getItems(Feed);
  }

  /**
   * Fetch currently authenticated user's information from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getUser(timeout = 30000) {
    const linkRelation = 'user';
    const resourceClass = User;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch a list of plugins from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getPlugins(params = null, timeout = 30000) {
    const linkRelation = 'plugins';
    const resourceClass = PluginList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of tags from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getTags(params = null, timeout = 30000) {
    const linkRelation = 'tags';
    const resourceClass = TagList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of uploaded files from the REST API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getUploadedFiles(params = null, timeout = 30000) {
    const linkRelation = 'uploadedfiles';
    const resourceClass = UploadedFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}
