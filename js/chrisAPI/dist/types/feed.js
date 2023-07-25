"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicFeedList = exports.FeedList = exports.Feed = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const user_1 = require("./user");
const computeresource_1 = require("./computeresource");
const plugin_1 = require("./plugin");
const admin_1 = require("./admin");
const pipeline_1 = require("./pipeline");
const pipelineinstance_1 = require("./pipelineinstance");
const uploadedfile_1 = require("./uploadedfile");
const pacsfile_1 = require("./pacsfile");
const servicefile_1 = require("./servicefile");
const note_1 = require("./note");
const tag_1 = require("./tag");
const comment_1 = require("./comment");
const feedfile_1 = require("./feedfile");
const plugininstance_1 = require("./plugininstance");
/**
 * Feed item resource object representing a feed.
 */
class Feed extends resource_1.ItemResource {
    /**
     * Fetch the note associated to this feed from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Note>} - JS Promise, resolves to a ``Note`` object
     */
    getNote(timeout = 30000) {
        const linkRelation = 'note';
        const resourceClass = note_1.default;
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
     * @return {Promise<FeedTagList>} - JS Promise, resolves to a ``FeedTagList`` object
     */
    getTags(params = null, timeout = 30000) {
        const linkRelation = 'tags';
        const resourceClass = tag_1.FeedTagList;
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
     * @return {Promise<FeedTaggingList>} - JS Promise, resolves to a ``FeedTaggingList`` object
     */
    getTaggings(params = null, timeout = 30000) {
        const linkRelation = 'taggings';
        const resourceClass = tag_1.FeedTaggingList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
    /**
     * Fetch a list of comments associated to this feed from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [searchParams.id] - match comment id exactly with this number
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<CommentList>} - JS Promise, resolves to a ``CommentList`` object
     */
    getComments(searchParams = null, timeout = 30000) {
        const linkRelation = 'comments';
        const resourceClass = comment_1.CommentList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
    /**
     * Get a feed comment given its id.
     *
     * @param {number} id - comment id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Comment>} - JS Promise, resolves to a ``Comment`` object
     */
    getComment(id, timeout = 30000) {
        return this.getComments({ id: id }, timeout).then(listRes => listRes.getItem(id));
    }
    /**
     * Fetch a list of files associated to this feed from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedFileList>} - JS Promise, resolves to a ``FeedFileList`` object
     */
    getFiles(params = null, timeout = 30000) {
        const linkRelation = 'files';
        const resourceClass = feedfile_1.FeedFileList;
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
     * @return {Promise<FeedPluginInstanceList>} - JS Promise, resolves to a ``FeedPluginInstanceList`` object
     */
    getPluginInstances(params = null, timeout = 30000) {
        const linkRelation = 'plugin_instances';
        const resourceClass = plugininstance_1.FeedPluginInstanceList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
    /**
     * Tag the feed given the id of the tag.
     *
     * @param {number} tag_id - tag id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tagging>} - JS Promise, resolves to a ``Tagging`` object
     */
    tagFeed(tag_id, timeout = 30000) {
        return this.getTaggings(timeout)
            .then(listRes => listRes.post({ tag_id: tag_id }), timeout)
            .then(listRes => listRes.getItems()[0]);
    }
    /**
     * Make a PUT request to modify this feed item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.name] - name of the feed
     * @param {string} [data.owner] - username to be added to the list of this feed's owners
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data, timeout = 30000) {
        return this._put(data, null, timeout);
    }
    /**
     * Make a DELETE request to delete this feed item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.Feed = Feed;
/**
 * Feed list resource object representing a list of user's feeds.
 */
class FeedList extends resource_1.ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the ChRIS service
     * @param {Object} [auth=null] - authentication object
     * @param {string} [auth.token] - authentication token
     */
    constructor(url, auth = null) {
        super(url, auth);
        /** @type {Object} */
        this.itemClass = Feed;
    }
    /**
     * Fetch a list of files written to any user-owned feed.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``AllFeedFileList.getSearchParameters`` method can be
     * used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<AllFeedFileList>} - JS Promise, resolves to a ``AllFeedFileList`` object
     */
    getFiles(searchParams = null, timeout = 30000) {
        const linkRelation = 'files';
        const resourceClass = feedfile_1.AllFeedFileList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
    /**
     * Fetch a list of compute resources from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``ComputeResourceList.getSearchParameters`` method
     * can be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ComputeResourceList>} - JS Promise, resolves to a ``ComputeResourceList`` object
     */
    getComputeResources(searchParams = null, timeout = 30000) {
        const linkRelation = 'compute_resources';
        const resourceClass = computeresource_1.ComputeResourceList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
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
    /**
     * Fetch a list of plugin admins.
     *
     * @param {Object} [searchParams=null] - search parameters object
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginAdminList>} - JS Promise, resolves to a ``PluginAdminList`` object
     */
    getPluginAdmins(searchParams = null, timeout = 30000) {
        const linkRelation = 'admin';
        const resourceClass = admin_1.PluginAdminList;
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
     * @return {Promise<AllPluginInstanceList>} - JS Promise, resolves to a ``AllPluginInstanceList`` object
     */
    getPluginInstances(searchParams = null, timeout = 30000) {
        const linkRelation = 'plugin_instances';
        const resourceClass = plugininstance_1.AllPluginInstanceList;
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
     * @return {Promise<PipelineList>} - JS Promise, resolves to a ``PipelineList`` object
     */
    getPipelines(searchParams = null, timeout = 30000) {
        const linkRelation = 'pipelines';
        const resourceClass = pipeline_1.PipelineList;
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
     * @return {Promise<AllPipelineInstanceList>} - JS Promise, resolves to a ``AllPipelineInstanceList`` object
     */
    getPipelineInstances(searchParams = null, timeout = 30000) {
        const linkRelation = 'pipeline_instances';
        const resourceClass = pipelineinstance_1.AllPipelineInstanceList;
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
     * @return {Promise<TagList>} - JS Promise, resolves to a ``TagList`` object
     */
    getTags(searchParams = null, timeout = 30000) {
        const linkRelation = 'tags';
        const resourceClass = tag_1.TagList;
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
     * @return {Promise<UploadedFileList>} - JS Promise, resolves to a ``UploadedFileList`` object
     */
    getUploadedFiles(searchParams = null, timeout = 30000) {
        const linkRelation = 'uploadedfiles';
        const resourceClass = uploadedfile_1.UploadedFileList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
    /**
     * Fetch a list of PACS files from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``PACSFileList.getSearchParameters`` method can
     * be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACSFileList>} - JS Promise, resolves to a ``PACSFileList`` object
     */
    getPACSFiles(searchParams = null, timeout = 30000) {
        const linkRelation = 'pacsfiles';
        const resourceClass = pacsfile_1.PACSFileList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
    /**
     * Fetch a list of files for an unregistered service from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``ServiceFileList.getSearchParameters`` method can
     * be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ServiceFileList>} - JS Promise, resolves to a ``ServiceFileList`` object
     */
    getServiceFiles(searchParams = null, timeout = 30000) {
        const linkRelation = 'servicefiles';
        const resourceClass = servicefile_1.ServiceFileList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
    /**
     * Fetch currently authenticated user's information from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout = 30000) {
        const linkRelation = 'user';
        const resourceClass = user_1.default;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.FeedList = FeedList;
/**
 * Feed list resource object representing a list of public feeds.
 */
class PublicFeedList extends resource_1.ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the ChRIS service
     * @param {Object} [auth=null] - authentication object
     * @param {string} [auth.token] - authentication token
     */
    constructor(url, auth = null) {
        super(url, auth);
        /** @type {Object} */
        this.itemClass = Feed;
    }
}
exports.PublicFeedList = PublicFeedList;
