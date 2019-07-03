/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { PipelineList, Pipeline } from './pipeline';

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
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the pipeline associated to this pipeline instance from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``Pipeline`` object
   */
  getPipeline(timeout = 30000) {
    const linkRelation = 'pipeline';
    const resourceClass = Pipeline;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
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
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PipelineInstance;
  }

  /**
   * Make a POST request to this pipeline instance list resource to create a new
   * pipeline instance item resource through the REST API.
   *
   * @param {Object} data - request JSON data object which is pipeline-specific and it's
   * properties can be determined by calling the ``getPOSTParameters`` method on this
   * resource object
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
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
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PipelineInstance;
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
   * @return {Object} - JS Promise, resolves to a ``PipelineList`` object
   */
  getPipelines(searchParams = null, timeout = 30000) {
    const linkRelation = 'pipelines';
    const resourceClass = PipelineList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }
}
