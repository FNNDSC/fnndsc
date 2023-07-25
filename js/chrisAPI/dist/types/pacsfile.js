"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACSFileList = exports.PACSFile = void 0;
/** * Imports ***/
const request_1 = require("./request");
const exception_1 = require("./exception");
const cj_1 = require("./cj");
const resource_1 = require("./resource");
/**
 * PACS file item resource object representing a PACS file.
 */
class PACSFile extends resource_1.ItemResource {
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
}
exports.PACSFile = PACSFile;
/**
 * PACS file list resource object representing a list of PACS files.
 */
class PACSFileList extends resource_1.ListResource {
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
        this.itemClass = PACSFile;
    }
}
exports.PACSFileList = PACSFileList;
