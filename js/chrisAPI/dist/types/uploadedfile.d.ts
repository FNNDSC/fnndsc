/**
 * Uploaded file item resource object representing a user's uploaded file.
 */
export class UploadedFile extends ItemResource {
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
    getFileBlob(timeout?: number | undefined): Promise<Blob>;
    /**
     * Make a PUT request to modify this uploaded file item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.upload_path - absolute path including file name where the file
     * will be uploaded on the storage service
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data: {
        upload_path: string;
    }, timeout?: number | undefined): Promise<UploadedFile>;
    /**
     * Make a DELETE request to delete this uploaded file item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number | undefined): Promise<any>;
}
/**
 * Uploaded file list resource object representing a list of a user's uploaded files.
 */
export class UploadedFileList extends ListResource {
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
     * Make a POST request to this uploaded file list resource to create a new uploaded file
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
        fname: Object;
    }, timeout?: number | undefined): Promise<UploadedFileList>;
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
