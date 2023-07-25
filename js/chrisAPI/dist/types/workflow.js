"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllWorkflowList = exports.WorkflowList = exports.Workflow = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const pipeline_1 = require("./pipeline");
const plugininstance_1 = require("./plugininstance");
/**
 * Workflow item resource object representing a pipeline workflow.
 */
class Workflow extends resource_1.ItemResource {
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
     * Fetch the pipeline associated to this workflow from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
     */
    getPipeline(timeout = 30000) {
        const linkRelation = 'pipeline';
        const resourceClass = pipeline_1.Pipeline;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Fetch a list of plugin instances created by this workflow from the REST API.
     *
     * @param {Object} [params=null] - page parameters
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<WorkflowPluginInstanceList>} - JS Promise, resolves to a ``WorkflowPluginInstanceList`` object
     */
    getPluginInstances(params = null, timeout = 30000) {
        const linkRelation = 'plugin_instances';
        const resourceClass = plugininstance_1.WorkflowPluginInstanceList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
    /**
     * Make a PUT request to modify this workflow resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.title] - workflow title
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data, timeout = 30000) {
        return this._put(data, null, timeout);
    }
    /**
     * Make a DELETE request to delete this workflow resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.Workflow = Workflow;
/**
 * Workflow list resource object representing a list of pipeline-specific
 * workflows.
 */
class WorkflowList extends resource_1.ListResource {
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
        this.itemClass = Workflow;
    }
    /**
     * Fetch the pipeline associated to this workflow list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
     */
    getPipeline(timeout = 30000) {
        const linkRelation = 'pipeline';
        const resourceClass = pipeline_1.Pipeline;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Make a POST request to this workflow list resource to create a new
     * workflow item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {number} data.previous_plugin_inst_id - previous plugin instance id
     * @param {string} data.nodes_info - pipeline-specific JSON string encoding a list of dictionaries.
     * Each dictionary is a workflow node containing a ``plugin piping_id``, ``compute_resource_name``,
     * ``title`` and a list of dictionaries called ``plugin_parameter_defaults``. Each dictionary in
     * this list has ``name`` and ``default`` keys.
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.WorkflowList = WorkflowList;
/**
 * Workflow list resource object representing a list of all workflows.
 */
class AllWorkflowList extends resource_1.ListResource {
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
        this.itemClass = Workflow;
    }
    /**
     * Fetch a list of pipelines from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``PipelineList.getSearchParameters`` method can be
     * used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineList>} - JS Promise, resolves to a ``PipelineList`` object
     */
    getPipelines(searchParams = null, timeout = 30000) {
        const linkRelation = 'pipelines';
        const resourceClass = pipeline_1.PipelineList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
}
exports.AllWorkflowList = AllWorkflowList;
