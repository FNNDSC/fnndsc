"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginInstanceParameterList = exports.PluginInstanceParameter = exports.PluginInstanceSplitList = exports.PluginInstanceSplit = exports.PluginInstanceDescendantList = exports.WorkflowPluginInstanceList = exports.PipelineInstancePluginInstanceList = exports.FeedPluginInstanceList = exports.AllPluginInstanceList = exports.PluginInstanceList = exports.PluginInstance = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const computeresource_1 = require("./computeresource");
const plugin_1 = require("./plugin");
const feed_1 = require("./feed");
const pluginparameter_1 = require("./pluginparameter");
const feedfile_1 = require("./feedfile");
const pipelineinstance_1 = require("./pipelineinstance");
/**
 * Plugin instance item resource object representing a plugin instance.
 */
class PluginInstance extends resource_1.ItemResource {
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
     * Fetch the feed created by this plugin instance from the REST API
     * (only for fs plugins, 'ds' plugins pass null to the resultant Promise).
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed|null>} - JS Promise, resolves to a ``Feed`` object or ``null``
     */
    getFeed(timeout = 30000) {
        const linkRelation = 'feed';
        const resourceClass = feed_1.Feed;
        try {
            // 'feed' link relation only exists for 'fs' plugin instances
            return this._getResource(linkRelation, resourceClass, null, timeout);
        }
        catch (e) {
            return Promise.resolve(null);
        }
    }
    /**
     * Fetch the plugin associated to this plugin instance item from the REST API.
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
     * Fetch the compute resource associated to this plugin instance item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ComputeResource>} - JS Promise, resolves to a ``ComputeResource`` object
     */
    getComputeResource(timeout = 30000) {
        const linkRelation = 'compute_resource';
        const resourceClass = computeresource_1.ComputeResource;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Fetch the parent plugin instance of this plugin instance from the REST API
     * (only for 'ds' plugins, 'fs' plugins pass null to the resultant Promise).
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance|null>} - JS Promise, resolves to a ``PluginInstance`` object or ``null``
     */
    getPreviousPluginInstance(timeout = 30000) {
        const linkRelation = 'previous';
        const resourceClass = PluginInstance;
        try {
            // 'previous' link relation only exists for 'ds' plugin instances
            return this._getResource(linkRelation, resourceClass, null, timeout);
        }
        catch (e) {
            return Promise.resolve(null);
        }
    }
    /**
     * Fetch the pipeline instance (if any) that created this plugin instance from
     * the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineInstance|null>} - JS Promise, resolves to a ``PipelineInstance`` object or ``null``
     */
    getPipelineInstance(timeout = 30000) {
        const linkRelation = 'pipeline_inst';
        const resourceClass = pipelineinstance_1.PipelineInstance;
        try {
            // 'pipeline_inst' link relation only exists for plugin instances that were
            // created as part of a pipeline instance
            return this._getResource(linkRelation, resourceClass, null, timeout);
        }
        catch (e) {
            return Promise.resolve(null);
        }
    }
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
    getDescendantPluginInstances(params = null, timeout = 30000) {
        const linkRelation = 'descendants';
        const resourceClass = PluginInstanceDescendantList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
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
    getParameters(params = null, timeout = 30000) {
        const linkRelation = 'parameters';
        const resourceClass = PluginInstanceParameterList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
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
    getFiles(params = null, timeout = 30000) {
        const linkRelation = 'files';
        const resourceClass = feedfile_1.PluginInstanceFileList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
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
    getSplits(params = null, timeout = 30000) {
        const linkRelation = 'splits';
        const resourceClass = PluginInstanceSplitList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
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
    put(data, timeout = 30000) {
        return this._put(data, null, timeout);
    }
    /**
     * Make a DELETE request to delete this plugin instance resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.PluginInstance = PluginInstance;
/**
 * Plugin instance list resource object representing a list of plugin-specific
 * instances.
 */
class PluginInstanceList extends resource_1.ListResource {
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
        this.itemClass = PluginInstance;
    }
    /**
     * Fetch the plugin associated to this plugin instance list from the REST API.
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
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.PluginInstanceList = PluginInstanceList;
/**
 * Plugin instance list resource object representing a list of all plugin
 * instances.
 */
class AllPluginInstanceList extends resource_1.ListResource {
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
        this.itemClass = PluginInstance;
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
}
exports.AllPluginInstanceList = AllPluginInstanceList;
/**
 * Feed-specific plugin instance list resource object representing a list of plugin
 * instances associated to an specific feed.
 */
class FeedPluginInstanceList extends resource_1.ListResource {
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
        this.itemClass = PluginInstance;
    }
    /**
     * Fetch the feed associated to this feed-specific list of plugin instances from
     * the REST API.
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
exports.FeedPluginInstanceList = FeedPluginInstanceList;
/**
 * Pipeline instance-specific plugin instance list resource object representing
 * a list of plugin instances associated to an specific pipeline instance.
 */
class PipelineInstancePluginInstanceList extends resource_1.ListResource {
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
        this.itemClass = PluginInstance;
    }
}
exports.PipelineInstancePluginInstanceList = PipelineInstancePluginInstanceList;
/**
 * Workflow-specific plugin instance list resource object representing
 * a list of plugin instances associated to a workflow.
 */
class WorkflowPluginInstanceList extends resource_1.ListResource {
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
        this.itemClass = PluginInstance;
    }
}
exports.WorkflowPluginInstanceList = WorkflowPluginInstanceList;
/**
 * Plugin instance descendant list resource object. This is a list of all plugin
 * instances that have this plugin instance as an ancestor in a pipeline tree.
 */
class PluginInstanceDescendantList extends resource_1.ListResource {
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
        this.itemClass = PluginInstance;
    }
}
exports.PluginInstanceDescendantList = PluginInstanceDescendantList;
/**
 * Plugin instance split item resource object representing an output directory
 * split that has been applied to a plugin instance.
 */
class PluginInstanceSplit extends resource_1.ItemResource {
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
     * Fetch the plugin instance associated to this split item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout = 30000) {
        const linkRelation = 'plugin_inst';
        const resourceClass = PluginInstance;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.PluginInstanceSplit = PluginInstanceSplit;
/**
 * Plugin instance split list resource object. This is a list of all output
 * directory splits that have been applied to a plugin instance.
 */
class PluginInstanceSplitList extends resource_1.ListResource {
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
        this.itemClass = PluginInstanceSplit;
    }
    /**
     * Fetch the plugin instance associated to this split list item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout = 30000) {
        const linkRelation = 'plugin_inst';
        const resourceClass = PluginInstance;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
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
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.PluginInstanceSplitList = PluginInstanceSplitList;
/**
 * Plugin instance parameter item resource object representing a parameter that
 * the plugin instance was run with.
 */
class PluginInstanceParameter extends resource_1.ItemResource {
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
     * Fetch the plugin instance associated to this parameter item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(timeout = 30000) {
        const linkRelation = 'plugin_inst';
        const resourceClass = PluginInstance;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Fetch the plugin parameter definition associated to this plugin instance item
     * from the REST API.
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
exports.PluginInstanceParameter = PluginInstanceParameter;
/**
 * Plugin instance parameter list resource object representing a list of parameters that
 * the plugin instance was run with.
 */
class PluginInstanceParameterList extends resource_1.ListResource {
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
        this.itemClass = PluginInstanceParameter;
    }
}
exports.PluginInstanceParameterList = PluginInstanceParameterList;
