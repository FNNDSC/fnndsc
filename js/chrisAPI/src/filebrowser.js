/** * Imports ***/
import Request from './request';
import RequestException from './exception';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';

/**
 * File browser folder item resource object representing a folder.
 */
export class FileBrowserFolder extends ItemResource {
  /**
   * Fetch the parent folder of this folder from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
  getParent(timeout = 30000) {
    const linkRelation = 'parent';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch a list of folders that are the children of this folder from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolderChildList>} - JS Promise, resolves to a ``FileBrowserFolderChildList`` object
   */
  getChildren(params = null, timeout = 30000) {
    const linkRelation = 'children';
    const resourceClass = FileBrowserFolderChildList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of files directly under this folder from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolderFileList>} - JS Promise, resolves to a ``FileBrowserFolderFileList`` object
   */
  getFiles(params = null, timeout = 30000) {
    const linkRelation = 'files';
    const resourceClass = FileBrowserFolderFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }  

  /**
   * Fetch a list of link files directly under this folder from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolderLinkFileList>} - JS Promise, resolves to a ``FileBrowserFolderLinkFileList`` object
   */
   getLinkFiles(params = null, timeout = 30000) {
    const linkRelation = 'link_files';
    const resourceClass = FileBrowserFolderLinkFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  } 

  /**
   * Make a DELETE request to delete this file browser folder item resource through the REST API.
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
 * File browser folder list resource object representing a list of folders.
 */
export class FileBrowserFolderList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = FileBrowserFolder;
  }
}


/**
 * File browser folder child list resource object representing a list of all
 * folders directly under a folder.
 */
export class FileBrowserFolderChildList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = FileBrowserFolder;
  }
}

/**
 * File browser folder file item resource object representing a generic browser file.
 */
export class FileBrowserFolderFile extends ItemResource {
  /**
   * Fetch the file blob associated to this browser file item from the REST API.
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
}

/**
 * File browser folder file list resource object representing a list of all
 * files directly under a folder.
 */
export class FileBrowserFolderFileList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = FileBrowserFolderFile;
  }
}

/**
 * File browser folder link file item resource object representing a link file.
 */
export class FileBrowserFolderLinkFile extends ItemResource {
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
   * Fetch the parent folder of this link file from the REST API.
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
   * Fetch the linked resource (file or folder) from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder|FileBrowserFolderFile|null>} - JS Promise, resolves to either a 
   * ``FileBrowserFolder`` object or a ``FileBrowserFolderFileobject`` or ``null`` if the link is broken.
   */
  getLinkedResource(timeout = 30000) {
    if (this.isEmpty) {
      throw new RequestException('Item object has not been set!');
    }
    const item = this.collection.items[0];
    let linkRelation = 'linked_folder';
    let resourceClass = FileBrowserFolder;

    if (!Collection.getLinkRelationUrls(item, linkRelation).length) {
      linkRelation = 'linked_file';
      resourceClass = FileBrowserFolderFile;

      if (!Collection.getLinkRelationUrls(item, linkRelation).length) {
        return null;
      }
    }

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}


/**
 * File browser folder link file list resource object representing a list of all
 * link files directly under a folder.
 */
export class FileBrowserFolderLinkFileList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = FileBrowserFolderLinkFile;
  }
}
