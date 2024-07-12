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
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the file blob associated to this file item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
     */
    getFileBlob(timeout?: number): Promise<Blob>;
    /**
     * Fetch the parent folder of this file from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
     */
    getParentFolder(timeout?: number): Promise<FileBrowserFolder>;
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
    getGroupPermissions(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        group_name?: string;
    }, timeout?: number): Promise<FileGroupPermissionList>;
    /**
     * Get a file group permission given the name of the group.
     *
     * @param {string} group_name - file group permission's group name
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileGroupPermission|null>} - JS Promise, resolves to a ``FileGroupPermission`` object or ``null``
     */
    getGroupPermission(group_name: string, timeout?: number): Promise<FileGroupPermission | null>;
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
    getUserPermissions(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        username?: string;
    }, timeout?: number): Promise<FileUserPermissionList>;
    /**
     * Get a file user permission given the username of the user.
     *
     * @param {string} username - file user permission's username
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileUserPermission|null>} - JS Promise, resolves to a ``FileUserPermission`` object or ``null``
     */
    getUserPermission(username: string, timeout?: number): Promise<FileUserPermission | null>;
    /**
    * Make the file public.
    *
    * @param {number} [timeout=30000] - request timeout
    *
    * @return {Promise<this>} - JS Promise, resolves to ``this`` object
    */
    makePublic(timeout?: number): Promise<UserFile>;
    /**
     * Make the file unpublic.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    makeUnpublic(timeout?: number): Promise<UserFile>;
    /**
     * Add a group permission to access the file.
     *
     * @param {string} group_name - group's name
     * @param {string} permission - permission, can be 'r' or 'w'
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileGroupPermission>} - JS Promise, resolves to a ``FileGroupPermission`` object
     */
    addGroupPermission(group_name: string, permission: string, timeout?: number): Promise<FileGroupPermission>;
    /**
     * Add a user permission to access the file.
     *
     * @param {string} username - user's username
     * @param {string} permission - permission, can be 'r' or 'w'
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileUserPermission>} - JS Promise, resolves to a ``FileUserPermission`` object
     */
    addUserPermission(username: string, permission: string, timeout?: number): Promise<FileUserPermission>;
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
    put(data: {
        public?: boolean;
        upload_path?: string;
    }, timeout?: number): Promise<UserFile>;
    /**
     * Make a DELETE request to delete this user file item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
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
    constructor(url: string, auth: {
        token: string;
    });
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
    post(data: {
        upload_path: string;
    }, uploadFileObj: {
        fname: any;
    }, timeout?: number): Promise<UserFileList>;
}
import { ItemResource } from "./resource";
import { FileBrowserFolder } from "./filebrowser";
import { FileGroupPermissionList } from "./filebrowser";
import { FileGroupPermission } from "./filebrowser";
import { FileUserPermissionList } from "./filebrowser";
import { FileUserPermission } from "./filebrowser";
import { ListResource } from "./resource";
