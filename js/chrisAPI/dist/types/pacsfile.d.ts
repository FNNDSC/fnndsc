/**
 * PACS file item resource object representing a PACS file.
 */
export class PACSFile extends ItemResource {
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
}
/**
 * PACS file list resource object representing a list of PACS files.
 */
export class PACSFileList extends ListResource {
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
}
import { ItemResource } from "./resource";
import { FileBrowserFolder } from "./filebrowser";
import { ListResource } from "./resource";
