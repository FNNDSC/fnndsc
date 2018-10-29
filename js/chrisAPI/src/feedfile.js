/** * Imports ***/
import Request from './request';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';
import { Feed } from './feed';
import { PluginInstance } from './plugininstance';

/**
 * Feed file item resource object.
 */
export class FeedFile extends ItemResource {
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
   * Fetch the file blob associated to this file item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Blob`` object
   */
  getFileBlob(timeout = 30000) {
    const req = new Request(this.auth, 'application/octet-stream', timeout);
    const blobUrl = Collection.getLinkRelationUrls(this.item, 'file_resource')[0];

    return req.get(blobUrl).then(resp => resp.data);
  }

  /**
   * Fetch the feed associated to this file item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the plugin instance that created this file item from the REST API.
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
 * Feed file list resource object.
 */
export class FeedFileList extends ListResource {
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
    this.itemClass = FeedFile;
  }

  /**
   * Fetch the feed associated to this file list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}
