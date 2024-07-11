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
   * Fetch a list of group permissions associated to this folder from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match folder group permission id exactly with this number
   * @param {string} [searchParams.group_name] - match group name exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FolderGroupPermissionList>} - JS Promise, resolves to a ``FolderGroupPermissionList`` object
   */
   getGroupPermissions(searchParams = null, timeout = 30000) {
    const linkRelation = 'group_permissions';
    const resourceClass = FolderGroupPermissionList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  } 

  /**
   * Get a folder group permission given the name of the group.
   *
   * @param {string} group_name - folder group permission's group name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FolderGroupPermission|null>} - JS Promise, resolves to a ``FolderGroupPermission`` object or ``null``
   */
  getGroupPermission(group_name, timeout = 30000) {
    return this.getGroupPermissions({ group_name: group_name }, timeout).then(listRes => {
      const items = listRes.getItems();
      return items.length ? items[0] : null;
    });
  } 

  /**
   * Fetch a list of user permissions associated to this folder from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match folder user permission id exactly with this number
   * @param {string} [searchParams.username] - match username exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FolderUserPermissionList>} - JS Promise, resolves to a ``FolderUserPermissionList`` object
   */
   getUserPermissions(searchParams = null, timeout = 30000) {
    const linkRelation = 'user_permissions';
    const resourceClass = FolderUserPermissionList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  } 

  /**
   * Get a folder user permission given the username of the user.
   *
   * @param {string} username - folder user permission's username
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FolderUserPermission|null>} - JS Promise, resolves to a ``FolderUserPermission`` object or ``null``
   */
   getUserPermission(username, timeout = 30000) {
    return this.getUserPermissions({ username: username }, timeout).then(listRes => {
      const items = listRes.getItems();
      return items.length ? items[0] : null;
    });
  } 

   /**
   * Make the folder public.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   makePublic(timeout = 30000) {
    return this.put({ public: true }, timeout);
  } 

  /**
   * Make the folder unpublic.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   makeUnpublic(timeout = 30000) {
    return this.put({ public: false }, timeout);
  } 
  
  /**
   * Add a group permission to access the folder.
   *
   * @param {string} group_name - group's name
   * @param {string} permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FolderGroupPermission>} - JS Promise, resolves to a ``FolderGroupPermission`` object
   */
   addGroupPermission(group_name, permission, timeout = 30000) {
    return this.getGroupPermissions(null, timeout)
      .then(listRes => listRes.post({ grp_name: group_name, permission: permission }), timeout)
      .then(listRes => listRes.getItems()[0]);
  } 

  /**
   * Add a user permission to access the folder.
   *
   * @param {string} username - user's username
   * @param {string} permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FolderUserPermission>} - JS Promise, resolves to a ``FolderUserPermission`` object
   */
   addUserPermission(username, permission, timeout = 30000) {
    return this.getUserPermissions(null, timeout)
      .then(listRes => listRes.post({ username: username, permission: permission }), timeout)
      .then(listRes => listRes.getItems()[0]);
  } 

  /**
   * Make a PUT request to modify this folder item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {boolean} data.public - public status of the folder
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  put(data, timeout = 30000) {
    return this._put(data, null, timeout);
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

  /**
   * Make a POST request to this file browser folder list resource to create a new file browser 
   * folder item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.path - folder path
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
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
   * Make a PUT request to modify this file item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {boolean} [data.public] - public status of the file
   * @param {string} [data.new_file_path] - absolute path including file name where the file
   * will be uploaded on the storage service
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  } 

  /**
   * Make a DELETE request to delete this file item resource through the REST API.
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


/**
 * Folder group permission item resource object representing a folder group permission.
 */
export class FolderGroupPermission extends ItemResource {
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
   * Fetch the folder associated to the group permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
  getFolder(timeout = 30000) {
    const linkRelation = 'folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the group associated to the group permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Group>} - JS Promise, resolves to a ``Group`` object
   */
   getGroup(timeout = 30000) {
    const linkRelation = 'group';
    const resourceClass = Group;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  } 

  /**
   * Make a PUT request to modify this folder group permission item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {boolean} data.permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  } 

  /**
   * Make a DELETE request to delete this folder group permission item resource through the REST API.
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
 * Folder group permission list resource object representing a list of folder group permissions.
 */
export class FolderGroupPermissionList extends ListResource {
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
    this.itemClass = FolderGroupPermission;
  }

  /**
   * Fetch the folder associated to the group permission list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
  getFolder(timeout = 30000) {
    const linkRelation = 'folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a POST request to this folder group permission list resource to create a new 
   * folder group permission item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.grp_name - group name
   * @param {string} data.permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}

/**
 * Folder user permission item resource object representing a folder user permission.
 */
export class FolderUserPermission extends ItemResource {
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
   * Fetch the folder associated to the user permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
  getFolder(timeout = 30000) {
    const linkRelation = 'folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the user associated to the user permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
   */
   getUser(timeout = 30000) {
    const linkRelation = 'user';
    const resourceClass = User;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  } 

  /**
   * Make a PUT request to modify this folder user permission item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {boolean} data.permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  } 

  /**
   * Make a DELETE request to delete this folder user permission item resource through the REST API.
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
 * Folder user permission list resource object representing a list of folder user permissions.
 */
export class FolderUserPermissionList extends ListResource {
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
    this.itemClass = FolderUserPermission;
  }

  /**
   * Fetch the folder associated to the user permission list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
  getFolder(timeout = 30000) {
    const linkRelation = 'folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a POST request to this folder user permission list resource to create a new 
   * folder user permission item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.username - user's username
   * @param {string} data.permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}

/**
 * File group permission item resource object representing a file group permission.
 */
export class FileGroupPermission extends ItemResource {
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
   * Fetch the file associated to the group permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolderFile>} - JS Promise, resolves to a ``FileBrowserFolderFile`` object
   */
  getFile(timeout = 30000) {
    const linkRelation = 'file';
    const resourceClass = FileBrowserFolderFile;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the group associated to the group permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Group>} - JS Promise, resolves to a ``Group`` object
   */
   getGroup(timeout = 30000) {
    const linkRelation = 'group';
    const resourceClass = Group;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  } 

  /**
   * Make a PUT request to modify this file group permission item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {boolean} data.permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  } 

  /**
   * Make a DELETE request to delete this file group permission item resource through the REST API.
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
 * File group permission list resource object representing a list of file group permissions.
 */
export class FileGroupPermissionList extends ListResource {
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
    this.itemClass = FileGroupPermission;
  }

  /**
   * Fetch the file associated to the group permission list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolderFile>} - JS Promise, resolves to a ``FileBrowserFolderFile`` object
   */
  getFile(timeout = 30000) {
    const linkRelation = 'file';
    const resourceClass = FileBrowserFolderFile;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a POST request to this file group permission list resource to create a new 
   * file group permission item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.grp_name - group name
   * @param {string} data.permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}

/**
 * File user permission item resource object representing a file user permission.
 */
export class FileUserPermission extends ItemResource {
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
   * Fetch the file associated to the user permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolderFile>} - JS Promise, resolves to a ``FileBrowserFolderFile`` object
   */
  getFile(timeout = 30000) {
    const linkRelation = 'file';
    const resourceClass = FileBrowserFolderFile;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the user associated to the user permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
   */
   getUser(timeout = 30000) {
    const linkRelation = 'user';
    const resourceClass = User;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  } 

  /**
   * Make a PUT request to modify this file user permission item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {boolean} data.permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  } 

  /**
   * Make a DELETE request to delete this file user permission item resource through the REST API.
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
 * File user permission list resource object representing a list of file user permissions.
 */
export class FileUserPermissionList extends ListResource {
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
    this.itemClass = FileUserPermission;
  }

  /**
   * Fetch the file associated to the user permission list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolderFile>} - JS Promise, resolves to a ``FileBrowserFolderFile`` object
   */
  getFile(timeout = 30000) {
    const linkRelation = 'file';
    const resourceClass = FileBrowserFolderFile;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a POST request to this file user permission list resource to create a new 
   * file user permission item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.username - user's username
   * @param {string} data.permission - permission, can be 'r' or 'w'
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}
