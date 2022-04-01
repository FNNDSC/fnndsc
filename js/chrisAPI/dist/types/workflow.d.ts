/**
 * Workflow item resource object representing a pipeline workflow.
 */
export class Workflow extends ItemResource {
    /**
     * Fetch the pipeline associated to this workflow from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
     */
    getPipeline(timeout?: number): Promise<Pipeline>;
    /**
     * Make a DELETE request to delete this workflow resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * Workflow list resource object representing a list of pipeline-specific
 * workflows.
 */
export class WorkflowList extends ListResource {
    /**
     * Fetch the pipeline associated to this workflow list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
     */
    getPipeline(timeout?: number): Promise<Pipeline>;
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
    post(data: {
        previous_plugin_inst_id: number;
        nodes_info: string;
    }, timeout?: number): Promise<WorkflowList>;
}
/**
 * Workflow list resource object representing a list of all workflows.
 */
export class AllWorkflowList extends ListResource {
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
    getPipelines(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PipelineList>;
}
import { ItemResource } from "./resource";
import { Pipeline } from "./pipeline";
import { ListResource } from "./resource";
import { PipelineList } from "./pipeline";
