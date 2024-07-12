/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import ChrisInstance from './chrisinstance';
import User from './user';
import { ComputeResourceList } from './computeresource';
import { PluginList } from './plugin';
import { PluginMetaList } from './pluginmeta';
import { PluginAdminList } from './admin';
import { PipelineList, PipelineSourceFileList } from './pipeline';
import { UserFileList } from './userfile';
import { PACSFileList, PACSSeriesList } from './pacsfile';
import Note from './note';
import { FeedTagList, FeedTaggingList, TagList } from './tag';
import { CommentList, Comment } from './comment';
import { AllPluginInstanceList, FeedPluginInstanceList } from './plugininstance';
import { FileBrowserFolderList, FileBrowserFolder } from './filebrowser';
import { GroupList, Group } from './group';

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
   getFolder(timeout = 30000) {
    const linkRelation = 'folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the note associated to this feed from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Note>} - JS Promise, resolves to a ``Note`` object
   */
  getNote(timeout = 30000) {
    const linkRelation = 'note';
    const resourceClass = Note;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

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
   getGroupPermissions(searchParams = null, timeout = 30000) {
    const linkRelation = 'group_permissions';
    const resourceClass = FeedGroupPermissionList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  } 

  /**
   * Get a feed group permission given the name of the group.
   *
   * @param {string} group_name - feed group permission's group name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FeedGroupPermission|null>} - JS Promise, resolves to a ``FeedGroupPermission`` object or ``null``
   */
  getGroupPermission(group_name, timeout = 30000) {
    return this.getGroupPermissions({ group_name: group_name }, timeout).then(listRes => {
      const items = listRes.getItems();
      return items.length ? items[0] : null;
    });
  } 

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
   getUserPermissions(searchParams = null, timeout = 30000) {
    const linkRelation = 'user_permissions';
    const resourceClass = FeedUserPermissionList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  } 

  /**
   * Get a feed user permission given the username of the user.
   *
   * @param {string} username - feed user permission's username
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FeedUserPermission|null>} - JS Promise, resolves to a ``FeedUserPermission`` object or ``null``
   */
   getUserPermission(username, timeout = 30000) {
    return this.getUserPermissions({ username: username }, timeout).then(listRes => {
      const items = listRes.getItems();
      return items.length ? items[0] : null;
    });
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
   * @return {Promise<FeedTaggingList>} - JS Promise, resolves to a ``FeedTaggingList`` object
   */
  getTaggings(params = null, timeout = 30000) {
    const linkRelation = 'taggings';
    const resourceClass = FeedTaggingList;

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
    const resourceClass = CommentList;

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
    const resourceClass = FeedPluginInstanceList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Add a tag to the feed given the id of the tag.
   *
   * @param {number} tag_id - tag id
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Tagging>} - JS Promise, resolves to a ``Tagging`` object
   */
   addTag(tag_id, timeout = 30000) {
    return this.getTaggings(null, timeout)
      .then(listRes => listRes.post({ tag_id: tag_id }), timeout)
      .then(listRes => listRes.getItems()[0]);
  }

  /**
   * Add a new comment to the feed.
   *
   * @param {string} [title] - title of the comment
   * @param {string} [content] - content of the comment
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Comment>} - JS Promise, resolves to a ``Comment`` object
   */
   addComment(title='', content='', timeout = 30000) {
    return this.getComments(null, timeout)
      .then(listRes => listRes.post({ title: title, content: content }), timeout)
      .then(listRes => listRes.getItems()[0]);
  }  

  /**
   * Make the feed public.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   makePublic(timeout = 30000) {
    return this.put({ public: true }, timeout);
  } 

  /**
   * Make the feed unpublic.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
   makeUnpublic(timeout = 30000) {
    return this.put({ public: false }, timeout);
  } 
  
  /**
   * Add a group permission to access the feed.
   *
   * @param {string} group_name - group's name
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FeedGroupPermission>} - JS Promise, resolves to a ``FeedGroupPermission`` object
   */
   addGroupPermission(group_name, timeout = 30000) {
    return this.getGroupPermissions(null, timeout)
      .then(listRes => listRes.post({ grp_name: group_name }), timeout)
      .then(listRes => listRes.getItems()[0]);
  } 

  /**
   * Add a user permission to access the feed.
   *
   * @param {string} username - user's username
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FeedUserPermission>} - JS Promise, resolves to a ``FeedUserPermission`` object
   */
   addUserPermission(username, timeout = 30000) {
    return this.getUserPermissions(null, timeout)
      .then(listRes => listRes.post({ username: username }), timeout)
      .then(listRes => listRes.getItems()[0]);
  } 

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

/**
 * Feed list resource object representing a list of user's feeds.
 */
export class FeedList extends ListResource {
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
   * Fetch the ChRIS instance information from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<User>} - JS Promise, resolves to a ``ChrisInstance`` object
   */
  getChrisInstance(timeout = 30000) {
    const linkRelation = 'chrisinstance';
    const resourceClass = ChrisInstance;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

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
   getPublicFeeds(searchParams = null, timeout = 30000) {
    const linkRelation = 'public_feeds';
    const resourceClass = PublicFeedList;

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
    const resourceClass = ComputeResourceList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

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
   getPluginMetas(searchParams = null, timeout = 30000) {
    const linkRelation = 'plugin_metas';
    const resourceClass = PluginMetaList;

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
    const resourceClass = PluginList;

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
    const resourceClass = PluginAdminList;

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
   * @return {Promise<PipelineList>} - JS Promise, resolves to a ``PipelineList`` object
   */
  getPipelines(searchParams = null, timeout = 30000) {
    const linkRelation = 'pipelines';
    const resourceClass = PipelineList;

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
    const resourceClass = TagList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

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
    getPipelineSourceFiles(searchParams = null, timeout = 30000) {
      const linkRelation = 'pipelinesourcefiles';
      const resourceClass = PipelineSourceFileList;
  
      return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }

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
  getUserFiles(searchParams = null, timeout = 30000) {
    const linkRelation = 'userfiles';
    const resourceClass = UserFileList;

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
    const resourceClass = PACSFileList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

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
  getPACSSeriesList(searchParams = null, timeout = 30000) {
    const linkRelation = 'pacsseries';
    const resourceClass = PACSSeriesList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }

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
  getFileBrowserFolders(searchParams = null, timeout = 30000) {
    const linkRelation = 'filebrowser';
    const resourceClass = FileBrowserFolderList;

    return this._getResource(linkRelation, resourceClass, searchParams, timeout);
  }
  
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
  getGroups(searchParams = null, timeout = 30000) {
    const linkRelation = 'groups';
    const resourceClass = GroupList;

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
    const resourceClass = User;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Feed list resource object representing a list of public feeds.
 */
export class PublicFeedList extends ListResource {
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
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the feed associated to the group permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the group associated to the group permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Group>} - JS Promise, resolves to a ``Group`` object
   */
   getGroup(timeout = 30000) {
    const linkRelation = 'group';
    const resourceClass = Group;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  } 

  /**
   * Make a DELETE request to delete this feed group permission item resource through the REST API.
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
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = FeedGroupPermission;
  }

  /**
   * Fetch the feed associated to the group permission list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

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
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
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
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the feed associated to the user permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch the user associated to the user permission item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
   */
   getUser(timeout = 30000) {
    const linkRelation = 'user';
    const resourceClass = User;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  } 

  /**
   * Make a DELETE request to delete this feed user permission item resource through the REST API.
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
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = FeedUserPermission;
  }

  /**
   * Fetch the feed associated to the user permission list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

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
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}
