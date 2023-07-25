/**
 * Pipeline item resource object representing a pipeline.
 */
export class Pipeline extends ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch a list of plugins associated to this pipeline from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelinePluginList>} - JS Promise, resolves to a ``PipelinePluginList`` object
     */
    getPlugins(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PipelinePluginList>;
    /**
     * Fetch a list of plugin pipings associated to this pipeline from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelinePluginPipingList>} - JS Promise, resolves to a ``PipelinePluginPipingList`` object
     */
    getPluginPipings(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PipelinePluginPipingList>;
    /**
     * Fetch a list of plugin piping default parameter values for the plugin
     * pipings composing the pipeline from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelinePipingDefaultParameterList>} - JS Promise, resolves to a ``PipelinePipingDefaultParameterList`` object
     */
    getDefaultParameters(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PipelinePipingDefaultParameterList>;
    /**
     * Fetch a list of pipeline instances associated to this pipeline from the
     * REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineInstanceList>} - JS Promise, resolves to a ``PipelineInstanceList`` object
     */
    getPipelineInstances(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PipelineInstanceList>;
    /**
     * Make a PUT request to modify this pipeline resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.name] - pipeline name
     * @param {string} [data.authors] - pipeline authors
     * @param {string} [data.category] - pipeline category
     * @param {string} [data.description] - pipeline description
     * @param {boolean} [data.locked] - pipeline lock status
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data: {
        name?: string | undefined;
        authors?: string | undefined;
        category?: string | undefined;
        description?: string | undefined;
        locked?: boolean | undefined;
    }, timeout?: number | undefined): Promise<Pipeline>;
    /**
     * Make a DELETE request to delete this pipeline resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number | undefined): Promise<any>;
}
/**
 * Pipeline list resource object representing a list of pipelines.
 */
export class PipelineList extends ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
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
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PluginList>;
    /**
     * Make a POST request to this pipeline list resource to create a new pipeline
     * item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.name - pipeline name
     * @param {string} [data.authors] - pipeline authors
     * @param {string} [data.category] - pipeline category
     * @param {string} [data.description] - pipeline description
     * @param {boolean} [data.locked=true] - pipeline status
     * @param {string} [data.plugin_tree] - JSON string containing a plugin tree list
     * @param {number} [data.plugin_inst_id] - plugin instance id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: {
        name: string;
        authors?: string | undefined;
        category?: string | undefined;
        description?: string | undefined;
        locked?: boolean | undefined;
        plugin_tree?: string | undefined;
        plugin_inst_id?: number | undefined;
    }, timeout?: number | undefined): Promise<PipelineList>;
}
/**
 * Plugin piping item resource object representing a plugin piping within
 * a pipeline.
 */
export class PluginPiping extends ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the parent plugin piping within the corresponding pipeline from the
     * REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginPiping|null>} - JS Promise, resolves to a ``PluginPiping`` object or ``null``
     */
    getPreviousPluginPiping(timeout?: number | undefined): Promise<PluginPiping | null>;
    /**
     * Fetch the corresponding plugin for this plugin piping from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout?: number | undefined): Promise<Plugin>;
    /**
     * Fetch the corresponding pipeline for this plugin piping from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
     */
    getPipeline(timeout?: number | undefined): Promise<Pipeline>;
}
/**
 * Item resource object for a plugin piping default parameter which represents a default
 * value for a plugin parameter associated with the corresponding plugin piping.
 */
export class PipingDefaultParameter extends ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the corresponding plugin piping for this plugin piping default
     * parameter from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginPiping>} - JS Promise, resolves to a ``PluginPiping`` object
     */
    getPluginPiping(timeout?: number | undefined): Promise<PluginPiping>;
    /**
     * Fetch the corresponding plugin parameter for this plugin piping default
     * parameter from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginParameter>} - JS Promise, resolves to a ``PluginParameter`` object
     */
    getPluginParameter(timeout?: number | undefined): Promise<PluginParameter>;
}
/**
 * Pipeline-specific plugin list resource object representing a list of plugins
 * composing the pipeline.
 */
export class PipelinePluginList extends ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
}
/**
 * Pipeline-specific plugin piping list resource object representing a list of
 * plugin pipings composing the pipeline.
 */
export class PipelinePluginPipingList extends ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
}
/**
 * List resource object representing a pipeline-specific list of plugin piping
 * default parameter values for the plugin pipings composing the pipeline.
 */
export class PipelinePipingDefaultParameterList extends ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
}
import { ItemResource } from "./resource";
import { PipelineInstanceList } from "./pipelineinstance";
import { ListResource } from "./resource";
import { PluginList } from "./plugin";
import { Plugin } from "./plugin";
import { PluginParameter } from "./pluginparameter";
