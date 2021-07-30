/**
 * Plugin meta item resource object representing a plugin meta.
 */
export class PluginMeta extends ItemResource {
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
     * Fetch a list of plugins associated to this plugin meta from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginMetaPluginList>} - JS Promise, resolves to a ``PluginMetaPluginList`` object
     */
    getPlugins(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginMetaPluginList>;
}
/**
 * Plugin meta list resource object representing a list of plugin metas.
 */
export class PluginMetaList extends ListResource {
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
    getPlugins(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginList>;
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
    getFeeds(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FeedList>;
}
import { ItemResource } from "./resource";
import { PluginMetaPluginList } from "./plugin";
import { ListResource } from "./resource";
import { PluginList } from "./plugin";
import { FeedList } from "./feed";
