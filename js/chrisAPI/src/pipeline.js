/** * Imports ***/
import Request from './request';
import RequestException from './exception';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';
import { PluginList, Plugin } from './plugin';
import { PluginParameter } from './pluginparameter';
import { WorkflowList } from './workflow';
import { FileBrowserFolder } from './filebrowser';

/**
 * Pipeline item resource object representing a pipeline.
 */
export class Pipeline extends ItemResource {
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
   * Fetch a list of workflows associated to this pipeline from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<WorkflowList>} - JS Promise, resolves to a ``WorkflowList`` object
   */
   getWorkflows(params = null, timeout = 30000) {
    const linkRelation = 'workflows';
    const resourceClass = WorkflowList;

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

/**
 * Pipeline list resource object representing a list of pipelines.
 */
export class PipelineList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
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
    const resourceClass = PluginList;

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

/**
 * Plugin piping item resource object representing a plugin piping within
 * a pipeline.
 */
export class PluginPiping extends ItemResource {
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
    } catch (e) {
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
    const resourceClass = Plugin;

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

/**
 * Item resource object for a plugin piping default parameter which represents a default
 * value for a plugin parameter associated with the corresponding plugin piping.
 */
export class PipingDefaultParameter extends ItemResource {
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
    const resourceClass = PluginParameter;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
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
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = Plugin;
  }
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
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PluginPiping;
  }
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
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PipingDefaultParameter;
  }
}

/**
 * Pipeline source file item resource object representing a pipeline source file.
 */
export class PipelineSourceFile extends ItemResource {
  /**
   * Fetch the file blob associated to this file item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
   */
  getFileBlob(timeout = 30000) {
    if (this.isEmpty) {
      throw new RequestException('Item object has not been set!');
    }
    const req = new Request(this.auth, 'application/octet-stream', timeout);
    const item = this.collection.items[0];
    const blobUrl = Collection.getLinkRelationUrls(item, 'file_resource')[0];

    return req.get(blobUrl).then(resp => resp.data);
  }
  
  /**
   * Fetch the parent folder of this file from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
   getParentFolder(timeout = 30000) {
    const linkRelation = 'parent_folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }  
}

/**
 * Pipeline source file list resource object representing a list of pipeline source files.
 */
export class PipelineSourceFileList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PipelineSourceFile;
  }

  /**
   * Make a POST request to this pipeline source file list resource to create a new 
   * pipeline source file item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.type - pipeline source file type
   * @param {Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.fname - file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, uploadFileObj, timeout = 30000) {
    return this._post(data, uploadFileObj, timeout);
  }
}
