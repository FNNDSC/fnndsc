/** * Imports ***/
import ChrisInstance from './chrisinstance';
import Collection from './cj';
import Request from './request';
import { FeedList, PublicFeedList, Feed } from './feed';
import { PluginAdminList, PluginAdmin } from './admin';
import { ComputeResourceList, ComputeResource } from './computeresource';
import { PluginMetaList, PluginMeta } from './pluginmeta';
import { PluginList, Plugin } from './plugin';
import {
  AllPluginInstanceList,
  PluginInstanceList,
  PluginInstance,
  PluginInstanceSplitList,
  PluginInstanceSplit,
} from './plugininstance';
import { AllWorkflowList, WorkflowList, Workflow } from './workflow';
import { PipelineList, Pipeline, PipelineSourceFileList, PipelineSourceFile } from './pipeline';
import { TagList, Tag, Tagging } from './tag';
import { UserFileList, UserFile } from './userfile';
import { 
  PACSFileList, 
  PACSList, 
  PACSQueryList,
  AllPACSQueryList, 
  PACSRetrieveList, 
  PACSSeriesList, 
  PACSFile, 
  PACS, 
  PACSQuery, 
  PACSRetrieve, 
  PACSSeries } from './pacsfile';
import { FileBrowserFolderList, FileBrowserFolder } from './filebrowser';
import { DownloadTokenList, DownloadToken } from './downloadtoken';
import { GroupList, Group } from './group';
import User from './user';

/**
 * API client object.
 */
export default class Client {
  /**
   * Constructor
   *
   * @param {string} url - url of the ChRIS service
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    /** @type {string} */
    this.url = url;

    /** @type {Object} */
    this.auth = auth;

    /* Urls of the high level API resources */
    this.feedsUrl = this.url;
    this.publicFeedsUrl = '';
    this.chrisInstanceUrl = '';
    this.computeResourcesUrl = '';
    this.pluginMetasUrl = '';
    this.pluginsUrl = '';
    this.pluginInstancesUrl = '';
    this.pipelinesUrl = '';
    this.workflowsUrl = '';
    this.tagsUrl = '';
    this.pipelineSourceFilesUrl = '';
    this.userFilesUrl = '';
    this.pacsFilesUrl = '';
    this.pacsUrl = '';
    this.pacsQueriesUrl = '';
    this.pacsSeriesUrl = '';
    this.fileBrowserUrl = '';
    this.downloadTokensUrl = '';
    this.groupsUrl = '';
    this.userUrl = '';
    this.adminUrl = '';
  }

  /**
   * Set the urls of the high level API resources.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise} - JS Promise
   */
  setUrls(timeout = 30000) {
    return this.getFeeds(null, timeout);
  }

  /**
   * Get the ChRIS instance resource object.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<ChrisInstance>} - JS Promise, resolves to a ``ChrisInstance`` object
   */
  getChrisInstance(timeout = 30000) {
    return this._fetchRes('chrisInstanceUrl', ChrisInstance, null, timeout);
  }

  /**
   * Get a paginated list of currently authenticated user's feeds
   * from the REST API given query search parameters. If no search parameters
   * then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match feed id exactly with this number
   * @param {number} [searchParams.min_id] - match feed id gte this number
   * @param {number} [searchParams.max_id] - match feed id lte this number
   * @param {string} [searchParams.name] - match feed name containing this string
   * @param {string} [searchParams.name_exact] - match feed name exactly with this string
   * @param {string} [searchParams.name_startswith] - match feed name starting with this string
   * @param {string} [searchParams.files_fname_icontains] - match the feeds that have files containing
   * all the substrings from the queried string (which in turn represents a white-space-separated list
   * of query strings) case insensitive anywhere in their fname.
   * @param {number} [searchParams.min_creation_date] - match feed creation date gte this date
   * @param {number} [searchParams.max_creation_date] - match feed creation date lte this date
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FeedList>} - JS Promise, resolves to a ``FeedList`` object
   */
  getFeeds(searchParams = null, timeout = 30000) {
    const feedList = new FeedList(this.feedsUrl, this.auth);

    return feedList.get(searchParams, timeout).then((feedList) => {
      const coll = feedList.collection;
      const getUrl = Collection.getLinkRelationUrls;

      this.chrisInstanceUrl = this.chrisInstanceUrl || getUrl(coll, 'chrisinstance')[0];
      this.publicFeedsUrl = this.publicFeedsUrl || getUrl(coll, 'public_feeds')[0];
      this.computeResourcesUrl = this.computeResourcesUrl || getUrl(coll, 'compute_resources')[0];
      this.pluginMetasUrl = this.pluginMetasUrl || getUrl(coll, 'plugin_metas')[0];
      this.pluginsUrl = this.pluginsUrl || getUrl(coll, 'plugins')[0];
      this.pluginInstancesUrl = this.pluginInstancesUrl || getUrl(coll, 'plugin_instances')[0];
      this.pipelinesUrl = this.pipelinesUrl || getUrl(coll, 'pipelines')[0];
      this.workflowsUrl = this.workflowsUrl || getUrl(coll, 'workflows')[0];
      this.tagsUrl = this.tagsUrl || getUrl(coll, 'tags')[0];
      this.pipelineSourceFilesUrl = this.pipelineSourceFilesUrl || getUrl(coll, 'pipelinesourcefiles')[0];
      this.userFilesUrl = this.userFilesUrl || getUrl(coll, 'userfiles')[0];
      this.pacsFilesUrl = this.pacsFilesUrl || getUrl(coll, 'pacsfiles')[0];
      this.pacsUrl = this.pacsUrl || getUrl(coll, 'pacs')[0];
      this.pacsQueriesUrl = this.pacsQueriesUrl || getUrl(coll, 'pacsqueries')[0];
      this.pacsSeriesUrl = this.pacsSeriesUrl || getUrl(coll, 'pacsseries')[0];
      this.fileBrowserUrl = this.fileBrowserUrl || getUrl(coll, 'filebrowser')[0];

      if (!this.downloadTokensUrl) {
        this.downloadTokensUrl = getUrl(coll, 'download_tokens');
        this.downloadTokensUrl = this.downloadTokensUrl.length ? this.downloadTokensUrl[0] : '';
      }
      if (!this.groupsUrl) {
        this.groupsUrl = getUrl(coll, 'groups');
        this.groupsUrl = this.groupsUrl.length ? this.groupsUrl[0] : '';
      }
      if (!this.userUrl) {
        this.userUrl = getUrl(coll, 'user');
        this.userUrl = this.userUrl.length ? this.userUrl[0] : '';
      }
      if (!this.adminUrl) {
        this.adminUrl = getUrl(coll, 'admin');
        this.adminUrl = this.adminUrl.length ? this.adminUrl[0] : '';
      }

      return feedList;
    });
  }

  /**
   * Get a paginated list of public feeds from the REST API given query search parameters. 
   * If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match feed id exactly with this number
   * @param {number} [searchParams.min_id] - match feed id gte this number
   * @param {number} [searchParams.max_id] - match feed id lte this number
   * @param {string} [searchParams.name] - match feed name containing this string
   * @param {string} [searchParams.name_exact] - match feed name exactly with this string
   * @param {string} [searchParams.name_startswith] - match feed name starting with this string
   * @param {string} [searchParams.files_fname_icontains] - match the feeds that have files containing
   * all the substrings from the queried string (which in turn represents a white-space-separated list
   * of query strings) case insensitive anywhere in their fname.
   * @param {number} [searchParams.min_creation_date] - match feed creation date gte this date
   * @param {number} [searchParams.max_creation_date] - match feed creation date lte this date
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PublicFeedList>} - JS Promise, resolves to a ``PublicFeedList`` object
   */
  getPublicFeeds(searchParams = null, timeout = 30000) {
    return this._fetchRes('publicFeedsUrl', PublicFeedList, searchParams, timeout);
  }

  /**
   * Get a feed resource object given its id.
   *
   * @param {number} id - feed id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Feed|null>} - JS Promise, resolves to a ``Feed`` object or ``null``
   */
  getFeed(id, timeout = 30000) {
    return this.getFeeds({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Get a paginated list of compute resources from the REST API given query
   * search parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.name] - match compute resource's name containing this string
   * @param {string} [searchParams.name_exact] - match compute resource's name exactly with this string
   * @param {string} [searchParams.description] - match compute resource's description containing this string
   * @param {string} [searchParams.plugin_id] - match plugin id exactly with this string for all the
   * compute resources associated with the plugin
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<ComputeResourceList>} - JS Promise, resolves to a ``ComputeResourceList`` object
   */
  getComputeResources(searchParams = null, timeout = 30000) {
    return this._fetchRes('computeResourcesUrl', ComputeResourceList, searchParams, timeout);
  }

  /**
   * Get a compute resource object given its id.
   *
   * @param {number} id - compute resource id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<ComputeResource|null>} - JS Promise, resolves to a ``ComputeResource`` object or ``null``
   */
  getComputeResource(id, timeout = 30000) {
    return this.getComputeResources({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Get a paginated list of plugin metas from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin meta id exactly with this number
   * @param {string} [searchParams.name] - match plugin meta name containing this string
   * @param {string} [searchParams.name_exact] - match plugin meta name exactly with this string
   * @param {string} [searchParams.title] - match plugin meta title containing this string
   * @param {string} [searchParams.category] - match plugin meta category exactly with this string
   * @param {string} [searchParams.type] - match plugin meta type exactly with this string
   * @param {string} [searchParams.authors] - match plugin meta authors containing this string
   * @param {number} [searchParams.min_creation_date] - match plugin meta creation date gte this date
   * @param {number} [searchParams.max_creation_date] - match plugin meta creation date lte this date
   * @param {string} [searchParams.name_title_category] - match plugin meta name, title or
   * category containing this string
   * @param {string} [searchParams.name_authors_category] - match plugin meta name, authors or
   * category containing this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginMetaList>} - JS Promise, resolves to a ``PluginMetaList`` object
   */
  getPluginMetas(searchParams = null, timeout = 30000) {
    return this._fetchRes('pluginMetasUrl', PluginMetaList, searchParams, timeout);
  }

  /**
   * Get a plugin meta resource object given its id.
   *
   * @param {number} id - plugin meta id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginMeta|null>} - JS Promise, resolves to a ``PluginMeta`` object or ``null``
   */
  getPluginMeta(id, timeout = 30000) {
    return this.getPluginMetas({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Get a paginated list of plugins from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin id exactly with this number
   * @param {string} [searchParams.name] - match plugin name containing this string
   * @param {string} [searchParams.name_exact] - match plugin name exactly with this string
   * @param {string} [searchParams.version] - match plugin version exactly with this string
   * @param {string} [searchParams.dock_image] - match plugin docker image exactly with this string
   * @param {string} [searchParams.type] - match plugin type exactly with this string
   * @param {string} [searchParams.category] - match plugin category containing this string
   * @param {string} [searchParams.title] - match plugin title containing this string
   * @param {string} [searchParams.description] - match plugin description containing this string
   * @param {string} [searchParams.min_creation_date] - match plugin creation date gte this date
   * @param {string} [searchParams.max_creation_date] - match plugin creation date lte this date
   * @param {string} [searchParams.name_title_category] - match plugin name, title or
   * category containing this string
   * @param {number} [searchParams.compute_resource_id] - match plugin's compute resource id exactly
   * with this number
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginList>} - JS Promise, resolves to a ``PluginList`` object
   */
  getPlugins(searchParams = null, timeout = 30000) {
    return this._fetchRes('pluginsUrl', PluginList, searchParams, timeout);
  }

  /**
   * Get a plugin resource object given its id.
   *
   * @param {number} id - plugin id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Plugin|null>} - JS Promise, resolves to a ``Plugin`` object or ``null``
   */
  getPlugin(id, timeout = 30000) {
    return this.getPlugins({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Upload a plugin representation file and create a new plugin admin resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.compute_names - string representing a comma-separated
   * list of names of already registered compute resources
   * @param {Object} pluginFileObj - custom file object
   * @param {Object} pluginFileObj.fname - plugin's file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginAdmin>} - JS Promise, resolves to a ``PluginAdmin`` object
   */
  adminUploadPlugin(data, pluginFileObj, timeout = 30000) {
    const createRes = () => {
      const res = new PluginAdminList(this.adminUrl, this.auth);
      return res.post(data, pluginFileObj, timeout).then(res => res.getItems()[0]);
    };
    return this.adminUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a paginated list of plugin instances from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin instance id exactly with this number
   * @param {number} [searchParams.root_id] - match root plugin instance's id exactly with this number
   * @param {number} [searchParams.previous_id] - match previous plugin instance's id exactly with this number
   * @param {string} [searchParams.title] - match plugin instance title containing this string
   * @param {string} [searchParams.status] - match plugin instance execution status exactly with this string
   * @param {string} [searchParams.owner_username] - match plugin instances's owner username exactly with this string
   * @param {number} [searchParams.feed_id] - match associated feed's id exactly with this number
   * @param {number} [searchParams.workflow_id] - match associated workflows's id exactly with this number
   * @param {number} [searchParams.plugin_id] - match associated plugin's id exactly with this number
   * @param {number} [searchParams.plugin_name] - match associated plugin's name containing this string
   * @param {number} [searchParams.plugin_name_exact] - match associated plugin's name exact with this string
   * @param {number} [searchParams.plugin_version] - match associated plugin's verion exactly with this string
   * @param {string} [searchParams.min_start_date] - match plugin instance's start date gte this date
   * @param {string} [searchParams.max_start_date] - match plugin instance's start date lte this date
   * @param {string} [searchParams.min_end_date] - match plugin instance's end date gte this date
   * @param {string} [searchParams.max_end_date] - match plugin instance's end date lte this date
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<AllPluginInstanceList>} - JS Promise, resolves to ``AllPluginInstanceList`` object
   */
  getPluginInstances(searchParams = null, timeout = 30000) {
    return this._fetchRes('pluginInstancesUrl', AllPluginInstanceList, searchParams, timeout);
  }

  /**
   * Get a plugin instance resource object given its id.
   *
   * @param {number} id - plugin instance id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginInstance|null>} - JS Promise, resolves to a ``PluginInstance`` object or ``null``
   */
  getPluginInstance(id, timeout = 30000) {
    return this.getPluginInstances({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Create a new plugin instance resource through the REST API.
   *
   * @param {number} pluginId - plugin id
   * @param {Object} data - request data object which is plugin-specific
   * @param {number} data.previous_id=null - id of the previous plugin instance
   * @param {string} [data.title] - title
   * @param {string} [data.compute_resource_name] - remote compute resource name
   * @param {string} [data.cpu_limit] - cpu limit
   * @param {string} [data.memory_limit] - memory limit
   * @param {string} [data.number_of_workers] - number of workers
   * @param {string} [data.gpu_limit] - gpu limit
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
   */
  createPluginInstance(pluginId, data, timeout = 30000) {
    return this.getPlugin(pluginId, timeout)
      .then((plg) => {
        const instancesUrl = Collection.getLinkRelationUrls(plg.collection.items[0], 'instances');
        const plgInstList = new PluginInstanceList(instancesUrl[0], this.auth);
        return plgInstList.post(data, timeout);
      })
      .then(plgInstList => plgInstList.getItems()[0]);
  }

  /**
   * Create a new plugin instance split resource through the REST API.
   *
   * @param {number} pluginInstanceId - plugin instance id
   * @param {string} [filter=''] - comma-separated list of regular expressions
   * @param {string} [cr_name=''] - remote compute resource name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginInstanceSplit>} - JS Promise, resolves to a ``PluginInstanceSplit`` object
   */
  createPluginInstanceSplit(pluginInstanceId, filter = '', cr_name = '', timeout = 30000) {
    return this.getPluginInstance(pluginInstanceId, timeout)
      .then((plgInst) => {
        const splitsUrl = Collection.getLinkRelationUrls(plgInst.collection.items[0], 'splits');
        const plgInstSplitList = new PluginInstanceSplitList(splitsUrl[0], this.auth);
        let data = { filter: filter };
        if (cr_name) {
          data = { filter: filter, compute_resource_name: cr_name };
        }
        return plgInstSplitList.post(data, timeout);
      })
      .then(plgInstSplitList => plgInstSplitList.getItems()[0]);
  }

  /**
   * Get a paginated list of pipelines from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin id exactly with this number
   * @param {string} [searchParams.name] - match plugin name containing this string
   * @param {string} [searchParams.owner_username] - match pipeline's owner username exactly with this string
   * @param {string} [searchParams.category] - match plugin category containing this string
   * @param {string} [searchParams.description] - match plugin description containing this string
   * @param {string} [searchParams.authors] - match plugin authors containing this string
   * @param {string} [searchParams.min_creation_date] - match plugin creation date gte this date
   * @param {string} [searchParams.max_creation_date] - match plugin creation date lte this date
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PipelineList>} - JS Promise, resolves to a ``PipelineList`` object
   */
  getPipelines(searchParams = null, timeout = 30000) {
    return this._fetchRes('pipelinesUrl', PipelineList, searchParams, timeout);
  }

  /**
   * Get a pipeline resource object given its id.
   *
   * @param {number} id - pipeline id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Pipeline|null>} - JS Promise, resolves to a ``Pipeline`` object or ``null``
   */
  getPipeline(id, timeout = 30000) {
    return this.getPipelines({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Create a new pipeline resource through the REST API.
   *
   * @param {Object} data - request data object
   * @param {string} data.name - pipeline name
   * @param {string} [data.authors] - pipeline authors
   * @param {string} [data.category] - pipeline category
   * @param {string} [data.description] - pipeline description
   * @param {boolean} [data.locked=true] - pipeline status
   * @param {string} [data.plugin_tree] - JSON string containing a plugin tree list
   * @param {number} [data.plugin_inst_id] - plugin instance id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
   */
  createPipeline(data, timeout = 30000) {
    const createRes = () => {
      const res = new PipelineList(this.pipelinesUrl, this.auth);
      return res.post(data, timeout).then(res => res.getItems()[0]);
    };
    return this.pipelinesUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a paginated list of workflows from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match workflow id exactly with this number
   * @param {string} [searchParams.title] - match workflow title containing this string
   * @param {string} [searchParams.owner_username] - match workflow's owner username exactly with this string
   * @param {string} [searchParams.pipeline_name] - match associated pipeline name containing this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<AllWorkflowList>} - JS Promise, resolves to ``AllWorkflowList`` object
   */
  getWorkflows(searchParams = null, timeout = 30000) {
    return this._fetchRes('workflowsUrl', AllWorkflowList, searchParams, timeout);
  }

  /**
   * Get a workflow resource object given its id.
   *
   * @param {number} id - workflow id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Workflow>|null} - JS Promise, resolves to a ``Workflow`` object or ``null``
   */
  getWorkflow(id, timeout = 30000) {
    return this.getWorkflows({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Helper method to create the ``nodes_info`` field required by ``createWorkflow`` method's
   * ``data`` argument to create a workflow from a pipeline's default parameters data array
   * tipically returned by ``Pipeline.getDefaultParameters().data``.
   *
   * @param {Object[]} pipelineDefaultParameters - array of objects with the default parameters
   * as returned by ``Pipeline.getDefaultParameters().data``
   * @param {boolean} [includeAllDefaults=false] - if set to `true`` then non-null parameters are also included
   * in the result
   *
   * @return {Object[]} - array of workflow node objects
   */
   computeWorkflowNodesInfo(pipelineDefaultParameters, includeAllDefaults=false) {
     const pipings = {};

     for (let defaultParam of pipelineDefaultParameters) {
       let pipingId = defaultParam.plugin_piping_id;

       if ( !(pipingId in pipings) ) {
         pipings[pipingId] = {
           piping_id: pipingId,
           previous_piping_id: defaultParam.previous_plugin_piping_id,
           compute_resource_name: 'host',
           title: defaultParam.plugin_piping_title,
           plugin_parameter_defaults: []
         };
       }

       if ( includeAllDefaults || defaultParam.value === null ) {
         pipings[pipingId].plugin_parameter_defaults.push({
           name: defaultParam.param_name,
           default: defaultParam.value
         });
       }
     }

    const nodesInfo = [];
    for (let pipingId in pipings) {
      if ( pipings[pipingId].plugin_parameter_defaults.length === 0 ) {
        delete pipings[pipingId].plugin_parameter_defaults;
      }
      nodesInfo.push(pipings[pipingId]);
    }
    return nodesInfo;
  }

  /**
   * Create a new workflow resource through the REST API.
   *
   * @param {number} pipelineId - pipeline id
   * @param {Object} data - request data object
   * @param {number} data.previous_plugin_inst_id - previous plugin instance id
   * @param {string} data.nodes_info - pipeline-specific JSON string encoding a list of objects.
   * Each object is a workflow node containing a ``piping_id``, ``compute_resource_name``,
   * ``title`` and a list of objects called ``plugin_parameter_defaults``. Each object in
   * this list has ``name`` and ``default`` properties.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Workflow>} - JS Promise, resolves to a ``Workflow`` object
   */
  createWorkflow(pipelineId, data, timeout = 30000) {
    return this.getPipeline(pipelineId, timeout)
      .then(pipeline => {
        const workflowsUrl = Collection.getLinkRelationUrls(
          pipeline.collection.items[0],
          'workflows'
        );
        const workflowList = new WorkflowList(workflowsUrl[0], this.auth);
        return workflowList.post(data, timeout);
      })
      .then(workflowList => workflowList.getItems()[0]);
  }

  /**
   * Get a paginated list of tags from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match tag id exactly with this number
   * @param {string} [searchParams.name] - match tag name containing this string
   * @param {string} [searchParams.owner_username] - match tag's owner username exactly with this string
   * @param {string} [searchParams.color] - match plugin color containing this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<TagList>} - JS Promise, resolves to a ``TagList`` object
   */
  getTags(searchParams = null, timeout = 30000) {
    return this._fetchRes('tagsUrl', TagList, searchParams, timeout);
  }

  /**
   * Get a tag resource object given its id.
   *
   * @param {number} id - tag id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Tag|null>} - JS Promise, resolves to a ``Tag`` object or ``null``
   */
  getTag(id, timeout = 30000) {
    return this.getTags({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Create a new tag resource through the REST API.
   *
   * @param {Object} data - request data object
   * @param {string} data.color - tag color
   * @param {string} [data.name=''] - tag name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
   */
  createTag(data, timeout = 30000) {
    const createRes = () => {
      const res = new TagList(this.tagsUrl, this.auth);
      return res.post(data, timeout).then(res => res.getItems()[0]);
    };
    return this.tagsUrl ? createRes() : this.setUrls().then(() => createRes());
  }

    /**
   * Get a paginated list of pipeline source files from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.fname] - match file's path starting with this string
   * @param {string} [searchParams.fname_exact] - match file's path exactly with this string
   * @param {string} [searchParams.fname_icontains] - match file's path containing this string
   * @param {number} [searchParams.pipeline_id] - match file's pipeline id exactly with this number
   * @param {string} [searchParams.pipeline_name] - match file's pipeline name exactly with this string
   * @param {string} [searchParams.uploader_username] - match file's uploader username exactly with this string
   * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
   * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PipelineSourceFileList>} - JS Promise, resolves to a ``PipelineSourceFileList`` object
   */
    getPipelineSourceFiles(searchParams = null, timeout = 30000) {
      return this._fetchRes('pipelineSourceFilesUrl', PipelineSourceFileList, searchParams, timeout);
    }
  
    /**
     * Get a pipeline source file resource object given its id.
     *
     * @param {number} id - pipeline source file id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineSourceFile|null>} - JS Promise, resolves to a ``PipelineSourceFile`` object or ``null`
     */
    getPipelineSourceFile(id, timeout = 30000) {
      return this.getPipelineSourceFiles({ id: id }, timeout).then(listRes => listRes.getItem(id));
    }
  
    /**
     * Upload a pipeline source file and create a new pipeline source file resource through the REST API.
     * In addition, this creates a new pipeline resource based on the source of the uploaded file.
     *
     * @param {Object} data - request data object
     * @param {string} data.type - pipeline source file type
     * @param {Object} uploadFileObj - custom file object
     * @param {Object} uploadFileObj.fname - file blob
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineSourceFile>} - JS Promise, resolves to a ``PipelineSourceFile`` object
     */
    uploadPipelineSourceFile(data, uploadFileObj, timeout = 30000) {
      const createRes = () => {
        const res = new PipelineSourceFileList(this.pipelineSourceFilesUrl, this.auth);
        return res.post(data, uploadFileObj, timeout).then(res => res.getItems()[0]);
      };
      return this.pipelineSourceFilesUrl ? createRes() : this.setUrls().then(() => createRes());
    }
  
  /**
   * Get a paginated list of user files from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.fname] - match file's path starting with this string
   * @param {string} [searchParams.fname_exact] - match file's path exactly with this string
   * @param {string} [searchParams.fname_icontains] - match file's path containing this string
   * @param {string|number} [searchParams.fname_nslashes] - match file's path containing this number of slashes
   * @param {string} [searchParams.owner_username] - match file's owner username exactly with this string
   * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
   * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<UserFileList>} - JS Promise, resolves to a ``UserFileList`` object
   */
  getUserFiles(searchParams = null, timeout = 30000) {
    return this._fetchRes('userFilesUrl', UserFileList, searchParams, timeout);
  }

  /**
   * Get a user file resource object given its id.
   *
   * @param {number} id - user file id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<UserFile|null>} - JS Promise, resolves to a ``UserFile`` object or ``null``
   */
  getUserFile(id, timeout = 30000) {
    return this.getUserFiles({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Upload a file and create a new user file resource through the REST API.
   *
   * @param {Object} data - request data object
   * @param {string} data.upload_path - absolute path including file name where the file
   * will be uploaded on the storage service
   * @param {Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.fname - file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<UserFile>} - JS Promise, resolves to a ``UserFile`` object
   */
  uploadFile(data, uploadFileObj, timeout = 30000) {
    const createRes = () => {
      const res = new UserFileList(this.userFilesUrl, this.auth);
      return res.post(data, uploadFileObj, timeout).then(res => res.getItems()[0]);
    };
    return this.userFilesUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a paginated list of PACS files from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.fname] - match file's path starting with this string
   * @param {string} [searchParams.fname_exact] - match file's path exactly with this string
   * @param {string} [searchParams.fname_icontains] - match file's path containing this string
   * @param {string} [searchParams.fname_icontains_topdir_unique] - match file's path containing all the substrings
   * from the queried string (which in turn represents a white-space-separated list of query strings) case
   * insensitive anywhere in their fname. But only one file is returned per toplevel directory under
   * SERVICES/PACS/pacs_name. This is useful to efficiently determine the top level directories containing a file
   * that matches the query.
   * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
   * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSFileList>} - JS Promise, resolves to a ``PACSFileList`` object
   */
  getPACSFiles(searchParams = null, timeout = 30000) {
    return this._fetchRes('pacsFilesUrl', PACSFileList, searchParams, timeout);
  }

  /**
   * Get a PACS file resource object given its id.
   *
   * @param {number} id - PACS file id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSFile|null>} - JS Promise, resolves to a ``PACSFile`` object or ``null`
   */
  getPACSFile(id, timeout = 30000) {
    return this.getPACSFiles({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Get a paginated PACS list from the REST API given query search parameters.
   * If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match PACS id exactly with this number
   * @param {string} [searchParams.identifier] - match PACS identifier exactly with this string
   * @param {boolean} [searchParams.active] - match PACS active status with this boolean
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSList>} - JS Promise, resolves to a ``PACSList`` object
   */
  getPACSList(searchParams = null, timeout = 30000) {
    return this._fetchRes('pacsUrl', PACSList, searchParams, timeout);
  }

  /**
   * Get a PACS resource object given its id.
   *
   * @param {number} id - PACS id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACS|null>} - JS Promise, resolves to a ``PACS`` object or ``null``
   */
  getPACS(id, timeout = 30000) {
    return this.getPACSList({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Get a paginated list of PACS queries from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match PACS query id exactly with this number
   * @param {string} [searchParams.min_creation_date] - match PACS query's creation date gte this date
   * @param {string} [searchParams.max_creation_date] - match PACS query's creation date lte this date
   * @param {string} [searchParams.title] - match PACS query title containing this string
   * @param {string} [searchParams.title_exact] - match PACS query title exactly this string
   * @param {string} [searchParams.status] - match PACS query execution status exactly with this string
   * @param {string} [searchParams.description] - match PACS query description containing this string
   * @param {number} [searchParams.pacs_id] - match related PACS's id exactly with this number
   * @param {string} [searchParams.pacs_identifier] - match related PACS's identifier exactly with this string
   * @param {string} [searchParams.owner_username] - match PACS query's owner username exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<AllPACSQueryList>} - JS Promise, resolves to ``AllPACSQueryList`` object
   */
  getPACSQueries(searchParams = null, timeout = 30000) {
    return this._fetchRes('pacsQueriesUrl', AllPACSQueryList, searchParams, timeout);
  }

  /**
   * Get a PACS query resource object given its id.
   *
   * @param {number} id - PACS query id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSQuery|null>} - JS Promise, resolves to a ``PACSQuery`` object or ``null``
   */
  getPACSQuery(id, timeout = 30000) {
    return this.getPACSQueries({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Create a new PACS query resource through the REST API.
   *
   * @param {number} pacsId - PACS id
   * @param {Object} data - request data object
   * @param {string} data.title - PACS query title
   * @param {string} data.query - PACS query JSON string representing a query
   * @param {string} [data.description] - PACS query description
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSQuery>} - JS Promise, resolves to a ``PACSQuery`` object
   */
  createPACSQuery(pacsId, data, timeout = 30000) {
    return this.getPACS(pacsId, timeout)
      .then(pacs => {
        const queriesUrl = Collection.getLinkRelationUrls(pacs.collection.items[0], 'query_list');
        const queryList = new PACSQueryList(queriesUrl[0], this.auth);
        return queryList.post(data, timeout);
      })
      .then(queryList => queryList.getItems()[0]);
  } 

  /**
   * Create a new PACS retrieve resource through the REST API.
   *
   * @param {number} pacsQueryId - PACS query id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSRetrieve>} - JS Promise, resolves to a ``PACSRetrieve`` object
   */
  createPACSRetrieve(pacsQueryId, timeout = 30000) {
    return this.getPACSQuery(pacsQueryId, timeout)
      .then(pacsQuery => {
        const retrievesUrl = Collection.getLinkRelationUrls(pacsQuery.collection.items[0], 'retrieve_list');
        const retrieveList = new PACSRetrieveList(retrievesUrl[0], this.auth);
        return retrieveList.post(timeout);
      })
      .then(retrieveList => retrieveList.getItems()[0]);
  } 
  
  /**
   * Get a paginated list of PACS series from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.PatientID] - match file's PatientID exactly with this string
   * @param {string} [searchParams.PatientName] - match file's PatientName containing this string
   * @param {string} [searchParams.PatientSex] - match file's PatientSex exactly with this string
   * @param {number} [searchParams.PatientAge] - match file's PatientAge exactly with this number
   * @param {number} [searchParams.min_PatientAge] - match file's PatientAge greater than this number
   * @param {number} [searchParams.max_PatientAge] - match file's PatientAge lesser than this number
   * @param {string} [searchParams.PatientBirthDate] - match file's PatientBirthDate exactly with this date string
   * @param {string} [searchParams.StudyDate] - match file's StudyDate exactly with this date string
   * @param {string} [searchParams.AccessionNumber] - match file's AccessionNumber exactly with this string
   * @param {string} [searchParams.ProtocolName] - match file's ProtocolName exactly with this string
   * @param {string} [searchParams.StudyInstanceUID] - match file's StudyInstanceUID exactly with this string
   * @param {string} [searchParams.StudyDescription] - match file's StudyDescription containing this string
   * @param {string} [searchParams.SeriesInstanceUID] - match file's SeriesInstanceUID exactly with this string
   * @param {string} [searchParams.SeriesDescription] - match file's SeriesDescription containing this string
   * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
   * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
   * @param {string} [searchParams.pacs_identifier] - match file's PACS exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSSeriesList>} - JS Promise, resolves to a ``PACSSeriesList`` object
   */
  getPACSSeriesList(searchParams = null, timeout = 30000) {
    return this._fetchRes('pacsSeriesUrl', PACSSeriesList, searchParams, timeout);
  }

  /**
   * Get a PACS series resource object given its id.
   *
   * @param {number} id - PACS series id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSSeries|null>} - JS Promise, resolves to a ``PACSSeries`` object or ``null``
   */
  getPACSSeries(id, timeout = 30000) {
    return this.getPACSSeriesList({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }  

  /**
   * Get a list with the matching file browser folder (the returned list only has at most one element) 
   * from the REST API given query search parameters. If no search parameters then get a list with the 
   * default root folder.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match folder id exactly with this number
   * @param {string} [searchParams.path] - match folder's path exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolderList>} - JS Promise, resolves to a ``FileBrowserFolderList`` object
   */
  getFileBrowserFolders(searchParams = null, timeout = 30000) {
    return this._fetchRes('fileBrowserUrl', FileBrowserFolderList, searchParams, timeout);
  }

  /**
   * Get a file browser folder resource object given its id.
   *
   * @param {number} id - file browser folder id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder|null>} - JS Promise, resolves to a ``FileBrowserFolder`` object or ``null``
   */
  getFileBrowserFolder(id, timeout = 30000) {
    return this.getFileBrowserFolders({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Get a file browser folder resource object given its path.
   *
   * @param {string} [path=''] - file browser folder path
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder|null>} - JS Promise, resolves to a ``FileBrowserFolder`` object or ``null``
   */
   getFileBrowserFolderByPath(path = '', timeout = 30000) {
    return this.getFileBrowserFolders({ path: path }, timeout).then(listRes => {
      const items = listRes.getItems();
      return items.length ? items[0] : null;
    });
  } 

  /**
   * Create a new file browser folder resource through the REST API.
   *
   * @param {Object} data - request data object
   * @param {string} data.path - folder path
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
  createFileBrowserFolder(data, timeout = 30000) {
    const createRes = () => {
      const res = new FileBrowserFolderList(this.fileBrowserUrl, this.auth);
      return res.post(data, timeout).then(res => res.getItems()[0]);
    };
    return this.fileBrowserUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a paginated list of file download tokens for the authenticated user from the REST API 
   * given query search parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file download token id exactly with this number
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<DownloadTokenList>} - JS Promise, resolves to a ``DownloadTokenList`` object
   */
  getDownloadTokens(searchParams = null, timeout = 30000) {
    return this._fetchRes('downloadTokensUrl', DownloadTokenList, searchParams, timeout);
  }

  /**
   * Get a download token resource object given its id.
   *
   * @param {number} id - file download token id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<DownloadToken|null>} - JS Promise, resolves to a ``DownloadToken`` object or ``null``
   */
  getDownloadToken(id, timeout = 30000) {
    return this.getDownloadTokens({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Create a new file download token resource through the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<DownloadToken>} - JS Promise, resolves to a ``DownloadToken`` object
   */
  createDownloadToken(timeout = 30000) {
    const createRes = () => {
      const res = new DownloadTokenList(this.downloadTokensUrl, this.auth);
      return res.post(timeout).then(res => res.getItems()[0]);
    };
    return this.downloadTokensUrl ? createRes() : this.setUrls().then(() => createRes());
  }  

  /**
   * Get a paginated list of groups from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match group id exactly with this number
   * @param {string} [searchParams.name] - match group name exactly with this string
   * @param {string} [searchParams.name_icontains] - match group name containing this string 
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<GroupList>} - JS Promise, resolves to a ``GroupList`` object
   */
   getGroups(searchParams = null, timeout = 30000) {
    return this._fetchRes('groupsUrl', GroupList, searchParams, timeout);
  }

  /**
   * Get a group resource object given its id.
   *
   * @param {number} id - group id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Group|null>} - JS Promise, resolves to a ``Group`` object or ``null``
   */
  getGroup(id, timeout = 30000) {
    return this.getGroups({ id: id }, timeout).then(listRes => listRes.getItem(id));
  }

  /**
   * Create a new group resource through the REST API.
   *
   * @param {Object} data - request data object
   * @param {string} data.name - group name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Group>} - JS Promise, resolves to a ``Group`` object
   */
  adminCreateGroup(data, timeout = 30000) {
    const createRes = () => {
      const res = new GroupList(this.groupsUrl, this.auth);
      return res.post(data, timeout).then(res => res.getItems()[0]);
    };
    return this.groupsUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a user resource object for the currently authenticated user.
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
   */
  getUser(timeout = 30000) {
    return this._fetchRes('userUrl', User, null, timeout);
  }

  /**
   * Create a new user account.
   *
   * @param {string} usersUrl - url of the user accounts service
   * @param {string} username - username
   * @param {string} password - password
   * @param {string} email - user email
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
   */
  static createUser(usersUrl, username, password, email, timeout = 30000) {
    const req = new Request(undefined, 'application/vnd.collection+json', timeout);
    const userData = {
      template: {
        data: [
          { name: 'username', value: username },
          { name: 'password', value: password },
          { name: 'email', value: email },
        ],
      },
    };
    return req.post(usersUrl, userData).then(resp => {
      const coll = resp.data.collection;
      const userUrl = coll.items[0].href;
      const auth = { username: username, password: password };
      const user = new User(userUrl, auth);
      user.collection = coll;
      return user;
    });
  }

  /**
   * Fetch a user's login authorization token from the REST API.
   * @param {string} authUrl - url of the authorization service
   * @param {string} username - username
   * @param {string} password - password
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<string>} - JS Promise, resolves to a ``string`` value
   */
  static getAuthToken(authUrl, username, password, timeout = 30000) {
    const req = new Request(undefined, 'application/json', timeout);
    const authData = {
      username: username,
      password: password,
    };
    return req.post(authUrl, authData).then(resp => resp.data.token);
  }

  /**
   * Helper method to run an asynchronous task defined by a task generator function.
   *
   * @param {function*()} taskGenerator - generator function
   */
  static runAsyncTask(taskGenerator) {
    Request.runAsyncTask(taskGenerator);
  }

  /**
   * Internal method to fetch a high level resource through the REST API.
   *
   * @param {string} resUrlProp -  property of the `this` object containing the url of the resource
   * @param {string} ResClass - resource class
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise} - JS Promise
   */
  _fetchRes(resUrlProp, ResClass, searchParams = null, timeout = 30000) {
    const getRes = () => {
      const res = new ResClass(this[resUrlProp], this.auth);

      return 'searchParams' in res ? res.get(searchParams, timeout) : res.get(timeout);
    };
    return this[resUrlProp] ? getRes() : this.setUrls().then(() => getRes());
  }
}
