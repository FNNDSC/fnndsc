/**
 * Feed item resource object representing a feed.
 */
export class Feed extends ItemResource {
    /**
     * Fetch the folder associated to this feed from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
     */
    getFolder(timeout?: number): Promise<FileBrowserFolder>;
    /**
     * Fetch the note associated to this feed from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Note>} - JS Promise, resolves to a ``Note`` object
     */
    getNote(timeout?: number): Promise<Note>;
    /**
     * Fetch a list of group permissions associated to this feed from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [searchParams.id] - match feed group permission id exactly with this number
     * @param {string} [searchParams.group_name] - match group name exactly with this string
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedGroupPermissionList>} - JS Promise, resolves to a ``FeedGroupPermissionList`` object
     */
    getGroupPermissions(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        group_name?: string;
    }, timeout?: number): Promise<FeedGroupPermissionList>;
    /**
     * Get a feed group permission given the name of the group.
     *
     * @param {string} group_name - feed group permission's group name
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedGroupPermission|null>} - JS Promise, resolves to a ``FeedGroupPermission`` object or ``null``
     */
    getGroupPermission(group_name: string, timeout?: number): Promise<FeedGroupPermission | null>;
    /**
     * Fetch a list of user permissions associated to this feed from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [searchParams.id] - match feed user permission id exactly with this number
     * @param {string} [searchParams.username] - match username exactly with this string
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedUserPermissionList>} - JS Promise, resolves to a ``FeedUserPermissionList`` object
     */
    getUserPermissions(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        username?: string;
    }, timeout?: number): Promise<FeedUserPermissionList>;
    /**
     * Get a feed user permission given the username of the user.
     *
     * @param {string} username - feed user permission's username
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedUserPermission|null>} - JS Promise, resolves to a ``FeedUserPermission`` object or ``null``
     */
    getUserPermission(username: string, timeout?: number): Promise<FeedUserPermission | null>;
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
     * Add a tag to the feed given the id of the tag.
     *
     * @param {number} tag_id - tag id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tagging>} - JS Promise, resolves to a ``Tagging`` object
     */
    addTag(tag_id: number, timeout?: number): Promise<Tagging>;
    /**
     * Add a new comment to the feed.
     *
     * @param {string} [title] - title of the comment
     * @param {string} [content] - content of the comment
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Comment>} - JS Promise, resolves to a ``Comment`` object
     */
    addComment(title?: string, content?: string, timeout?: number): Promise<Comment>;
    /**
     * Make the feed public.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    makePublic(timeout?: number): Promise<Feed>;
    /**
     * Make the feed unpublic.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    makeUnpublic(timeout?: number): Promise<Feed>;
    /**
     * Add a group permission to access the feed.
     *
     * @param {string} group_name - group's name
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedGroupPermission>} - JS Promise, resolves to a ``FeedGroupPermission`` object
     */
    addGroupPermission(group_name: string, timeout?: number): Promise<FeedGroupPermission>;
    /**
     * Add a user permission to access the feed.
     *
     * @param {string} username - user's username
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedUserPermission>} - JS Promise, resolves to a ``FeedUserPermission`` object
     */
    addUserPermission(username: string, timeout?: number): Promise<FeedUserPermission>;
    /**
     * Make a PUT request to modify this feed item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.name] - name of the feed
     * @param {boolean} [data.public] - public status of the feed
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data: {
        name?: string;
        public?: boolean;
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
    * Fetch a list of plugin metas from the REST API.
    *
    * @param {Object} [searchParams=null] - search parameters object which is
    * resource-specific, the ``PluginMetaList.getSearchParameters`` method can be
    * used to get a list of possible search parameters
    * @param {number} [searchParams.limit] - page limit
    * @param {number} [searchParams.offset] - page offset
    * @param {number} [timeout=30000] - request timeout
    *
    * @return {Promise<PluginMetaList>} - JS Promise, resolves to a ``PluginMetaList`` object
    */
    getPluginMetas(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PluginMetaList>;
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
     * Fetch a list of PACS series from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``PACSSeriesList.getSearchParameters`` method can
     * be used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACSSeriesList>} - JS Promise, resolves to a ``PACSSeriesList`` object
     */
    getPACSSeriesList(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PACSSeriesList>;
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
     * Fetch a list of groups from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``GroupList.getSearchParameters`` method can be
     * used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<GroupList>} - JS Promise, resolves to a ``GroupList`` object
     */
    getGroups(searchParams?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<GroupList>;
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
/**
 * Feed group permission item resource object representing a feed group permission.
 */
export class FeedGroupPermission extends ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the feed associated to the group permission item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): Promise<Feed>;
    /**
     * Fetch the group associated to the group permission item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Group>} - JS Promise, resolves to a ``Group`` object
     */
    getGroup(timeout?: number): Promise<Group>;
    /**
     * Make a DELETE request to delete this feed group permission item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * Feed group permission list resource object representing a list of feed group permissions.
 */
export class FeedGroupPermissionList extends ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the feed associated to the group permission list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): Promise<Feed>;
    /**
     * Make a POST request to this feed group permission list resource to create a new
     * feed group permission item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.grp_name] - group name
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: {
        grp_name?: string;
    }, timeout?: number): Promise<FeedGroupPermissionList>;
}
/**
 * Feed user permission item resource object representing a feed user permission.
 */
export class FeedUserPermission extends ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the feed associated to the user permission item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): Promise<Feed>;
    /**
     * Fetch the user associated to the user permission item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout?: number): Promise<User>;
    /**
     * Make a DELETE request to delete this feed user permission item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * Feed user permission list resource object representing a list of feed user permissions.
 */
export class FeedUserPermissionList extends ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the feed associated to the user permission list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): Promise<Feed>;
    /**
     * Make a POST request to this feed user permission list resource to create a new
     * feed user permission item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.username] - user's  username
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: {
        username?: string;
    }, timeout?: number): Promise<FeedUserPermissionList>;
}
import { ItemResource } from "./resource";
import { FileBrowserFolder } from "./filebrowser";
import Note from "./note";
import { FeedTagList } from "./tag";
import { FeedTaggingList } from "./tag";
import { CommentList } from "./comment";
import { Comment } from "./comment";
import { FeedPluginInstanceList } from "./plugininstance";
import { ListResource } from "./resource";
import User from "./user";
import { ComputeResourceList } from "./computeresource";
import { PluginMetaList } from "./pluginmeta";
import { PluginList } from "./plugin";
import { PluginAdminList } from "./admin";
import { AllPluginInstanceList } from "./plugininstance";
import { PipelineList } from "./pipeline";
import { TagList } from "./tag";
import { PipelineSourceFileList } from "./pipeline";
import { UserFileList } from "./userfile";
import { PACSFileList } from "./pacsfile";
import { PACSSeriesList } from "./pacsfile";
import { FileBrowserFolderList } from "./filebrowser";
import { GroupList } from "./group";
import { Group } from "./group";
