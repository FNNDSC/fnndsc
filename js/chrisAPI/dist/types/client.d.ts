/**
 * API client object.
 */
export default class Client {
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
    static createUser(usersUrl: string, username: string, password: string, email: string, timeout?: number | undefined): Promise<User>;
    /**
     * Fetch a user's login authorization token from the REST API.
     * @param {string} authUrl - url of the authorization service
     * @param {string} username - username
     * @param {string} password - password
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<string>} - JS Promise, resolves to a ``string`` value
     */
    static getAuthToken(authUrl: string, username: string, password: string, timeout?: number | undefined): Promise<string>;
    /**
     * Helper method to run an asynchronous task defined by a task generator function.
     *
     * @param {function*()} taskGenerator - generator function
     */
    static runAsyncTask(taskGenerator: any): void;
    /**
     * Constructor
     *
     * @param {string} url - url of the ChRIS service
     * @param {Object} [auth=null] - authentication object
     * @param {string} [auth.token] - authentication token
     */
    constructor(url: string, auth?: {
        token?: string | undefined;
    } | undefined);
    /** @type {string} */
    url: string;
    /** @type {Object} */
    auth: Object;
    feedsUrl: string;
    publicFeedsUrl: string;
    chrisInstanceUrl: string;
    filesUrl: string;
    computeResourcesUrl: string;
    pluginMetasUrl: string;
    pluginsUrl: string;
    pluginInstancesUrl: string;
    pipelinesUrl: string;
    pipelineInstancesUrl: string;
    workflowsUrl: string;
    tagsUrl: string;
    uploadedFilesUrl: string;
    pacsFilesUrl: string;
    serviceFilesUrl: string;
    fileBrowserUrl: string;
    userUrl: string;
    adminUrl: string;
    /**
     * Set the urls of the high level API resources.
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    setUrls(timeout?: number | undefined): Promise<any>;
    /**
     * Get the ChRIS instance resource object.
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ChrisInstance>} - JS Promise, resolves to a ``ChrisInstance`` object
     */
    getChrisInstance(timeout?: number | undefined): Promise<ChrisInstance>;
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
    getFeeds(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        min_id?: number | undefined;
        max_id?: number | undefined;
        name?: string | undefined;
        name_exact?: string | undefined;
        name_startswith?: string | undefined;
        files_fname_icontains?: string | undefined;
        min_creation_date?: number | undefined;
        max_creation_date?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<FeedList>;
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
    getPublicFeeds(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        min_id?: number | undefined;
        max_id?: number | undefined;
        name?: string | undefined;
        name_exact?: string | undefined;
        name_startswith?: string | undefined;
        files_fname_icontains?: string | undefined;
        min_creation_date?: number | undefined;
        max_creation_date?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PublicFeedList>;
    /**
     * Get a feed resource object given its id.
     *
     * @param {number} id - feed id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(id: number, timeout?: number | undefined): Promise<Feed>;
    /**
     * Tag a feed given its id and the id of the tag.
     *
     * @param {number} feed_id - feed id
     * @param {number} tag_id - tag id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tagging>} - JS Promise, resolves to a ``Tagging`` object
     */
    tagFeed(feed_id: number, tag_id: number, timeout?: number | undefined): Promise<Tagging>;
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
    getFiles(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        fname?: string | undefined;
        fname_exact?: string | undefined;
        fname_icontains?: string | undefined;
        fname_nslashes?: string | number | undefined;
        plugin_inst_id?: number | undefined;
        feed_id?: number | undefined;
        min_creation_date?: string | undefined;
        max_creation_date?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<AllFeedFileList>;
    /**
     * Get a file resource object given its id.
     *
     * @param {number} id - file id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedFile>} - JS Promise, resolves to a ``FeedFile`` object
     */
    getFile(id: number, timeout?: number | undefined): Promise<FeedFile>;
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
    getComputeResources(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        name?: string | undefined;
        name_exact?: string | undefined;
        description?: string | undefined;
        plugin_id?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<ComputeResourceList>;
    /**
     * Get a compute resource object given its id.
     *
     * @param {number} id - compute resource id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ComputeResource>} - JS Promise, resolves to a ``ComputeResource`` object
     */
    getComputeResource(id: number, timeout?: number | undefined): Promise<ComputeResource>;
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
    getPluginMetas(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        name?: string | undefined;
        name_exact?: string | undefined;
        title?: string | undefined;
        category?: string | undefined;
        type?: string | undefined;
        authors?: string | undefined;
        min_creation_date?: number | undefined;
        max_creation_date?: number | undefined;
        name_title_category?: string | undefined;
        name_authors_category?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<PluginMetaList>;
    /**
     * Get a plugin meta resource object given its id.
     *
     * @param {number} id - plugin meta id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginMeta>} - JS Promise, resolves to a ``PluginMeta`` object
     */
    getPluginMeta(id: number, timeout?: number | undefined): Promise<PluginMeta>;
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
    getPlugins(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        name?: string | undefined;
        name_exact?: string | undefined;
        version?: string | undefined;
        dock_image?: string | undefined;
        type?: string | undefined;
        category?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        min_creation_date?: string | undefined;
        max_creation_date?: string | undefined;
        name_title_category?: string | undefined;
        compute_resource_id?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<PluginList>;
    /**
     * Get a plugin resource object given its id.
     *
     * @param {number} id - plugin id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(id: number, timeout?: number | undefined): Promise<Plugin>;
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
     * @return {Promise<PluginAdmin>} - JS Promise, resolves to ``PluginAdmin`` object
     */
    adminUploadPlugin(data: {
        compute_names: string;
    }, pluginFileObj: {
        fname: Object;
    }, timeout?: number | undefined): Promise<PluginAdmin>;
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
     * @param {number} [searchParams.workflow_id] - match associated workflows's id exactly with this number
     * @param {number} [searchParams.root_id] - match root plugin instance's id exactly with this number
     * @param {number} [searchParams.plugin_id] - match associated plugin's id exactly with this number
     * @param {number} [searchParams.plugin_name] - match associated plugin's name containing this string
     * @param {number} [searchParams.plugin_name_exact] - match associated plugin's name exact with this string
     * @param {number} [searchParams.plugin_version] - match associated plugin's verion exactly with this string
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<AllPluginInstanceList>} - JS Promise, resolves to ``AllPluginInstanceList`` object
     */
    getPluginInstances(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        title?: string | undefined;
        status?: string | undefined;
        owner_username?: string | undefined;
        feed_id?: number | undefined;
        workflow_id?: number | undefined;
        root_id?: number | undefined;
        plugin_id?: number | undefined;
        plugin_name?: number | undefined;
        plugin_name_exact?: number | undefined;
        plugin_version?: number | undefined;
    } | undefined, timeout?: number | undefined): Promise<AllPluginInstanceList>;
    /**
     * Get a plugin instance resource object given its id.
     *
     * @param {number} id - plugin instance id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
     */
    getPluginInstance(id: number, timeout?: number | undefined): Promise<PluginInstance>;
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
    createPluginInstance(pluginId: number, data: {
        previous_id: number;
        title?: string | undefined;
        compute_resource_name?: string | undefined;
        cpu_limit?: string | undefined;
        memory_limit?: string | undefined;
        number_of_workers?: string | undefined;
        gpu_limit?: string | undefined;
    }, timeout?: number | undefined): Promise<PluginInstance>;
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
    createPluginInstanceSplit(pluginInstanceId: number, filter?: string | undefined, cr_name?: string | undefined, timeout?: number | undefined): Promise<PluginInstanceSplit>;
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
    getPipelines(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        name?: string | undefined;
        owner_username?: string | undefined;
        category?: string | undefined;
        description?: string | undefined;
        authors?: string | undefined;
        min_creation_date?: string | undefined;
        max_creation_date?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<PipelineList>;
    /**
     * Get a pipeline resource object given its id.
     *
     * @param {number} id - pipeline id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
     */
    getPipeline(id: number, timeout?: number | undefined): Promise<Pipeline>;
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
    createPipeline(data: {
        name: string;
        authors?: string | undefined;
        category?: string | undefined;
        description?: string | undefined;
        locked?: boolean | undefined;
        plugin_tree?: string | undefined;
        plugin_inst_id?: number | undefined;
    }, timeout?: number | undefined): Promise<Pipeline>;
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
    getPipelineInstances(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        title?: string | undefined;
        description?: string | undefined;
        pipeline_name?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<AllPipelineInstanceList>;
    /**
     * Get a pipeline instance resource object given its id.
     *
     * @param {number} id - pipeline instance id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineInstance>} - JS Promise, resolves to a ``PipelineInstance`` object
     */
    getPipelineInstance(id: number, timeout?: number | undefined): Promise<PipelineInstance>;
    /**
     * Create a new pipeline instance resource through the REST API.
     *
     * @param {number} pipelineId - pipeline id
     * @param {Object} data - request data object which is pipeline-specific
     * @param {number} data.previous_plugin_inst_id - id of the previous plugin instance
     * @param {string} [data.title] - pipeline instance title
     * @param {string} [data.description] - pipeline instance description
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineInstance>} - JS Promise, resolves to ``PipelineInstance`` object
     */
    createPipelineInstance(pipelineId: number, data: {
        previous_plugin_inst_id: number;
        title?: string | undefined;
        description?: string | undefined;
    }, timeout?: number | undefined): Promise<PipelineInstance>;
    /**
     * Get a paginated list of workflows from the REST API given query search
     * parameters. If no search parameters then get the default first page.
     *
     * @param {Object} [searchParams=null] - search parameters object
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [searchParams.id] - match workflow id exactly with this number
     * @param {string} [searchParams.owner_username] - match workflow's owner username exactly with this string
     * @param {string} [searchParams.pipeline_name] - match associated pipeline name containing this string
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<AllWorkflowList>} - JS Promise, resolves to ``AllWorkflowList`` object
     */
    getWorkflows(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        owner_username?: string | undefined;
        pipeline_name?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<AllWorkflowList>;
    /**
     * Get a workflow resource object given its id.
     *
     * @param {number} id - workflow id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Workflow>} - JS Promise, resolves to a ``Workflow`` object
     */
    getWorkflow(id: number, timeout?: number | undefined): Promise<Workflow>;
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
    computeWorkflowNodesInfo(pipelineDefaultParameters: Object[], includeAllDefaults?: boolean | undefined): Object[];
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
     * @return {Promise<Workflow>} - JS Promise, resolves to ``Workflow`` object
     */
    createWorkflow(pipelineId: number, data: {
        previous_plugin_inst_id: number;
        nodes_info: string;
    }, timeout?: number | undefined): Promise<Workflow>;
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
    getTags(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        name?: string | undefined;
        owner_username?: string | undefined;
        color?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<TagList>;
    /**
     * Get a tag resource object given its id.
     *
     * @param {number} id - tag id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
     */
    getTag(id: number, timeout?: number | undefined): Promise<Tag>;
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
    createTag(data: {
        color: string;
        name?: string | undefined;
    }, timeout?: number | undefined): Promise<Tag>;
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
    getUploadedFiles(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        fname?: string | undefined;
        fname_exact?: string | undefined;
        fname_icontains?: string | undefined;
        fname_nslashes?: string | number | undefined;
        owner_username?: string | undefined;
        min_creation_date?: string | undefined;
        max_creation_date?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<UploadedFileList>;
    /**
     * Get an uploaded file resource object given its id.
     *
     * @param {number} id - uploaded file id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<UploadedFile>} - JS Promise, resolves to an ``UploadedFile`` object
     */
    getUploadedFile(id: number, timeout?: number | undefined): Promise<UploadedFile>;
    /**
     * Upload a file and create a new uploaded file resource through the REST API.
     *
     * @param {Object} data - request data object
     * @param {string} data.upload_path - absolute path including file name where the file
     * will be uploaded on the storage service
     * @param {Object} uploadFileObj - custom file object
     * @param {Object} uploadFileObj.fname - file blob
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<UploadedFile>} - JS Promise, resolves to ``UploadedFile`` object
     */
    uploadFile(data: {
        upload_path: string;
    }, uploadFileObj: {
        fname: Object;
    }, timeout?: number | undefined): Promise<UploadedFile>;
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
     * @param {string|number} [searchParams.fname_nslashes] - match file's upload path containing this number of slashes
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
     * @param {string} [searchParams.pacs_identifier] - match file's PACS identifier exactly with this string
     * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
     * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACSFileList>} - JS Promise, resolves to a ``PACSFileList`` object
     */
    getPACSFiles(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        fname?: string | undefined;
        fname_exact?: string | undefined;
        fname_icontains?: string | undefined;
        fname_icontains_topdir_unique?: string | undefined;
        fname_nslashes?: string | number | undefined;
        PatientID?: string | undefined;
        PatientName?: string | undefined;
        PatientSex?: string | undefined;
        PatientAge?: number | undefined;
        min_PatientAge?: number | undefined;
        max_PatientAge?: number | undefined;
        PatientBirthDate?: string | undefined;
        StudyDate?: string | undefined;
        AccessionNumber?: string | undefined;
        ProtocolName?: string | undefined;
        StudyInstanceUID?: string | undefined;
        StudyDescription?: string | undefined;
        SeriesInstanceUID?: string | undefined;
        SeriesDescription?: string | undefined;
        pacs_identifier?: string | undefined;
        min_creation_date?: string | undefined;
        max_creation_date?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<PACSFileList>;
    /**
     * Get a PACS file resource object given its id.
     *
     * @param {number} id - PACS file id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACSFile>} - JS Promise, resolves to a ``PACSFile`` object
     */
    getPACSFile(id: number, timeout?: number | undefined): Promise<PACSFile>;
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
    getServiceFiles(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        id?: number | undefined;
        fname?: string | undefined;
        fname_exact?: string | undefined;
        fname_icontains?: string | undefined;
        fname_nslashes?: string | number | undefined;
        service_identifier?: string | undefined;
        service_id?: number | undefined;
        min_creation_date?: string | undefined;
        max_creation_date?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<ServiceFileList>;
    /**
     * Get a service file resource object given its id.
     *
     * @param {number} id - PACS file id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ServiceFile>} - JS Promise, resolves to a ``ServiceFile`` object
     */
    getServiceFile(id: number, timeout?: number | undefined): Promise<ServiceFile>;
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
    getFileBrowserPaths(searchParams?: {
        limit?: number | undefined;
        offset?: number | undefined;
        path?: string | undefined;
    } | undefined, timeout?: number | undefined): Promise<FileBrowserPathList>;
    /**
     * Get a file browser path resource object given its path.
     *
     * @param {string} path - file browser path
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserPath>} - JS Promise, resolves to a ``FileBrowserPath`` object
     */
    getFileBrowserPath(path: string, timeout?: number | undefined): Promise<FileBrowserPath>;
    /**
     * Get a user resource object for the currently authenticated user.
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout?: number | undefined): Promise<User>;
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
    _fetchRes(resUrlProp: string, ResClass: string, searchParams?: Object | undefined, timeout?: number | undefined): Promise<any>;
}
import ChrisInstance from "./chrisinstance";
import { FeedList } from "./feed";
import { PublicFeedList } from "./feed";
import { Feed } from "./feed";
import { Tagging } from "./tag";
import { AllFeedFileList } from "./feedfile";
import { FeedFile } from "./feedfile";
import { ComputeResourceList } from "./computeresource";
import { ComputeResource } from "./computeresource";
import { PluginMetaList } from "./pluginmeta";
import { PluginMeta } from "./pluginmeta";
import { PluginList } from "./plugin";
import { Plugin } from "./plugin";
import { PluginAdmin } from "./admin";
import { AllPluginInstanceList } from "./plugininstance";
import { PluginInstance } from "./plugininstance";
import { PluginInstanceSplit } from "./plugininstance";
import { PipelineList } from "./pipeline";
import { Pipeline } from "./pipeline";
import { AllPipelineInstanceList } from "./pipelineinstance";
import { PipelineInstance } from "./pipelineinstance";
import { AllWorkflowList } from "./workflow";
import { Workflow } from "./workflow";
import { TagList } from "./tag";
import { Tag } from "./tag";
import { UploadedFileList } from "./uploadedfile";
import { UploadedFile } from "./uploadedfile";
import { PACSFileList } from "./pacsfile";
import { PACSFile } from "./pacsfile";
import { ServiceFileList } from "./servicefile";
import { ServiceFile } from "./servicefile";
import { FileBrowserPathList } from "./filebrowser";
import { FileBrowserPath } from "./filebrowser";
import User from "./user";
