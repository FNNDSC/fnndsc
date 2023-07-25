"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinePipingDefaultParameterList = exports.PipelinePluginPipingList = exports.PipelinePluginList = exports.PipingDefaultParameter = exports.PluginPiping = exports.PipelineList = exports.Pipeline = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const plugin_1 = require("./plugin");
const pluginparameter_1 = require("./pluginparameter");
const pipelineinstance_1 = require("./pipelineinstance");
/**
 * Pipeline item resource object representing a pipeline.
 */
class Pipeline extends resource_1.ItemResource {
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
     * Fetch a list of plugins associated to this pipeline from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelinePluginList>} - JS Promise, resolves to a ``PipelinePluginList`` object
     */
    getPlugins(params = null, timeout = 30000) {
        const linkRelation = 'plugins';
        const resourceClass = PipelinePluginList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
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
    getPluginPipings(params = null, timeout = 30000) {
        const linkRelation = 'plugin_pipings';
        const resourceClass = PipelinePluginPipingList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
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
    getDefaultParameters(params = null, timeout = 30000) {
        const linkRelation = 'default_parameters';
        const resourceClass = PipelinePipingDefaultParameterList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
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
    getPipelineInstances(params = null, timeout = 30000) {
        const linkRelation = 'instances';
        const resourceClass = pipelineinstance_1.PipelineInstanceList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
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
    put(data, timeout = 30000) {
        return this._put(data, null, timeout);
    }
    /**
     * Make a DELETE request to delete this pipeline resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.Pipeline = Pipeline;
/**
 * Pipeline list resource object representing a list of pipelines.
 */
class PipelineList extends resource_1.ListResource {
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
        this.itemClass = Pipeline;
    }
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
    getPlugins(searchParams = null, timeout = 30000) {
        const linkRelation = 'plugins';
        const resourceClass = plugin_1.PluginList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
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
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.PipelineList = PipelineList;
/**
 * Plugin piping item resource object representing a plugin piping within
 * a pipeline.
 */
class PluginPiping extends resource_1.ItemResource {
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
     * Fetch the parent plugin piping within the corresponding pipeline from the
     * REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginPiping|null>} - JS Promise, resolves to a ``PluginPiping`` object or ``null``
     */
    getPreviousPluginPiping(timeout = 30000) {
        const linkRelation = 'previous';
        const resourceClass = PluginPiping;
        try {
            return this._getResource(linkRelation, resourceClass, null, timeout);
        }
        catch (e) {
            return Promise.resolve(null);
        }
    }
    /**
     * Fetch the corresponding plugin for this plugin piping from the REST API.
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
    /**
     * Fetch the corresponding pipeline for this plugin piping from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
     */
    getPipeline(timeout = 30000) {
        const linkRelation = 'pipeline';
        const resourceClass = Pipeline;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.PluginPiping = PluginPiping;
/**
 * Item resource object for a plugin piping default parameter which represents a default
 * value for a plugin parameter associated with the corresponding plugin piping.
 */
class PipingDefaultParameter extends resource_1.ItemResource {
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
     * Fetch the corresponding plugin piping for this plugin piping default
     * parameter from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginPiping>} - JS Promise, resolves to a ``PluginPiping`` object
     */
    getPluginPiping(timeout = 30000) {
        const linkRelation = 'plugin_piping';
        const resourceClass = PluginPiping;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Fetch the corresponding plugin parameter for this plugin piping default
     * parameter from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginParameter>} - JS Promise, resolves to a ``PluginParameter`` object
     */
    getPluginParameter(timeout = 30000) {
        const linkRelation = 'plugin_param';
        const resourceClass = pluginparameter_1.PluginParameter;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.PipingDefaultParameter = PipingDefaultParameter;
/**
 * Pipeline-specific plugin list resource object representing a list of plugins
 * composing the pipeline.
 */
class PipelinePluginList extends resource_1.ListResource {
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
        this.itemClass = plugin_1.Plugin;
    }
}
exports.PipelinePluginList = PipelinePluginList;
/**
 * Pipeline-specific plugin piping list resource object representing a list of
 * plugin pipings composing the pipeline.
 */
class PipelinePluginPipingList extends resource_1.ListResource {
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
        this.itemClass = PluginPiping;
    }
}
exports.PipelinePluginPipingList = PipelinePluginPipingList;
/**
 * List resource object representing a pipeline-specific list of plugin piping
 * default parameter values for the plugin pipings composing the pipeline.
 */
class PipelinePipingDefaultParameterList extends resource_1.ListResource {
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
        this.itemClass = PipingDefaultParameter;
    }
}
exports.PipelinePipingDefaultParameterList = PipelinePipingDefaultParameterList;
