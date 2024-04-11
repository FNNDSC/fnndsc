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
    getParent(timeout?: number): Promise<FileBrowserFolder>;
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
    getChildren(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FileBrowserFolderChildList>;
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
    getFiles(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FileBrowserFolderFileList>;
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
    getLinkFiles(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FileBrowserFolderLinkFileList>;
    /**
     * Make a DELETE request to delete this file browser folder item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * File browser folder list resource object representing a list of folders.
 */
export class FileBrowserFolderList extends ListResource {
    /**
     * Make a POST request to this file browser folder list resource to create a new file browser
     * folder item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.path] - folder path
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: {
        path?: string;
    }, timeout?: number): Promise<FileBrowserFolderList>;
}
/**
 * File browser folder child list resource object representing a list of all
 * folders directly under a folder.
 */
export class FileBrowserFolderChildList extends ListResource {
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
    getFileBlob(timeout?: number): Promise<Blob>;
    /**
     * Fetch the parent folder of this file from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
     */
    getParentFolder(timeout?: number): Promise<FileBrowserFolder>;
}
/**
 * File browser folder file list resource object representing a list of all
 * files directly under a folder.
 */
export class FileBrowserFolderFileList extends ListResource {
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
    getFileBlob(timeout?: number): Promise<Blob>;
    /**
     * Fetch the parent folder of this link file from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
     */
    getParentFolder(timeout?: number): Promise<FileBrowserFolder>;
    /**
     * Fetch the linked resource (file or folder) from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder|FileBrowserFolderFile|null>} - JS Promise, resolves to either a
     * ``FileBrowserFolder`` object or a ``FileBrowserFolderFileobject`` or ``null`` if the link is broken.
     */
    getLinkedResource(timeout?: number): Promise<FileBrowserFolder | FileBrowserFolderFile | null>;
}
/**
 * File browser folder link file list resource object representing a list of all
 * link files directly under a folder.
 */
export class FileBrowserFolderLinkFileList extends ListResource {
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
