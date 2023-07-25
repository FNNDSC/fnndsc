/**
 * Pipeline instance item resource object representing a pipeline instance.
 */
export class PipelineInstance extends ItemResource {
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
     * Fetch the pipeline associated to this pipeline instance from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
     */
    getPipeline(timeout?: number | undefined): Promise<Pipeline>;
    /**
     * Fetch a list of plugin instances associated to this pipeline instance from
     * the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineInstancePluginInstanceList>} - JS Promise, resolves to a ``PipelineInstancePluginInstanceList`` object
     */
    getPluginInstances(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PipelineInstancePluginInstanceList>;
    /**
     * Make a PUT request to modify this pipeline instance resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.title] - title of the pipeline instance
     * @param {string} [data.description] - pipeline instance description
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data: {
        title?: string | undefined;
        description?: string | undefined;
    }, timeout?: number | undefined): Promise<PipelineInstance>;
    /**
     * Make a DELETE request to delete this pipeline instance resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number | undefined): Promise<any>;
}
/**
 * Pipeline instance list resource object representing a list of pipeline-specific
 * instances.
 */
export class PipelineInstanceList extends ListResource {
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
     * Make a POST request to this pipeline instance list resource to create a new
     * pipeline instance item resource through the REST API.
     *
     * @param {Object} data - request JSON data object which is pipeline-specific and it's
     * properties can be determined by calling the ``getPOSTParameters`` method on this
     * resource object
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: Object, timeout?: number | undefined): Promise<PipelineInstanceList>;
}
/**
 * Pipeline instance list resource object representing a list of all pipeline
 * instances.
 */
export class AllPipelineInstanceList extends ListResource {
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
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PipelineList>;
}
import { ItemResource } from "./resource";
import { Pipeline } from "./pipeline";
import { PipelineInstancePluginInstanceList } from "./plugininstance";
import { ListResource } from "./resource";
import { PipelineList } from "./pipeline";
