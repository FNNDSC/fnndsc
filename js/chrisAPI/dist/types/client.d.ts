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
    static createUser(usersUrl: string, username: string, password: string, email: string, timeout?: number): Promise<User>;
    /**
     * Fetch a user's login authorization token from the REST API.
     * @param {string} authUrl - url of the authorization service
     * @param {string} username - username
     * @param {string} password - password
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<string>} - JS Promise, resolves to a ``string`` value
     */
    static getAuthToken(authUrl: string, username: string, password: string, timeout?: number): Promise<string>;
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
        token?: string;
    });
    /** @type {string} */
    url: string;
    /** @type {Object} */
    auth: any;
    feedsUrl: string;
    publicFeedsUrl: string;
    chrisInstanceUrl: string;
    computeResourcesUrl: string;
    pluginMetasUrl: string;
    pluginsUrl: string;
    pluginInstancesUrl: string;
    pipelinesUrl: string;
    workflowsUrl: string;
    tagsUrl: string;
    pipelineSourceFilesUrl: string;
    userFilesUrl: string;
    pacsFilesUrl: string;
    pacsSeriesUrl: string;
    fileBrowserUrl: string;
    downloadTokensUrl: string;
    groupsUrl: string;
    userUrl: string;
    adminUrl: string;
    /**
     * Set the urls of the high level API resources.
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    setUrls(timeout?: number): Promise<any>;
    /**
     * Get the ChRIS instance resource object.
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ChrisInstance>} - JS Promise, resolves to a ``ChrisInstance`` object
     */
    getChrisInstance(timeout?: number): Promise<ChrisInstance>;
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
        limit?: number;
        offset?: number;
        id?: number;
        min_id?: number;
        max_id?: number;
        name?: string;
        name_exact?: string;
        name_startswith?: string;
        files_fname_icontains?: string;
        min_creation_date?: number;
        max_creation_date?: number;
    }, timeout?: number): Promise<FeedList>;
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
        limit?: number;
        offset?: number;
        id?: number;
        min_id?: number;
        max_id?: number;
        name?: string;
        name_exact?: string;
        name_startswith?: string;
        files_fname_icontains?: string;
        min_creation_date?: number;
        max_creation_date?: number;
    }, timeout?: number): Promise<PublicFeedList>;
    /**
     * Get a feed resource object given its id.
     *
     * @param {number} id - feed id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed|null>} - JS Promise, resolves to a ``Feed`` object or ``null``
     */
    getFeed(id: number, timeout?: number): Promise<Feed | null>;
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
        limit?: number;
        offset?: number;
        id?: number;
        name?: string;
        name_exact?: string;
        description?: string;
        plugin_id?: string;
    }, timeout?: number): Promise<ComputeResourceList>;
    /**
     * Get a compute resource object given its id.
     *
     * @param {number} id - compute resource id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ComputeResource|null>} - JS Promise, resolves to a ``ComputeResource`` object or ``null``
     */
    getComputeResource(id: number, timeout?: number): Promise<ComputeResource | null>;
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
        limit?: number;
        offset?: number;
        id?: number;
        name?: string;
        name_exact?: string;
        title?: string;
        category?: string;
        type?: string;
        authors?: string;
        min_creation_date?: number;
        max_creation_date?: number;
        name_title_category?: string;
        name_authors_category?: string;
    }, timeout?: number): Promise<PluginMetaList>;
    /**
     * Get a plugin meta resource object given its id.
     *
     * @param {number} id - plugin meta id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginMeta|null>} - JS Promise, resolves to a ``PluginMeta`` object or ``null``
     */
    getPluginMeta(id: number, timeout?: number): Promise<PluginMeta | null>;
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
        limit?: number;
        offset?: number;
        id?: number;
        name?: string;
        name_exact?: string;
        version?: string;
        dock_image?: string;
        type?: string;
        category?: string;
        title?: string;
        description?: string;
        min_creation_date?: string;
        max_creation_date?: string;
        name_title_category?: string;
        compute_resource_id?: number;
    }, timeout?: number): Promise<PluginList>;
    /**
     * Get a plugin resource object given its id.
     *
     * @param {number} id - plugin id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin|null>} - JS Promise, resolves to a ``Plugin`` object or ``null``
     */
    getPlugin(id: number, timeout?: number): Promise<Plugin | null>;
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
    adminUploadPlugin(data: {
        compute_names: string;
    }, pluginFileObj: {
        fname: any;
    }, timeout?: number): Promise<PluginAdmin>;
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
    getPluginInstances(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        root_id?: number;
        previous_id?: number;
        title?: string;
        status?: string;
        owner_username?: string;
        feed_id?: number;
        workflow_id?: number;
        plugin_id?: number;
        plugin_name?: number;
        plugin_name_exact?: number;
        plugin_version?: number;
        min_start_date?: string;
        max_start_date?: string;
        min_end_date?: string;
        max_end_date?: string;
    }, timeout?: number): Promise<AllPluginInstanceList>;
    /**
     * Get a plugin instance resource object given its id.
     *
     * @param {number} id - plugin instance id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PluginInstance|null>} - JS Promise, resolves to a ``PluginInstance`` object or ``null``
     */
    getPluginInstance(id: number, timeout?: number): Promise<PluginInstance | null>;
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
    createPluginInstance(pluginId: number, data: {
        previous_id: number;
        title?: string;
        compute_resource_name?: string;
        cpu_limit?: string;
        memory_limit?: string;
        number_of_workers?: string;
        gpu_limit?: string;
    }, timeout?: number): Promise<PluginInstance>;
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
    createPluginInstanceSplit(pluginInstanceId: number, filter?: string, cr_name?: string, timeout?: number): Promise<PluginInstanceSplit>;
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
        limit?: number;
        offset?: number;
        id?: number;
        name?: string;
        owner_username?: string;
        category?: string;
        description?: string;
        authors?: string;
        min_creation_date?: string;
        max_creation_date?: string;
    }, timeout?: number): Promise<PipelineList>;
    /**
     * Get a pipeline resource object given its id.
     *
     * @param {number} id - pipeline id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Pipeline|null>} - JS Promise, resolves to a ``Pipeline`` object or ``null``
     */
    getPipeline(id: number, timeout?: number): Promise<Pipeline | null>;
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
    createPipeline(data: {
        name: string;
        authors?: string;
        category?: string;
        description?: string;
        locked?: boolean;
        plugin_tree?: string;
        plugin_inst_id?: number;
    }, timeout?: number): Promise<Pipeline>;
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
    getWorkflows(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        title?: string;
        owner_username?: string;
        pipeline_name?: string;
    }, timeout?: number): Promise<AllWorkflowList>;
    /**
     * Get a workflow resource object given its id.
     *
     * @param {number} id - workflow id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Workflow>|null} - JS Promise, resolves to a ``Workflow`` object or ``null``
     */
    getWorkflow(id: number, timeout?: number): Promise<Workflow> | null;
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
    computeWorkflowNodesInfo(pipelineDefaultParameters: any[], includeAllDefaults?: boolean): any[];
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
    createWorkflow(pipelineId: number, data: {
        previous_plugin_inst_id: number;
        nodes_info: string;
    }, timeout?: number): Promise<Workflow>;
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
        limit?: number;
        offset?: number;
        id?: number;
        name?: string;
        owner_username?: string;
        color?: string;
    }, timeout?: number): Promise<TagList>;
    /**
     * Get a tag resource object given its id.
     *
     * @param {number} id - tag id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tag|null>} - JS Promise, resolves to a ``Tag`` object or ``null``
     */
    getTag(id: number, timeout?: number): Promise<Tag | null>;
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
    createTag(data: {
        color: string;
        name?: string;
    }, timeout?: number): Promise<Tag>;
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
   * @param {string} [searchParams.uploader_username] - match file's uploader username exactly with this string
   * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
   * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PipelineSourceFileList>} - JS Promise, resolves to a ``PipelineSourceFileList`` object
   */
    getPipelineSourceFiles(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        fname?: string;
        fname_exact?: string;
        fname_icontains?: string;
        uploader_username?: string;
        min_creation_date?: string;
        max_creation_date?: string;
    }, timeout?: number): Promise<PipelineSourceFileList>;
    /**
     * Get a pipeline source file resource object given its id.
     *
     * @param {number} id - pipeline source file id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PipelineSourceFile|null>} - JS Promise, resolves to a ``PipelineSourceFile`` object or ``null`
     */
    getPipelineSourceFile(id: number, timeout?: number): Promise<PipelineSourceFile | null>;
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
    uploadPipelineSourceFile(data: {
        type: string;
    }, uploadFileObj: {
        fname: any;
    }, timeout?: number): Promise<PipelineSourceFile>;
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
    getUserFiles(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        fname?: string;
        fname_exact?: string;
        fname_icontains?: string;
        fname_nslashes?: string | number;
        owner_username?: string;
        min_creation_date?: string;
        max_creation_date?: string;
    }, timeout?: number): Promise<UserFileList>;
    /**
     * Get a user file resource object given its id.
     *
     * @param {number} id - user file id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<UserFile|null>} - JS Promise, resolves to a ``UserFile`` object or ``null``
     */
    getUserFile(id: number, timeout?: number): Promise<UserFile | null>;
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
    uploadFile(data: {
        upload_path: string;
    }, uploadFileObj: {
        fname: any;
    }, timeout?: number): Promise<UserFile>;
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
    getPACSFiles(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        fname?: string;
        fname_exact?: string;
        fname_icontains?: string;
        fname_icontains_topdir_unique?: string;
        min_creation_date?: string;
        max_creation_date?: string;
    }, timeout?: number): Promise<PACSFileList>;
    /**
     * Get a PACS file resource object given its id.
     *
     * @param {number} id - PACS file id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACSFile|null>} - JS Promise, resolves to a ``PACSFile`` object or ``null`
     */
    getPACSFile(id: number, timeout?: number): Promise<PACSFile | null>;
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
    getPACSSeriesList(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        PatientID?: string;
        PatientName?: string;
        PatientSex?: string;
        PatientAge?: number;
        min_PatientAge?: number;
        max_PatientAge?: number;
        PatientBirthDate?: string;
        StudyDate?: string;
        AccessionNumber?: string;
        ProtocolName?: string;
        StudyInstanceUID?: string;
        StudyDescription?: string;
        SeriesInstanceUID?: string;
        SeriesDescription?: string;
        min_creation_date?: string;
        max_creation_date?: string;
        pacs_identifier?: string;
    }, timeout?: number): Promise<PACSSeriesList>;
    /**
     * Get a PACS series resource object given its id.
     *
     * @param {number} id - PACS series id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACSSeries|null>} - JS Promise, resolves to a ``PACSSeries`` object or ``null``
     */
    getPACSSeries(id: number, timeout?: number): Promise<PACSSeries | null>;
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
    getFileBrowserFolders(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        path?: string;
    }, timeout?: number): Promise<FileBrowserFolderList>;
    /**
     * Get a file browser folder resource object given its id.
     *
     * @param {number} id - file browser folder id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder|null>} - JS Promise, resolves to a ``FileBrowserFolder`` object or ``null``
     */
    getFileBrowserFolder(id: number, timeout?: number): Promise<FileBrowserFolder | null>;
    /**
     * Get a file browser folder resource object given its path.
     *
     * @param {string} path - file browser folder path
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder|null>} - JS Promise, resolves to a ``FileBrowserFolder`` object or ``null``
     */
    getFileBrowserFolderByPath(path: string, timeout?: number): Promise<FileBrowserFolder | null>;
    /**
     * Create a new file browser folder resource through the REST API.
     *
     * @param {Object} data - request data object
     * @param {string} data.path - folder path
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
     */
    createFileBrowserFolder(data: {
        path: string;
    }, timeout?: number): Promise<FileBrowserFolder>;
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
    getDownloadTokens(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
    }, timeout?: number): Promise<DownloadTokenList>;
    /**
     * Get a download token resource object given its id.
     *
     * @param {number} id - file download token id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<DownloadToken|null>} - JS Promise, resolves to a ``DownloadToken`` object or ``null``
     */
    getDownloadToken(id: number, timeout?: number): Promise<DownloadToken | null>;
    /**
     * Create a new file download token resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<DownloadToken>} - JS Promise, resolves to a ``DownloadToken`` object
     */
    createDownloadToken(timeout?: number): Promise<DownloadToken>;
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
    getGroups(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        name?: string;
        name_icontains?: string;
    }, timeout?: number): Promise<GroupList>;
    /**
     * Get a group resource object given its id.
     *
     * @param {number} id - group id
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Group|null>} - JS Promise, resolves to a ``Group`` object or ``null``
     */
    getGroup(id: number, timeout?: number): Promise<Group | null>;
    /**
     * Create a new group resource through the REST API.
     *
     * @param {Object} data - request data object
     * @param {string} data.name - group name
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Group>} - JS Promise, resolves to a ``Group`` object
     */
    adminCreateGroup(data: {
        name: string;
    }, timeout?: number): Promise<Group>;
    /**
     * Get a user resource object for the currently authenticated user.
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout?: number): Promise<User>;
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
    _fetchRes(resUrlProp: string, ResClass: string, searchParams?: any, timeout?: number): Promise<any>;
}
import ChrisInstance from "./chrisinstance";
import { FeedList } from "./feed";
import { PublicFeedList } from "./feed";
import { Feed } from "./feed";
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
import { AllWorkflowList } from "./workflow";
import { Workflow } from "./workflow";
import { TagList } from "./tag";
import { Tag } from "./tag";
import { PipelineSourceFileList } from "./pipeline";
import { PipelineSourceFile } from "./pipeline";
import { UserFileList } from "./userfile";
import { UserFile } from "./userfile";
import { PACSFileList } from "./pacsfile";
import { PACSFile } from "./pacsfile";
import { PACSSeriesList } from "./pacsfile";
import { PACSSeries } from "./pacsfile";
import { FileBrowserFolderList } from "./filebrowser";
import { FileBrowserFolder } from "./filebrowser";
import { DownloadTokenList } from "./downloadtoken";
import { DownloadToken } from "./downloadtoken";
import { GroupList } from "./group";
import { Group } from "./group";
import User from "./user";
