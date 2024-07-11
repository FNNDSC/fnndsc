/** * Imports ***/
import Request from './request';
import RequestException from './exception';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';
import { 
  FileBrowserFolder, 
  FileGroupPermissionList, 
  FileUserPermissionList, 
  FileGroupPermission, 
  FileUserPermission 
} from './filebrowser';

/**
 * User file item resource object representing a user's file.
 */
export class UserFile extends ItemResource {
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
   * Fetch a list of group permissions associated to this file from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file group permission id exactly with this number
   * @param {string} [searchParams.group_name] - match group name exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileGroupPermissionList>} - JS Promise, resolves to a ``FileGroupPermissionList`` object
   */
   getGroupPermissions(searchParams = null, timeout = 30000) {
    const linkRelation = 'group_permissions';
    const resourceClass = FileGroupPermissionList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  } 

  /**
   * Get a file group permission given the name of the group.
   *
   * @param {string} group_name - file group permission's group name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileGroupPermission|null>} - JS Promise, resolves to a ``FileGroupPermission`` object or ``null``
   */
  getGroupPermission(group_name, timeout = 30000) {
    return this.getGroupPermissions({ group_name: group_name }, timeout).then(listRes => {
      const items = listRes.getItems();
      return items.length ? items[0] : null;
    });
  } 

  /**
   * Fetch a list of user permissions associated to this file from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file user permission id exactly with this number
   * @param {string} [searchParams.username] - match username exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileUserPermissionList>} - JS Promise, resolves to a ``FileUserPermissionList`` object
   */
   getUserPermissions(searchParams = null, timeout = 30000) {
    const linkRelation = 'user_permissions';
    const resourceClass = FileUserPermissionList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  } 

  /**
   * Get a file user permission given the username of the user.
   *
   * @param {string} username - file user permission's username
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileUserPermission|null>} - JS Promise, resolves to a ``FileUserPermission`` object or ``null``
   */
   getUserPermission(username, timeout = 30000) {
    return this.getUserPermissions({ username: username }, timeout).then(listRes => {
      const items = listRes.getItems();
      return items.length ? items[0] : null;
    });
  } 

   /**
   * Make the file public.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   makePublic(timeout = 30000) {
    return this.put({ public: true }, timeout);
  } 

  /**
   * Make the file unpublic.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   makeUnpublic(timeout = 30000) {
    return this.put({ public: false }, timeout);
  } 
  
  /**
   * Add a group permission to access the file.
   *
   * @param {string} group_name - group's name
   * @param {string} permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileGroupPermission>} - JS Promise, resolves to a ``FileGroupPermission`` object
   */
   addGroupPermission(group_name, permission, timeout = 30000) {
    return this.getGroupPermissions(null, timeout)
      .then(listRes => listRes.post({ grp_name: group_name, permission: permission }), timeout)
      .then(listRes => listRes.getItems()[0]);
  } 

  /**
   * Add a user permission to access the file.
   *
   * @param {string} username - user's username
   * @param {string} permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileUserPermission>} - JS Promise, resolves to a ``FileUserPermission`` object
   */
   addUserPermission(username, permission, timeout = 30000) {
    return this.getUserPermissions(null, timeout)
      .then(listRes => listRes.post({ username: username, permission: permission }), timeout)
      .then(listRes => listRes.getItems()[0]);
  } 

  /**
   * Make a PUT request to modify this user file item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {boolean} [data.public] - public status of the file
   * @param {string} [data.upload_path] - absolute path including file name where the file
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
