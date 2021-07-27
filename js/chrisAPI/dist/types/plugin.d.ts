/**
 * Plugin item resource object representing a plugin.
 */
export class Plugin extends ItemResource {
    /**
     * Fetch a list of plugin parameters associated to this plugin from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``PluginParameterList`` object
     */
    getPluginParameters(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
    /**
     * Fetch a list of compute resources registered with this plugin from the REST
     * API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``PluginComputeResourceList`` object
     */
    getPluginComputeResources(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
    /**
     * Fetch a list of plugin instances associated to this plugin from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``PluginInstanceList`` object
     */
    getPluginInstances(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
}
/**
 * Plugin list resource object representing a list of plugins.
 */
export class PluginList extends ListResource {
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
     * @return {Object} - JS Promise, resolves to a ``FeedList`` object
     */
    getFeeds(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
}
/**
 * Plugin meta-specific plugin list resource object representing a list of
 * plugins associated to an specific plugin meta.
 */
export class PluginMetaPluginList extends ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} [auth=null] - authentication object
     * @param {string} [auth.token] - authentication token
     */
    constructor(url: string, auth?: {
        token?: string;
    });
    /**
     * Fetch the plugin meta associated to this plugin meta-specific list of
     * plugins from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``PluginMeta`` object
     */
    getPluginMeta(timeout?: number): any;
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";