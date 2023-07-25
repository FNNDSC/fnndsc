"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMetaList = exports.PluginMeta = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const plugin_1 = require("./plugin");
const feed_1 = require("./feed");
/**
 * Plugin meta item resource object representing a plugin meta.
 */
class PluginMeta extends resource_1.ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} [auth=null] - authentication object
     * @param {string} [auth.token] - authentication token
     */
    constructor(url, auth = null) {
        super(url, auth);
    }
    /**
     * Fetch a list of plugins associated to this plugin meta from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginMetaPluginList>} - JS Promise, resolves to a ``PluginMetaPluginList`` object
     */
    getPlugins(params = null, timeout = 30000) {
        const linkRelation = 'plugins';
        const resourceClass = plugin_1.PluginMetaPluginList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
}
exports.PluginMeta = PluginMeta;
/**
 * Plugin meta list resource object representing a list of plugin metas.
 */
class PluginMetaList extends resource_1.ListResource {
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
        this.itemClass = PluginMeta;
    }
    /**
     * Fetch a list of plugins from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``PluginList.getSearchParameters`` method
     * can be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginList>} - JS Promise, resolves to a ``PluginList`` object
     */
    getPlugins(searchParams = null, timeout = 30000) {
        const linkRelation = 'plugins';
        const resourceClass = plugin_1.PluginList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
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
exports.PluginMetaList = PluginMetaList;
