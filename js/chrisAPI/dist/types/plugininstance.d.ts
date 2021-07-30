/**
 * Plugin instance item resource object representing a plugin instance.
 */
export class PluginInstance extends ItemResource {
    /**
     * Fetch the feed created by this plugin instance from the REST API
     * (only for fs plugins, 'ds' plugins pass null to the resultant Promise).
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed|null>} - JS Promise, resolves to a ``Feed`` object or ``null``
     */
    getFeed(timeout?: number): Promise<Feed | null>;
    /**
     * Fetch the plugin associated to this plugin instance item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout?: number): Promise<Plugin>;
    /**
     * Fetch the compute resource associated to this plugin instance item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ComputeResource>} - JS Promise, resolves to a ``ComputeResource`` object
     */
    getComputeResource(timeout?: number): Promise<ComputeResource>;
    /**
     * Fetch the parent plugin instance of this plugin instance from the REST API
     * (only for 'ds' plugins, 'fs' plugins pass null to the resultant Promise).
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance|null>} - JS Promise, resolves to a ``PluginInstance`` object or ``null``
     */
    getPreviousPluginInstance(timeout?: number): Promise<PluginInstance | null>;
    /**
     * Fetch the pipeline instance (if any) that created this plugin instance from
     * the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineInstance|null>} - JS Promise, resolves to a ``PipelineInstance`` object or ``null``
     */
    getPipelineInstance(timeout?: number): Promise<PipelineInstance | null>;
    /**
     * Fetch a list of plugin instances that are descendents of this plugin instance from the
     * REST API.
     *
     * @param {Object} [params=null] - page parameters
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstanceDescendantList>} - JS Promise, resolves to a ``PluginInstanceDescendantList`` object
     */
    getDescendantPluginInstances(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginInstanceDescendantList>;
    /**
     * Fetch a list of plugin instance parameters associated to this plugin instance from
     * the REST API.
     *
     * @param {Object} [params=null] - page parameters
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstanceParameterList>} - JS Promise, resolves to a ``PluginInstanceParameterList`` object
     */
    getParameters(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginInstanceParameterList>;
    /**
     * Fetch a list of files created by this plugin instance from the REST API.
     *
     * @param {Object} [params=null] - page parameters
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstanceFileList>} - JS Promise, resolves to a ``PluginInstanceFileList`` object
     */
    getFiles(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginInstanceFileList>;
    /**
     * Fetch a list of output directory splits applied to this plugin instance from the
     * REST API.
     *
     * @param {Object} [params=null] - page parameters
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstanceSplitList>} - JS Promise, resolves to a ``PluginInstanceSplitList`` object
     */
    getSplits(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginInstanceSplitList>;
    /**
     * Make a PUT request to modify this plugin instance resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.title] - title of the plugin instance
     * @param {string} [data.status] - execution status of the plugin instance (eg. `cancelled`)
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data: {
        title?: string;
        status?: string;
    }, timeout?: number): Promise<PluginInstance>;
    /**
     * Make a DELETE request to delete this plugin instance resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * Plugin instance list resource object representing a list of plugin-specific
 * instances.
 */
export class PluginInstanceList extends ListResource {
    /**
     * Fetch the plugin associated to this plugin instance list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout?: number): Promise<Plugin>;
    /**
     * Make a POST request to this plugin instance list resource to create a new plugin
     * instance item resource through the REST API.
     *
     * @param {Object} data - request JSON data object which is plugin-specific and it's
     * properties can be determined by calling the ``getPOSTParameters`` method on this
     * resource object
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: any, timeout?: number): Promise<PluginInstanceList>;
}
/**
 * Plugin instance list resource object representing a list of all plugin
 * instances.
 */
export class AllPluginInstanceList extends ListResource {
    /**
     * Fetch a list of plugins from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``PluginList.getSearchParameters`` method can be
     * used to get a list of possible search parameters
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
}
/**
 * Feed-specific plugin instance list resource object representing a list of plugin
 * instances associated to an specific feed.
 */
export class FeedPluginInstanceList extends ListResource {
    /**
     * Fetch the feed associated to this feed-specific list of plugin instances from
     * the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): Promise<Feed>;
}
/**
 * Pipeline instance-specific plugin instance list resource object representing
 * a list of plugin instances associated to an specific pipeline instance.
 */
export class PipelineInstancePluginInstanceList extends ListResource {
}
/**
 * Plugin instance descendant list resource object. This is a list of all plugin
 * instances that have this plugin instance as an ancestor in a pipeline tree.
 */
export class PluginInstanceDescendantList extends ListResource {
}
/**
 * Plugin instance split item resource object representing an output directory
 * split that has been applied to a plugin instance.
 */
export class PluginInstanceSplit extends ItemResource {
    /**
     * Fetch the plugin instance associated to this split item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout?: number): Promise<PluginInstance>;
}
/**
 * Plugin instance split list resource object. This is a list of all output
 * directory splits that have been applied to a plugin instance.
 */
export class PluginInstanceSplitList extends ListResource {
    /**
     * Fetch the plugin instance associated to this split list item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout?: number): Promise<PluginInstance>;
    /**
     * Make a POST request to this plugin instance split list resource to create a
     * new plugin instance split item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.filter] - A comma-separated list of regular expressions
     * @param {string} [data.compute_resource_name] - remote compute resource name
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: {
        filter?: string;
        compute_resource_name?: string;
    }, timeout?: number): Promise<PluginInstanceSplitList>;
}
/**
 * Plugin instance parameter item resource object representing a parameter that
 * the plugin instance was run with.
 */
export class PluginInstanceParameter extends ItemResource {
    /**
     * Fetch the plugin instance associated to this parameter item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout?: number): Promise<PluginInstance>;
    /**
     * Fetch the plugin parameter definition associated to this plugin instance item
     * from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginParameter>} - JS Promise, resolves to a ``PluginParameter`` object
     */
    getPluginParameter(timeout?: number): Promise<PluginParameter>;
}
/**
 * Plugin instance parameter list resource object representing a list of parameters that
 * the plugin instance was run with.
 */
export class PluginInstanceParameterList extends ListResource {
}
import { ItemResource } from "./resource";
import { Feed } from "./feed";
import { Plugin } from "./plugin";
import { ComputeResource } from "./computeresource";
import { PipelineInstance } from "./pipelineinstance";
import { PluginInstanceFileList } from "./feedfile";
import { ListResource } from "./resource";
import { PluginList } from "./plugin";
import { PluginParameter } from "./pluginparameter";
