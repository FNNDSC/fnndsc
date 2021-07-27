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
    getNote(timeout?: number): any;
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
    getTags(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
    getTaggings(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
    /**
     * Fetch a list of comments associated to this feed from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [searchParams.id] - match comment id exactly with this number
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``CommentList`` object
     */
    getComments(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
    }, timeout?: number): any;
    /**
     * Get a feed comment given its id.
     *
     * @param {number} id - comment id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``Comment`` object
     */
    getComment(id: number, timeout?: number): any;
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
    getFiles(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
    getPluginInstances(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
    /**
     * Tag the feed given the id of the tag.
     *
     * @param {number} tag_id - tag id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``Tagging`` object
     */
    tagFeed(tag_id: number, timeout?: number): any;
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
    put(data: {
        name?: string;
        owner?: string;
    }, timeout?: number): any;
    /**
     * Make a DELETE request to delete this feed item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise
     */
    delete(timeout?: number): any;
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
     * @return {Object} - JS Promise, resolves to a ``AllFeedFileList`` object
     */
    getFiles(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
     * @return {Object} - JS Promise, resolves to a ``ComputeResourceList`` object
     */
    getComputeResources(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
    getPlugins(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
    getPluginInstances(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
    getPipelines(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
    getPipelineInstances(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
    getTags(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
    getUploadedFiles(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
     * @return {Object} - JS Promise, resolves to a ``PACSFileList`` object
     */
    getPACSFiles(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
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
     * @return {Object} - JS Promise, resolves to a ``ServiceFileList`` object
     */
    getServiceFiles(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): any;
    /**
     * Fetch currently authenticated user's information from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout?: number): any;
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
