/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { Pipeline } from './pipeline';

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
   * @return {Object} - JS Promise, resolves to a ``Pipeline`` object
   */
  getPipeline(timeout = 30000) {
    const linkRelation = 'pipeline';
    const resourceClass = Pipeline;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Pipeline instance list resource object representing a list of pipeline instances.
 */
export class PluginInstanceList extends ListResource {
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
   * properties can be determined by calling the ``getPOSTDataParameters`` method on this
   * resource object
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}
