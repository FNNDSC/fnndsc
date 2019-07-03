/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import User from './user';
import { PluginList } from './plugin';
import { PipelineList } from './pipeline';
import { AllPipelineInstanceList } from './pipelineinstance';
import { UploadedFileList } from './uploadedfile';
import Note from './note';
import { FeedTagList, FeedTaggingList, TagList } from './tag';
import { CommentList } from './comment';
import { FeedFileList } from './feedfile';
import { AllPluginInstanceList, FeedPluginInstanceList } from './plugininstance';

/**
 * Feed item resource object representing a feed.
 */
export class Feed extends ItemResource {
  /**
   * Fetch the note associated to this feed from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``Note`` object
   */
  getNote(timeout = 30000) {
    const linkRelation = 'note';
    const resourceClass = Note;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch a list of tags associated to this feed from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``FeedTagList`` object
   */
  getTags(params = null, timeout = 30000) {
    const linkRelation = 'tags';
    const resourceClass = FeedTagList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of taggings associated to this feed from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``FeedTaggingList`` object
   */
  getTaggings(params = null, timeout = 30000) {
    const linkRelation = 'taggings';
    const resourceClass = FeedTaggingList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of comments associated to this feed from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``CommentList`` object
   */
  getComments(params = null, timeout = 30000) {
    const linkRelation = 'comments';
    const resourceClass = CommentList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of files associated to this feed from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``FeedFileList`` object
   */
  getFiles(params = null, timeout = 30000) {
    const linkRelation = 'files';
    const resourceClass = FeedFileList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of plugin instances associated to this feed from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``FeedPluginInstanceList`` object
   */
  getPluginInstances(params = null, timeout = 30000) {
    const linkRelation = 'plugin_instances';
    const resourceClass = FeedPluginInstanceList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Make a PUT request to modify this feed item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} [data.name] - name of the feed
   * @param {string} [data.owner] - username to be added to the list of this feed's owners
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  }

  /**
   * Make a DELETE request to delete this feed item resource through the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to ``null``
   */
  delete(timeout = 30000) {
    return this._delete(timeout);
  }
}

/**
 * Feed list resource object representing a list of user's feeds.
 */
export class FeedList extends ListResource {
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
    this.itemClass = Feed;
  }

  /**
   * Fetch currently authenticated user's information from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``User`` object
   */
  getUser(timeout = 30000) {
    const linkRelation = 'user';
    const resourceClass = User;

    return this._getResource(linkRelation, resourceClass, null, timeout);
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
   * @return {Object} - JS Promise, resolves to a ``PluginList`` object
   */
  getPlugins(searchParams = null, timeout = 30000) {
    const linkRelation = 'plugins';
    const resourceClass = PluginList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

  /**
   * Fetch a list of plugin instances from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``AllPluginInstanceList.getSearchParameters`` method
   * can be used to get a list of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``AllPluginInstanceList`` object
   */
  getPluginInstances(searchParams = null, timeout = 30000) {
    const linkRelation = 'plugin_instances';
    const resourceClass = AllPluginInstanceList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
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

  /**
   * Fetch a list of pipeline instances from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``AllPipelineInstanceList.getSearchParameters`` method
   * can be used to get a list of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``AllPipelineInstanceList`` object
   */
  getPipelineInstances(searchParams = null, timeout = 30000) {
    const linkRelation = 'pipeline_instances';
    const resourceClass = AllPipelineInstanceList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

  /**
   * Fetch a list of tags from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``TagList.getSearchParameters`` method can be
   * used to get a list of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``TagList`` object
   */
  getTags(searchParams = null, timeout = 30000) {
    const linkRelation = 'tags';
    const resourceClass = TagList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

  /**
   * Fetch a list of uploaded files from the REST API.
   *
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``UploadedFileList.getSearchParameters`` method can
   * be used to get a list of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``UploadedFileList`` object
   */
  getUploadedFiles(searchParams = null, timeout = 30000) {
    const linkRelation = 'uploadedfiles';
    const resourceClass = UploadedFileList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }
}
