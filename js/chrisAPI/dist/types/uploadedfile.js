"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadedFileList = exports.UploadedFile = void 0;
/** * Imports ***/
const request_1 = require("./request");
const exception_1 = require("./exception");
const cj_1 = require("./cj");
const resource_1 = require("./resource");
/**
 * Uploaded file item resource object representing a user's uploaded file.
 */
class UploadedFile extends resource_1.ItemResource {
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
            throw new exception_1.default('Item object has not been set!');
        }
        const req = new request_1.default(this.auth, 'application/octet-stream', timeout);
        const item = this.collection.items[0];
        const blobUrl = cj_1.default.getLinkRelationUrls(item, 'file_resource')[0];
        return req.get(blobUrl).then(resp => resp.data);
    }
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
    put(data, timeout = 30000) {
        return this._put(data, null, timeout);
    }
    /**
     * Make a DELETE request to delete this uploaded file item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.UploadedFile = UploadedFile;
/**
 * Uploaded file list resource object representing a list of a user's uploaded files.
 */
class UploadedFileList extends resource_1.ListResource {
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
        this.itemClass = UploadedFile;
    }
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
    post(data, uploadFileObj, timeout = 30000) {
        return this._post(data, uploadFileObj, timeout);
    }
}
exports.UploadedFileList = UploadedFileList;
