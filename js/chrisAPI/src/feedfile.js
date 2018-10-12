/** * Imports ***/
import Request from './request';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';
import { Feed } from './feed';
import { PluginInstance } from './plugininstance';

/**
 * API feed file objects.
 *
 * @module feedfile
 */
export class FeedFile extends ItemResource {
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
   * Fetch the file blob associated to this file item from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getFileBlob(timeout = 30000) {
    const req = new Request(this.auth, 'application/octet-stream', timeout);
    const blobUrl = Collection.getLinkRelationUrls(this.item, 'file_resource')[0];

    return req.get(blobUrl);
  }

  /**
   * Fetch the feed associated to this file item from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the plugin instance that created this file item from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getPluginInstance(timeout = 30000) {
    const linkRelation = 'plugin_inst';
    const resourceClass = PluginInstance;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

export class FeedFileList extends ListResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
    this.itemClass = FeedFile;
  }

  /**
   * Fetch the feed associated to this file list from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}
