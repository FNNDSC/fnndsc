/**
 * Compute resource item resource object representing a compute resource.
 */
export class ComputeResource extends ItemResource {
}
/**
 * Compute resource list resource object representing a list of compute resources.
 */
export class ComputeResourceList extends ListResource {
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
/**
 * Plugin-specific compute resource list resource object representing a list of
 * compute resources registered with an specific plugin.
 */
export class PluginComputeResourceList extends ListResource {
    /**
     * Fetch the plugin associated to this compute resource list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout?: number): Promise<Plugin>;
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
import { FeedList } from "./feed";
import { Plugin } from "./plugin";
