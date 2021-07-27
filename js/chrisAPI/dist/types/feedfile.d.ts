/**
 * Feed file item resource object representing a file written to a feed.
 */
export class FeedFile extends ItemResource {
    /**
     * Fetch the file blob associated to this file item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``Blob`` object
     * @throws {RequestException} throw error if this item resource has not yet been
     * fetched from the REST API
     */
    getFileBlob(timeout?: number): any;
    /**
     * Fetch the plugin instance that created this file item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout?: number): any;
}
/**
 * Feed file list resource object representing a list of files written to a feed.
 */
export class FeedFileList extends ListResource {
    /**
     * Fetch the feed associated to this file list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): any;
}
/**
 * Feed file list resource object representing a list of all files written to
 * any user-owned feed.
 */
export class AllFeedFileList extends ListResource {
}
/**
 * Plugin instance file list resource object representing a list of files written by
 * a plugin instance.
 */
export class PluginInstanceFileList extends ListResource {
    /**
     * Fetch the feed associated to this file list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): any;
    /**
     * Fetch the plugin instance associated to this file list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout?: number): any;
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
