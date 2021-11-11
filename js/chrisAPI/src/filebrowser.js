/** * Imports ***/
import Request from './request';
import RequestException from './exception';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';


/**
 * File browser path file item resource object representing a generic browser file.
 */
 export class FileBrowserPathFile extends ItemResource {
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
    * Fetch the file blob associated to this browser file item from the REST API.
    *
    * @param {number} [timeout=30000] - request timeout
    *
    * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
    * @throws {RequestException} throw error if this item resource has not yet been
    * fetched from the REST API
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
 }


/**
 * File browser path file list resource object representing a list of all
 * browser files directly under a folder.
 */
export class FileBrowserPathFileList extends ListResource {
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
    this.itemClass = FileBrowserPathFile;
  }
}

/**
 * File browser path item resource object representing a file browser path.
 */
export class FileBrowserPath extends ItemResource {
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
   * Fetch the paginated list of files directly under this file browser path from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserPathFileList>} - JS Promise, resolves to a ``FileBrowserPathFileList`` object
   */
  getFiles(params = null, timeout = 30000) {
    const linkRelation = 'files';
    const resourceClass = FileBrowserPathFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}

/**
 * File browser path list resource object representing the initial page of the
 * collection of file browser paths.
 */
export class FileBrowserPathList extends ListResource {
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
    this.itemClass = FileBrowserPath;
  }
}
