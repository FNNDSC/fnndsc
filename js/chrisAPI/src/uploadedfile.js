/** * Imports ***/
import Request from './request';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';

/**
 * Uploaded file item resource object.
 */
export class UploadedFile extends ItemResource {
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
}

/**
 * Uploaded file list resource object.
 */
export class UploadedFileList extends ListResource {
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
    this.itemClass = UploadedFile;
  }
}
