/** * Imports ***/
import Request from './request';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';

/**
 * API uploaded file objects.
 *
 * @module uploadedfile
 */
export class UploadedFile extends ItemResource {
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

    return req.get(blobUrl).then(resp => resp.data);
  }
}

export class UploadedFileList extends ListResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
    this.itemClass = UploadedFile;
  }
}
