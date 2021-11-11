/** * Imports ***/
import ChrisInstance from './chrisinstance';
import Collection from './cj';
import Request from './request';
import RequestException from './exception';
import { FeedList, Feed } from './feed';
import { AllFeedFileList, FeedFile } from './feedfile';
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
import {
  AllPipelineInstanceList,
  PipelineInstanceList,
  PipelineInstance
} from './pipelineinstance';
import { PipelineList, Pipeline } from './pipeline';
import { TagList, Tag, Tagging } from './tag';
import { UploadedFileList, UploadedFile } from './uploadedfile';
import { PACSFileList, PACSFile } from './pacsfile';
import { ServiceFileList, ServiceFile } from './servicefile';
import { FileBrowserPathList, FileBrowserPath } from './filebrowser';
import User from './user';

/**
 * API client object.
 */
export default class Client {
  /**
   * Constructor
   *
   * @param {string} url - url of the ChRIS service
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    /** @type {string} */
    this.url = url;

    if (!auth) {
      throw new RequestException('Authentication object is required');
    }
    /** @type {Object} */
    this.auth = auth;

    /* Urls of the high level API resources */
    this.feedsUrl = this.url;
    this.chrisInstanceUrl = '';
    this.filesUrl = '';
    this.computeResourcesUrl = '';
    this.pluginMetasUrl = '';
    this.pluginsUrl = '';
    this.pluginInstancesUrl = '';
    this.pipelinesUrl = '';
    this.pipelineInstancesUrl = '';
    this.tagsUrl = '';
    this.uploadedFilesUrl = '';
    this.pacsFilesUrl = '';
    this.serviceFilesUrl = '';
    this.fileBrowserUrl = '';
    this.userUrl = '';
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
      this.filesUrl = this.filesUrl || getUrl(coll, 'files')[0];
      this.computeResourcesUrl = this.computeResourcesUrl || getUrl(coll, 'compute_resources')[0];
      this.pluginMetasUrl = this.pluginMetasUrl || getUrl(coll, 'plugin_metas')[0];
      this.pluginsUrl = this.pluginsUrl || getUrl(coll, 'plugins')[0];
      this.pluginInstancesUrl = this.pluginInstancesUrl || getUrl(coll, 'plugin_instances')[0];
      this.pipelinesUrl = this.pipelinesUrl || getUrl(coll, 'pipelines')[0];
      this.pipelineInstancesUrl =
        this.pipelineInstancesUrl || getUrl(coll, 'pipeline_instances')[0];
      this.tagsUrl = this.tagsUrl || getUrl(coll, 'tags')[0];
      this.uploadedFilesUrl = this.uploadedFilesUrl || getUrl(coll, 'uploadedfiles')[0];
      this.pacsFilesUrl = this.pacsFilesUrl || getUrl(coll, 'pacsfiles')[0];
      this.serviceFilesUrl = this.serviceFilesUrl || getUrl(coll, 'servicefiles')[0];
      this.fileBrowserUrl = this.fileBrowserUrl || getUrl(coll, 'filebrowser')[0];
      this.userUrl = this.userUrl || getUrl(coll, 'user')[0];

      return feedList;
    });
  }

  /**
   * Get a feed resource object given its id.
   *
   * @param {number} id - feed id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(id, timeout = 30000) {
    return this.getFeeds({ id: id }, timeout).then((listRes) => listRes.getItem(id));
  }

  /**
   * Tag a feed given its id and the id of the tag.
   *
   * @param {number} feed_id - feed id
   * @param {number} tag_id - tag id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Tagging>} - JS Promise, resolves to a ``Tagging`` object
   */
  tagFeed(feed_id, tag_id, timeout = 30000) {
    return this.getFeed(feed_id, timeout)
      .then((feed) => feed.getTaggings(timeout))
      .then((listRes) => listRes.post({ tag_id: tag_id }), timeout)
      .then((listRes) => listRes.getItems()[0]);
  }

  /**
   * Get a paginated list of files written to any user-owned feed from the REST
   * API given query search parameters. If no search parameters then get the
   * default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.fname] - match file's path starting with this string
   * @param {string} [searchParams.fname_exact] - match file's path exactly with this string
   * @param {string} [searchParams.fname_icontains] - match file's path containing this string
   * @param {string|number} [searchParams.fname_nslashes] - match file's upload path containing this number of slashes
   * @param {number} [searchParams.plugin_inst_id] - match the associated plugin instance
   * id exactly with this number
   * @param {number} [searchParams.feed_id] - match the associated feed id exactly with this number
   * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
   * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<AllFeedFileList>} - JS Promise, resolves to a ``AllFeedFileList`` object
   */
  getFiles(searchParams = null, timeout = 30000) {
    return this._fetchRes('filesUrl', AllFeedFileList, searchParams, timeout);
  }

  /**
   * Get a file resource object given its id.
   *
   * @param {number} id - file id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FeedFile>} - JS Promise, resolves to a ``FeedFile`` object
   */
  getFile(id, timeout = 30000) {
    return this.getFiles({ id: id }, timeout).then((listRes) => listRes.getItem(id));
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
   * @return {Promise<ComputeResource>} - JS Promise, resolves to a ``ComputeResource`` object
   */
  getComputeResource(id, timeout = 30000) {
    return this.getComputeResources({ id: id }, timeout).then((listRes) => listRes.getItem(id));
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
   * @return {Promise<PluginMeta>} - JS Promise, resolves to a ``PluginMeta`` object
   */
  getPluginMeta(id, timeout = 30000) {
    return this.getPluginMetas({ id: id }, timeout).then((listRes) => listRes.getItem(id));
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
   * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
   */
  getPlugin(id, timeout = 30000) {
    return this.getPlugins({ id: id }, timeout).then((listRes) => listRes.getItem(id));
  }

  /**
   * Get a paginated list of plugin instances from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match plugin instance id exactly with this number
   * @param {string} [searchParams.title] - match plugin instance title containing this string
   * @param {string} [searchParams.status] - match plugin instance execution status exactly with this string
   * @param {string} [searchParams.owner_username] - match plugin instances's owner username exactly with this string
   * @param {number} [searchParams.feed_id] - match associated feed's id exactly with this number
   * @param {number} [searchParams.root_id] - match root plugin instance's id exactly with this number
   * @param {number} [searchParams.plugin_id] - match associated plugin's id exactly with this number
   * @param {number} [searchParams.plugin_name] - match associated plugin's name containing this string
   * @param {number} [searchParams.plugin_name_exact] - match associated plugin's name exact with this string
   * @param {number} [searchParams.plugin_version] - match associated plugin's verion exactly with this string
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
   * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
   */
  getPluginInstance(id, timeout = 30000) {
    return this.getPluginInstances({ id: id }, timeout).then((listRes) => listRes.getItem(id));
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
   * @return {Promise<PluginInstance>} - JS Promise, resolves to ``PluginInstance`` object
   */
  createPluginInstance(pluginId, data, timeout = 30000) {
    return this.getPlugin(pluginId, timeout)
      .then((plg) => {
        const instancesUrl = Collection.getLinkRelationUrls(plg.collection.items[0], 'instances');
        const plgInstList = new PluginInstanceList(instancesUrl[0], this.auth);
        return plgInstList.post(data, timeout);
      })
      .then((plgInstList) => plgInstList.getItems()[0]);
  }

  /**
   * Create a new plugin instance split resource through the REST API.
   *
   * @param {number} pluginInstanceId - plugin instance id
   * @param {string} [filter=''] - comma-separated list of regular expressions
   * @param {string} [cr_name=''] - remote compute resource name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PluginInstanceSplit>} - JS Promise, resolves to ``PluginInstanceSplit`` object
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
      .then((plgInstSplitList) => plgInstSplitList.getItems()[0]);
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
   * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
   */
  getPipeline(id, timeout = 30000) {
    return this.getPipelines({ id: id }, timeout).then((listRes) => listRes.getItem(id));
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
   * @return {Promise<Pipeline>} - JS Promise, resolves to ``Pipeline`` object
   */
  createPipeline(data, timeout = 30000) {
    const createRes = () => {
      const res = new PipelineList(this.pipelinesUrl, this.auth);
      return res.post(data, timeout).then((res) => res.getItems()[0]);
    };
    return this.pipelinesUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a paginated list of pipeline instances from the REST API given
   * query search parameters. If no search parameters then get the default
   * first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match pipeline instance id exactly with this number
   * @param {string} [searchParams.title] - match pipeline instance title containing this string
   * @param {string} [searchParams.description] - match pipeline instance description containing this string
   * @param {string} [searchParams.pipeline_name] - match associated pipeline name containing this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<AllPipelineInstanceList>} - JS Promise, resolves to ``AllPipelineInstanceList`` object
   */
  getPipelineInstances(searchParams = null, timeout = 30000) {
    return this._fetchRes('pipelineInstancesUrl', AllPipelineInstanceList, searchParams, timeout);
  }

  /**
   * Get a pipeline instance resource object given its id.
   *
   * @param {number} id - pipeline instance id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PipelineInstance>} - JS Promise, resolves to a ``PipelineInstance`` object
   */
  getPipelineInstance(id, timeout = 30000) {
    return this.getPipelineInstances({ id: id }, timeout).then((listRes) => listRes.getItem(id));
  }

  /**
   * Create a new pipeline instance resource through the REST API.
   *
   * @param {number} pipelineId - pipeline id
   * @param {Object} data - request data object which is pipeline-specific
   * @param {number} data.previous_plugin_inst_id - id of the previous plugin instance
   * @param {string} [data.title] - pipeline title
   * @param {string} [data.description] - pipeline description
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PipelineInstance>} - JS Promise, resolves to ``PipelineInstance`` object
   */
  createPipelineInstance(pipelineId, data, timeout = 30000) {
    return this.getPipeline(pipelineId, timeout)
      .then((pipeline) => {
        const instancesUrl = Collection.getLinkRelationUrls(
          pipeline.collection.items[0],
          'instances'
        );
        const pipInstList = new PipelineInstanceList(instancesUrl[0], this.auth);
        return pipInstList.post(data, timeout);
      })
      .then((pipInstList) => pipInstList.getItems()[0]);
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
   * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
   */
  getTag(id, timeout = 30000) {
    return this.getTags({ id: id }, timeout).then((listRes) => listRes.getItem(id));
  }

  /**
   * Create a new tag resource through the REST API.
   *
   * @param {Object} data - request data object
   * @param {string} data.color - tag color
   * @param {string} [data.name=''] - tag name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Tag>} - JS Promise, resolves to ``Tag`` object
   */
  createTag(data, timeout = 30000) {
    const createRes = () => {
      const res = new TagList(this.tagsUrl, this.auth);
      return res.post(data, timeout).then((res) => res.getItems()[0]);
    };
    return this.tagsUrl ? createRes() : this.setUrls().then(() => createRes());
  }

  /**
   * Get a paginated list of uploaded files from the REST API given query search
   * parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.fname] - match file's upload path starting with this string
   * @param {string} [searchParams.fname_exact] - match file's upload path exactly with this string
   * @param {string} [searchParams.fname_icontains] - match file's upload path containing this string
   * @param {string|number} [searchParams.fname_nslashes] - match file's upload path containing this number of slashes
   * @param {string} [searchParams.owner_username] - match file's owner username exactly with this string
   * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
   * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<UploadedFileList>} - JS Promise, resolves to a ``UploadedFileList`` object
   */
  getUploadedFiles(searchParams = null, timeout = 30000) {
    return this._fetchRes('uploadedFilesUrl', UploadedFileList, searchParams, timeout);
  }

  /**
   * Get an uploaded file resource object given its id.
   *
   * @param {number} id - uploaded file id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<UploadedFile>} - JS Promise, resolves to an ``UploadedFile`` object
   */
  getUploadedFile(id, timeout = 30000) {
    return this.getUploadedFiles({ id: id }, timeout).then((listRes) => listRes.getItem(id));
  }

  /**
   * Upload a file and create a new uploaded file resource through the REST API.
   *
   * @param {Object} data - request data object
   * @param {string} data.upload_path - absolute path including file name where the file
   * will be uploaded on the storage service
   * @param {?Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.fname - file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<UploadedFile>} - JS Promise, resolves to ``UploadedFile`` object
   */
  uploadFile(data, uploadFileObj, timeout = 30000) {
    const createRes = () => {
      const res = new UploadedFileList(this.uploadedFilesUrl, this.auth);
      return res.post(data, uploadFileObj, timeout).then((res) => res.getItems()[0]);
    };
    return this.uploadedFilesUrl ? createRes() : this.setUrls().then(() => createRes());
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
   * @param {string|number} [searchParams.fname_nslashes] - match file's upload path containing this number of slashes
   * @param {string} [searchParams.PatientID] - match file's PatientID exactly with this string
   * @param {string} [searchParams.PatientName] - match file's PatientName containing this string
   * @param {string} [searchParams.StudyInstanceUID] - match file's StudyInstanceUID exactly with this string
   * @param {string} [searchParams.StudyDescription] - match file's StudyDescription containing this string
   * @param {string} [searchParams.SeriesInstanceUID] - match file's SeriesInstanceUID exactly with this string
   * @param {string} [searchParams.SeriesDescription] - match file's SeriesDescription containing this string
   * @param {string} [searchParams.pacs_identifier] - match file's PACS identifier exactly with this string
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
   * @return {Promise<PACSFile>} - JS Promise, resolves to a ``PACSFile`` object
   */
  getPACSFile(id, timeout = 30000) {
    return this.getPACSFiles({ id: id }, timeout).then((listRes) => listRes.getItem(id));
  }

  /**
   * Get a paginated list of files for an unregistered service from the REST API given
   * query search parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [searchParams.id] - match file id exactly with this number
   * @param {string} [searchParams.fname] - match file's path starting with this string
   * @param {string} [searchParams.fname_exact] - match file's path exactly with this string
   * @param {string} [searchParams.fname_icontains] - match file's path containing this string
   * @param {string|number} [searchParams.fname_nslashes] - match file's upload path containing this number of slashes
   * @param {string} [searchParams.service_identifier] - match file's service isentifier containing this string
   * @param {number} [searchParams.service_id] - match file's service id exactly with this number
   * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
   * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<ServiceFileList>} - JS Promise, resolves to a ``ServiceFileList`` object
   */
  getServiceFiles(searchParams = null, timeout = 30000) {
    return this._fetchRes('serviceFilesUrl', ServiceFileList, searchParams, timeout);
  }

  /**
   * Get a service file resource object given its id.
   *
   * @param {number} id - PACS file id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<ServiceFile>} - JS Promise, resolves to a ``ServiceFile`` object
   */
  getServiceFile(id, timeout = 30000) {
    return this.getServiceFiles({ id: id }, timeout).then((listRes) => listRes.getItem(id));
  }

  /**
   * Get a list with the matching file browser path from the REST API given query search
   * parameters. If no search parameters then get a list with the default root path.
   *
   * @param {Object} [searchParams=null] - search parameters object
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {string} [searchParams.path] - match file's path starting with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserPathList>} - JS Promise, resolves to a ``FileBrowserPathList`` object
   */
  getFileBrowserPaths(searchParams = null, timeout = 30000) {
    return this._fetchRes('fileBrowserUrl', FileBrowserPathList, searchParams, timeout);
  }

  /**
   * Get a file browser path resource object given its path.
   *
   * @param {string} path - file browser path
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserPath>} - JS Promise, resolves to a ``FileBrowserPath`` object
   */
  getFileBrowserPath(path, timeout = 30000) {
    return this.getFileBrowserPaths({ path: path }, timeout).then(listRes => {
      const items = listRes.getItems();
      return items.length ? items[0] : null;
    });
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
    return req.post(usersUrl, userData).then((resp) => {
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
    return req.post(authUrl, authData).then((resp) => resp.data.token);
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
      return searchParams ? res.get(searchParams, timeout) : res.get(timeout);
    };
    return this[resUrlProp] ? getRes() : this.setUrls().then(() => getRes());
  }
}
