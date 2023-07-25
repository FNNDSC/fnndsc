/**
 * Feed item resource object representing a feed.
 */
export class Feed extends ItemResource {
    /**
     * Fetch the note associated to this feed from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Note>} - JS Promise, resolves to a ``Note`` object
     */
    getNote(timeout?: number | undefined): Promise<Note>;
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
    getTags(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<FeedTagList>;
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
    getTaggings(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<FeedTaggingList>;
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
    getComments(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<CommentList>;
    /**
     * Get a feed comment given its id.
     *
     * @param {number} id - comment id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Comment>} - JS Promise, resolves to a ``Comment`` object
     */
    getComment(id: number, timeout?: number | undefined): Promise<Comment>;
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
    getFiles(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<FeedFileList>;
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
    getPluginInstances(params?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<FeedPluginInstanceList>;
    /**
     * Tag the feed given the id of the tag.
     *
     * @param {number} tag_id - tag id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tagging>} - JS Promise, resolves to a ``Tagging`` object
     */
    tagFeed(tag_id: number, timeout?: number | undefined): Promise<Tagging>;
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
    put(data: {
        name?: string | undefined;
        owner?: string | undefined;
    }, timeout?: number | undefined): Promise<Feed>;
    /**
     * Make a DELETE request to delete this feed item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number | undefined): Promise<any>;
}
/**
 * Feed list resource object representing a list of user's feeds.
 */
export class FeedList extends ListResource {
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
    getFiles(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<AllFeedFileList>;
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
    getComputeResources(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<ComputeResourceList>;
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
    getPlugins(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PluginList>;
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
    getPluginAdmins(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PluginAdminList>;
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
    getPluginInstances(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<AllPluginInstanceList>;
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
    getPipelineInstances(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<AllPipelineInstanceList>;
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
    getTags(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<TagList>;
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
    getUploadedFiles(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<UploadedFileList>;
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
    getPACSFiles(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PACSFileList>;
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
    getServiceFiles(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<ServiceFileList>;
    /**
     * Fetch currently authenticated user's information from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout?: number | undefined): Promise<User>;
}
/**
 * Feed list resource object representing a list of public feeds.
 */
export class PublicFeedList extends ListResource {
}
import { ItemResource } from "./resource";
import Note from "./note";
import { FeedTagList } from "./tag";
import { FeedTaggingList } from "./tag";
import { CommentList } from "./comment";
import { FeedFileList } from "./feedfile";
import { FeedPluginInstanceList } from "./plugininstance";
import { ListResource } from "./resource";
import { AllFeedFileList } from "./feedfile";
import { ComputeResourceList } from "./computeresource";
import { PluginList } from "./plugin";
import { PluginAdminList } from "./admin";
import { AllPluginInstanceList } from "./plugininstance";
import { PipelineList } from "./pipeline";
import { AllPipelineInstanceList } from "./pipelineinstance";
import { TagList } from "./tag";
import { UploadedFileList } from "./uploadedfile";
import { PACSFileList } from "./pacsfile";
import { ServiceFileList } from "./servicefile";
import User from "./user";
