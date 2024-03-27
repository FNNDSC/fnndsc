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
    getNote(timeout?: number): Promise<Note>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FeedTagList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FeedTaggingList>;
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
        limit?: number;
        offset?: number;
        id?: number;
    }, timeout?: number): Promise<CommentList>;
    /**
     * Get a feed comment given its id.
     *
     * @param {number} id - comment id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Comment>} - JS Promise, resolves to a ``Comment`` object
     */
    getComment(id: number, timeout?: number): Promise<Comment>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FeedPluginInstanceList>;
    /**
     * Tag the feed given the id of the tag.
     *
     * @param {number} tag_id - tag id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tagging>} - JS Promise, resolves to a ``Tagging`` object
     */
    tagFeed(tag_id: number, timeout?: number): Promise<Tagging>;
    /**
     * Make a PUT request to modify this feed item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.name] - name of the feed
     * @param {boolean} [data.public] - public status of the feed
     * @param {string} [data.owner] - username to be added to the list of this feed's owners
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data: {
        name?: string;
        public?: boolean;
        owner?: string;
    }, timeout?: number): Promise<Feed>;
    /**
     * Make a DELETE request to delete this feed item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * Feed list resource object representing a list of user's feeds.
 */
export class FeedList extends ListResource {
    /**
     * Fetch the ChRIS instance information from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``ChrisInstance`` object
     */
    getChrisInstance(timeout?: number): Promise<User>;
    /**
    * Fetch a list of public feeds from the REST API.
    *
    * @param {Object} [searchParams=null] - search parameters object which is
    * resource-specific, the ``PublicFeedList.getSearchParameters`` method can be
    * used to get a list of possible search parameters
    * @param {number} [searchParams.limit] - page limit
    * @param {number} [searchParams.offset] - page offset
    * @param {number} [timeout=30000] - request timeout
    *
    * @return {Promise<PublicFeedList>} - JS Promise, resolves to a ``PublicFeedList`` object
    */
    getPublicFeeds(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PublicFeedList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<ComputeResourceList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginAdminList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<AllPluginInstanceList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PipelineList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<AllPipelineInstanceList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<TagList>;
    /**
     * Fetch a list of pipeline source files from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``PipelineSourceFileList.getSearchParameters`` method can
     * be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineSourceFileList>} - JS Promise, resolves to a ``PipelineSourceFileList`` object
     */
    getPipelineSourceFiles(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PipelineSourceFileList>;
    /**
     * Fetch a list of user files from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``UserFileList.getSearchParameters`` method can
     * be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<UserFileList>} - JS Promise, resolves to a ``UserFileList`` object
     */
    getUserFiles(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<UserFileList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PACSFileList>;
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
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<ServiceFileList>;
    /**
     * Fetch a list of file browser folders (the returned list only has at most one element) from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``FileBrowserFolderList.getSearchParameters`` method can
     * be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolderList>} - JS Promise, resolves to a ``FileBrowserFolderList`` object
     */
    getFileBrowserFolders(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FileBrowserFolderList>;
    /**
     * Fetch currently authenticated user's information from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout?: number): Promise<User>;
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
import { FeedPluginInstanceList } from "./plugininstance";
import { ListResource } from "./resource";
import User from "./user";
import { ComputeResourceList } from "./computeresource";
import { PluginList } from "./plugin";
import { PluginAdminList } from "./admin";
import { AllPluginInstanceList } from "./plugininstance";
import { PipelineList } from "./pipeline";
import { AllPipelineInstanceList } from "./pipelineinstance";
import { TagList } from "./tag";
import { PipelineSourceFileList } from "./pipeline";
import { UserFileList } from "./userfile";
import { PACSFileList } from "./pacsfile";
import { ServiceFileList } from "./servicefile";
import { FileBrowserFolderList } from "./filebrowser";
