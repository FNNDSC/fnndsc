"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileBrowserPathList = exports.FileBrowserPath = exports.FileBrowserPathFileList = exports.FileBrowserPathFile = void 0;
/** * Imports ***/
const request_1 = require("./request");
const exception_1 = require("./exception");
const cj_1 = require("./cj");
const resource_1 = require("./resource");
/**
 * File browser path file item resource object representing a generic browser file.
 */
class FileBrowserPathFile extends resource_1.ItemResource {
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
            throw new exception_1.default('Item object has not been set!');
        }
        const req = new request_1.default(this.auth, 'application/octet-stream', timeout);
        const item = this.collection.items[0];
        const blobUrl = cj_1.default.getLinkRelationUrls(item, 'file_resource')[0];
        return req.get(blobUrl).then(resp => resp.data);
    }
}
exports.FileBrowserPathFile = FileBrowserPathFile;
/**
 * File browser path file list resource object representing a list of all
 * browser files directly under a folder.
 */
class FileBrowserPathFileList extends resource_1.ListResource {
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
exports.FileBrowserPathFileList = FileBrowserPathFileList;
/**
 * File browser path item resource object representing a file browser path.
 */
class FileBrowserPath extends resource_1.ItemResource {
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
exports.FileBrowserPath = FileBrowserPath;
/**
 * File browser path list resource object representing the initial page of the
 * collection of file browser paths.
 */
class FileBrowserPathList extends resource_1.ListResource {
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
exports.FileBrowserPathList = FileBrowserPathList;
