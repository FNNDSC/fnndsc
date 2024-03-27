/** * Imports ***/
import Request from './request';
import RequestException from './exception';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';
import { FileBrowserFolder } from './filebrowser';

/**
 * User file item resource object representing a user's file.
 */
export class UserFile extends ItemResource {
  /**
   * Fetch the file blob associated to this file item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
   */
  getFileBlob(timeout = 30000) {
    if (this.isEmpty) {
      throw new RequestException('Item object has not been set!');
    }
    const req = new Request(this.auth, 'application/octet-stream', timeout);
    const item = this.collection.items[0];
    const blobUrl = Collection.getLinkRelationUrls(item, 'file_resource')[0];

    return req.get(blobUrl).then(resp => resp.data);
  }

  /**
   * Fetch the parent folder of this file from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
   getParentFolder(timeout = 30000) {
    const linkRelation = 'parent_folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }  

  /**
   * Make a PUT request to modify this user file item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.upload_path - absolute path including file name where the file
   * will be uploaded on the storage service
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  }

  /**
   * Make a DELETE request to delete this user file item resource through the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise} - JS Promise
   */
  delete(timeout = 30000) {
    return this._delete(timeout);
  }
}

/**
 * User file list resource object representing a list of a user's files.
 */
export class UserFileList extends ListResource {
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
    this.itemClass = UserFile;
  }

  /**
   * Make a POST request to this user file list resource to create a new user file
   * item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.upload_path - absolute path including file name where the file
   * will be uploaded on the storage service
   * @param {Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.fname - file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, uploadFileObj, timeout = 30000) {
    return this._post(data, uploadFileObj, timeout);
  }
}
