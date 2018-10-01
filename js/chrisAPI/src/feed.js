/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';
import User from './user';
import { PluginList } from './plugin';
import { UploadedFileList } from './uploadedfile';
import { TagList } from './tag';

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
   * Fetch currently authenticated user's information.
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
   * Fetch a list of plugins.
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
   * Fetch a list of tags.
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
   * Fetch a list of uploaded files.
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
