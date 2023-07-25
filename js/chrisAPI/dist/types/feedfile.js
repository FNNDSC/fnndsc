"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginInstanceFileList = exports.AllFeedFileList = exports.FeedFileList = exports.FeedFile = void 0;
/** * Imports ***/
const request_1 = require("./request");
const exception_1 = require("./exception");
const cj_1 = require("./cj");
const resource_1 = require("./resource");
const feed_1 = require("./feed");
const plugininstance_1 = require("./plugininstance");
/**
 * Feed file item resource object representing a file written to a feed.
 */
class FeedFile extends resource_1.ItemResource {
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
    /**
     * Fetch the plugin instance that created this file item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout = 30000) {
        const linkRelation = 'plugin_inst';
        const resourceClass = plugininstance_1.PluginInstance;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.FeedFile = FeedFile;
/**
 * Feed file list resource object representing a list of files written to a feed.
 */
class FeedFileList extends resource_1.ListResource {
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
        this.itemClass = FeedFile;
    }
    /**
     * Fetch the feed associated to this file list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout = 30000) {
        const linkRelation = 'feed';
        const resourceClass = feed_1.Feed;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.FeedFileList = FeedFileList;
/**
 * Feed file list resource object representing a list of all files written to
 * any user-owned feed.
 */
class AllFeedFileList extends resource_1.ListResource {
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
        this.itemClass = FeedFile;
    }
}
exports.AllFeedFileList = AllFeedFileList;
/**
 * Plugin instance file list resource object representing a list of files written by
 * a plugin instance.
 */
class PluginInstanceFileList extends resource_1.ListResource {
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
        this.itemClass = FeedFile;
    }
    /**
     * Fetch the feed associated to this file list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout = 30000) {
        const linkRelation = 'feed';
        const resourceClass = feed_1.Feed;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Fetch the plugin instance associated to this file list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout = 30000) {
        const linkRelation = 'plugin_inst';
        const resourceClass = plugininstance_1.PluginInstance;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.PluginInstanceFileList = PluginInstanceFileList;
