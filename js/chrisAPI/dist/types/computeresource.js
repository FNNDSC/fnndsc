"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginComputeResourceList = exports.ComputeResourceList = exports.ComputeResource = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const feed_1 = require("./feed");
const plugin_1 = require("./plugin");
/**
 * Compute resource item resource object representing a compute resource.
 */
class ComputeResource extends resource_1.ItemResource {
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
}
exports.ComputeResource = ComputeResource;
/**
 * Compute resource list resource object representing a list of compute resources.
 */
class ComputeResourceList extends resource_1.ListResource {
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
        this.itemClass = ComputeResource;
    }
    /**
     * Fetch a list of feeds from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``FeedList.getSearchParameters`` method
     * can be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedList>} - JS Promise, resolves to a ``FeedList`` object
     */
    getFeeds(searchParams = null, timeout = 30000) {
        const linkRelation = 'feeds';
        const resourceClass = feed_1.FeedList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
}
exports.ComputeResourceList = ComputeResourceList;
/**
 * Plugin-specific compute resource list resource object representing a list of
 * compute resources registered with an specific plugin.
 */
class PluginComputeResourceList extends resource_1.ListResource {
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
        this.itemClass = ComputeResource;
    }
    /**
     * Fetch the plugin associated to this compute resource list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout = 30000) {
        const linkRelation = 'plugin';
        const resourceClass = plugin_1.Plugin;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.PluginComputeResourceList = PluginComputeResourceList;
