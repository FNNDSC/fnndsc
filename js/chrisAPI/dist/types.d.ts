declare module "cj" {
    /**
     * Collection+Json utility object.
     */
    export default class Collection {
        /**
         * Get the error message from the collection object.
         *
         * @param {Object} collection - Collection+Json collection object
         *
         * @return {string} - error message
         */
        static getErrorMessage(collection: any): string;
        /**
         * Get the list of urls for a link relation from a collection or item object.
         *
         * @param {Object} obj - Collection+Json collection or item object
         * @param {string} relationName - name of the link relation
         *
         * @return {string[]} - list of urls
         */
        static getLinkRelationUrls(obj: any, relationName: string): string[];
        /**
         * Get an item's data (descriptors).
         *
         * @param {Object} item - Collection+Json item object
         *
         * @return {Object} - object whose properties and values are the item's descriptor names and values respectively
         */
        static getItemDescriptors(item: any): any;
        /**
         * Get the url of the representation given by a collection obj.
         *
         * @param {Object} collection - Collection+Json collection object
         *
         * @return {string} - url of the resource representation
         */
        static getUrl(collection: any): string;
        /**
         * Get the total number of items from a collection object.
         *
         * @param {Object} collection - Collection+Json collection object
         *
         * @return {number} - total number of items or -1 if the collection objects
         * doesn't contain that information
         */
        static getTotalNumberOfItems(collection: any): number;
        /**
         * Get the list of descriptor names within a collection's template object.
         *
         * @param {Object} template - Collection+Json template object
         *
         * @return {string[]} - list of descriptor names
         */
        static getTemplateDescriptorNames(template: any): string[];
        /**
         * Get the list of descriptor names within a Collection+Json query array.
         *
         * @param {Object[]} queryArr - Collection+Json query array
         *
         * @return {string[]} - list of query parameter names
         */
        static getQueryParameters(queryArr: any[]): string[];
        /**
         * Make an emmpty Collection+Json object.
         *
         * @return {Object} - template object
         */
        static createCollectionObj(): any;
        /**
         * Make a Collection+Json template object from a regular object whose properties are
         * the item descriptors.
         *
         * @param {Object} descriptorsObj - item descriptors object
         *
         * @return {Object} - template object
         */
        static makeTemplate(descriptorsObj: any): any;
    }
}
declare module "exception" {
    /**
     * Custom exception object.
     *
     * @module exception
     */
    export default class RequestException extends Error {
        constructor(...args: any[]);
        /** @type {Object} */
        request: any;
        /** @type {Object} */
        response: any;
    }
}
declare module "request" {
    /**
     * Http request object.
     */
    export default class Request {
        /**
         * Internal method to make an axios request.
         *
         * @param {AxiosRequestConfig} config - axios configuration object
         *
         * @return {Promise<AxiosResponse>} - JS Promise, resolves to an ``axios reponse`` object
         */
        static _callAxios(config: AxiosRequestConfig): Promise<AxiosResponse>;
        /**
         * Internal method to handle errors produced by HTTP requests.
         *
         * @param {Object} error - axios error object
         *
         * @throws {RequestException} throw error
         */
        static _handleRequestError(error: any): void;
        /**
         * Helper method to run an asynchronous task defined by a task generator function.
         *
         * @param {function*()} taskGenerator - generator function
         */
        static runAsyncTask(taskGenerator: any): void;
        /**
         * Constructor
         *
         * @param {Object} auth - authentication object
         * @param {string} auth.token - authentication token
         * @param {string} contentType - request content type
         * @param {number} [timeout=30000] - request timeout
         */
        constructor(auth: {
            token: string;
        }, contentType: string, timeout?: number);
        /** @type {Object} */
        auth: any;
        /** @type {string} */
        contentType: string;
        /** @type {number} */
        timeout: number;
        /**
         * Perform a GET request.
         *
         * @param {string} url - url of the resource
         * @param {?Object} params - search parameters
         *
         * @return {Promise<AxiosResponse>} - JS Promise, resolves to an ``axios reponse`` object
         */
        get(url: string, params?: any | null): Promise<AxiosResponse>;
        /**
         * Perform a POST request.
         *
         * @param {string} url - url of the resource
         * @param {Object} data - JSON data object
         * @param {?Object} uploadFileObj - custom object with a property with the same name as
         * the API descriptor corresponding to the file and whose value is the file blob
         *
         * @return {Promise<AxiosResponse>} - JS Promise, resolves to an ``axios reponse`` object
         */
        post(url: string, data: any, uploadFileObj?: any | null): Promise<AxiosResponse>;
        /**
         * Perform a PUT request.
         *
         * @param {string} url - url of the resource
         * @param {Object} data - JSON data object
         * @param {?Object} uploadFileObj - custom object with a property with the same name as
         * the API descriptor corresponding to the file and whose value is the file blob
         *
         * @return {Promise<AxiosResponse>} - JS Promise, resolves to an ``axios reponse`` object
         */
        put(url: string, data: any, uploadFileObj?: any | null): Promise<AxiosResponse>;
        /**
         * Perform a DELETE request.
         *
         * @param {string} url - url of the resource
         *
         * @return {Promise<AxiosResponse>} - JS Promise, resolves to an ``axios reponse`` object
         */
        delete(url: string): Promise<AxiosResponse>;
        /**
         * Internal method to make either a POST or PUT request.
         *
         * @param {string} requestMethod - either 'post' or 'put'
         * @param {string} url - url of the resource
         * @param {Object} data - JSON data object
         * @param {?Object} uploadFileObj - custom object with a property with the same name as
         * the API descriptor corresponding to the file and whose value is the file blob
         *
         * @return {Promise<AxiosResponse>} - JS Promise, resolves to an ``axios reponse`` object
         */
        _postOrPut(requestMethod: string, url: string, data: any, uploadFileObj?: any | null): Promise<AxiosResponse>;
        /**
         * Internal method to create a config file for axios.
         *
         * @param {string} url - url of the resource
         * @param {string} method - request verb
         *
         * @return {AxiosRequestConfig} - axios configuration object
         */
        _getConfig(url: string, method: string): AxiosRequestConfig;
    }
    import { AxiosResponse } from "axios";
    import { AxiosRequestConfig } from "axios";
}
declare module "resource" {
    /**
     * API abstract resource class.
     */
    export class Resource {
        /**
         * Helper method to make a deep copy clone of the passed object resource.
         *
         * @param {Object} obj - object to be cloned
         *
         * @return {*} - clone object
         */
        static cloneObj(obj: any): any;
        /**
         * Constructor
         *
         * @param {string} resourceUrl - url of the resource
         * @param {Object} auth - authentication object
         * @param {string} auth.token - authentication token
         */
        constructor(resourceUrl: string, auth: {
            token: string;
        });
        /** @type {string} */
        url: string;
        /** @type {Object} */
        auth: any;
        /** @type {string} */
        contentType: string;
        /** @type {?Object} */
        collection: any | null;
        /**
         * Return true if the resource object contains any data.
         *
         * @type {boolean}
         */
        get isEmpty(): boolean;
        /**
         * Make a deep copy clone of this object resource.
         *
         * @return {Resource} - clone object
         */
        clone(): Resource;
    }
    /**
     * API abstract item resource class.
     */
    export class ItemResource extends Resource {
        /**
         * Fetch this item resource from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        get(timeout?: number): Promise<ItemResource>;
        /**
         * Get the item's data object (REST API descriptors).
         *
         * @type {?Object}
         */
        get data(): any;
        /**
         * Get an array of parameter names that can be used as properties of the data
         * object in PUT requests.
         *
         * @return {?string[]} - array of PUT data property name or null if this list
         * resource's data has not been fetched from the API yet or it doesn't support
         * PUT requests.
         */
        getPUTParameters(): string[] | null;
        /**
         * Internal method to fetch a related resource from the REST API that is referenced
         * by a link relation within the item object.
         *
         * @param {string} linkRelation
         * @param {Object} ResourceClass
         * @param {Object} [searchParams=null] - search parameters object which is resource-specific
         * @param {number} [searchParams.limit] - page limit
         * @param {number} [searchParams.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         * @return {Promise<ResourceClass>} - JS Promise, resolves to a ``ResourceClass`` object
         * @throws {RequestException} throw error if this item resource has not yet been
         * fetched from the REST API
         * @throws {RequestException} throw error when the link relation is not found
         */
        _getResource(linkRelation: string, ResourceClass: any, searchParams?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<any>;
        /**
         * Internal helper method to make a PUT request to this item resource through
         * the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {?Object} uploadFileObj - custom file object
         * @param {Object} uploadFileObj.fname - file blob
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        _put(data: any, uploadFileObj: any | null, timeout?: number): Promise<ItemResource>;
        /**
         * Internal helper method to make a DELETE request to this item resource through
         * the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise} - JS Promise
         */
        _delete(timeout?: number): Promise<any>;
    }
    /**
     * API abstract list resource class.
     */
    export class ListResource extends Resource {
        /** @type {string} */
        queryUrl: string;
        /** @type {?Object} */
        searchParams: any | null;
        /** @type {Object} */
        itemClass: any;
        /**
         * Fetch this list resource from the REST API based on search parameters. If
         * no search parameters then get the default first page.
         *
         * @param {Object} [searchParams=null] - search parameters object which is
         * resource-specific, the ``getSearchParameters`` method can be used to get a list
         * of possible search parameters
         * @param {number} [searchParams.limit] - page limit
         * @param {number} [searchParams.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        get(searchParams?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<ListResource>;
        /**
         * Get an array of search parameter names that can be used as properties of the
         * ``searchParams`` argument to the ``get`` method.
         *
         * @return {?string[]} - array of search parameter names or null if this list
         * resource's data has not been fetched from the API yet.
         */
        getSearchParameters(): string[] | null;
        /**
         * Get an item resource object given its id from the list of items in this
         * list resource object.
         *
         * @param {number} id - item id
         *
         * @return {Object} - an instance of ``this.itemClass``
         */
        getItem(id: number): any;
        /**
         * Get an array of item resource objects corresponding to the items in this
         * list resource object.
         *
         * @return {?Object[]}
         */
        getItems(): any[] | null;
        /**
         * Get the list of item data objects (REST API descriptors).
         *
         * @type {?Object[]}
         */
        get data(): any[];
        /**
         * Get the total count of items of the entire collection across pages in the
         * paginated REST API. Return -1 if no data has been fetched or the total
         * number of items info is not available from the fetched data.
         *
         * @type {number}
         */
        get totalCount(): number;
        /**
         * Return true if the list resource object has a next list page in the
         * paginated REST API.
         *
         * @type {boolean}
         */
        get hasNextPage(): boolean;
        /**
         * Return true if the list resource object has a previous list page in the
         * paginated REST API.
         *
         * @type {boolean}
         */
        get hasPreviousPage(): boolean;
        /**
         * Get an array of parameter names that can be used as properties of the data
         * object in POST requests.
         *
         * @return {?string[]} - array of POST data properties or null if this list
         * resource's data has not been fetched from the API yet or it doesn't support
         * POST requests.
         */
        getPOSTParameters(): string[] | null;
        /**
         * Internal method to fetch a related resource from the REST API that is
         * referenced by a link relation within this list resource's collection object.
         *
         * @param {string} linkRelation
         * @param {Object} ResourceClass
         * @param {Object} [searchParams=null] - search parameters object which is resource-specific
         * @param {number} [searchParams.limit] - page limit
         * @param {number} [searchParams.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<ResourceClass>} - JS Promise, resolves to a ``ResourceClass`` object
         * @throws {RequestException} throw error if this list resource has not yet
         * been fetched from the REST API
         * @throws {RequestException} throw error when the link relation is not found
         */
        _getResource(linkRelation: string, ResourceClass: any, searchParams?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<any>;
        /**
         * Internal helper method to make a POST request to this list resource through
         * the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {?Object} uploadFileObj - custom file object
         * @param {Object} uploadFileObj.fname - file blob
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        _post(data: any, uploadFileObj: any | null, timeout?: number): Promise<ListResource>;
    }
}
declare module "chrisinstance" {
    /**
     * ChRIS instance item resource object uniquely representing a ChRIS instance.
     */
    export default class ChrisInstance extends ItemResource {
    }
    import { ItemResource } from "resource";
}
declare module "user" {
    /**
     * User item resource object representing a user of the system.
     */
    export default class User extends ItemResource {
        /**
         * Make a PUT request to modify this user item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} data.password - user password
         * @param {string} data.email - user email
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        put(data: {
            password: string;
            email: string;
        }, timeout?: number): Promise<User>;
    }
    import { ItemResource } from "resource";
}
declare module "pluginparameter" {
    /**
     * Plugin parameter item resource object representing a plugin parameter.
     */
    export class PluginParameter extends ItemResource {
        /**
         * Fetch the plugin associated to this parameter item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
         */
        getPlugin(timeout?: number): Promise<Plugin>;
    }
    /**
     * Plugin parameter list resource object representing a list of plugin parameters.
     */
    export class PluginParameterList extends ListResource {
        /**
         * Fetch the plugin associated to this list of parameters from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
         */
        getPlugin(timeout?: number): Promise<Plugin>;
    }
    import { ItemResource } from "resource";
    import { Plugin } from "plugin";
    import { ListResource } from "resource";
}
declare module "feedfile" {
    /**
     * Feed file item resource object representing a file written to a feed.
     */
    export class FeedFile extends ItemResource {
        /**
         * Fetch the file blob associated to this file item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
         * @throws {RequestException} throw error if this item resource has not yet been
         * fetched from the REST API
         */
        getFileBlob(timeout?: number): Promise<Blob>;
        /**
         * Fetch the plugin instance that created this file item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
         */
        getPluginInstance(timeout?: number): Promise<PluginInstance>;
    }
    /**
     * Feed file list resource object representing a list of files written to a feed.
     */
    export class FeedFileList extends ListResource {
        /**
         * Fetch the feed associated to this file list from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(timeout?: number): Promise<Feed>;
    }
    /**
     * Feed file list resource object representing a list of all files written to
     * any user-owned feed.
     */
    export class AllFeedFileList extends ListResource {
    }
    /**
     * Plugin instance file list resource object representing a list of files written by
     * a plugin instance.
     */
    export class PluginInstanceFileList extends ListResource {
        /**
         * Fetch the feed associated to this file list from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(timeout?: number): Promise<Feed>;
        /**
         * Fetch the plugin instance associated to this file list from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
         */
        getPluginInstance(timeout?: number): Promise<PluginInstance>;
    }
    import { ItemResource } from "resource";
    import { PluginInstance } from "plugininstance";
    import { ListResource } from "resource";
    import { Feed } from "feed";
}
declare module "pipeline" {
    /**
     * Pipeline item resource object representing a pipeline.
     */
    export class Pipeline extends ItemResource {
        /**
         * Fetch a list of plugins associated to this pipeline from the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PipelinePluginList>} - JS Promise, resolves to a ``PipelinePluginList`` object
         */
        getPlugins(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PipelinePluginList>;
        /**
         * Fetch a list of plugin pipings associated to this pipeline from the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PipelinePluginPipingList>} - JS Promise, resolves to a ``PipelinePluginPipingList`` object
         */
        getPluginPipings(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PipelinePluginPipingList>;
        /**
         * Fetch a list of plugin piping default parameter values for the plugin
         * pipings composing the pipeline from the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PipelinePipingDefaultParameterList>} - JS Promise, resolves to a ``PipelinePipingDefaultParameterList`` object
         */
        getDefaultParameters(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PipelinePipingDefaultParameterList>;
        /**
         * Fetch a list of pipeline instances associated to this pipeline from the
         * REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PipelineInstanceList>} - JS Promise, resolves to a ``PipelineInstanceList`` object
         */
        getPipelineInstances(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PipelineInstanceList>;
        /**
         * Make a PUT request to modify this pipeline resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.name] - pipeline name
         * @param {string} [data.authors] - pipeline authors
         * @param {string} [data.category] - pipeline category
         * @param {string} [data.description] - pipeline description
         * @param {boolean} [data.locked] - pipeline lock status
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        put(data: {
            name?: string;
            authors?: string;
            category?: string;
            description?: string;
            locked?: boolean;
        }, timeout?: number): Promise<Pipeline>;
        /**
         * Make a DELETE request to delete this pipeline resource through the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise} - JS Promise
         */
        delete(timeout?: number): Promise<any>;
    }
    /**
     * Pipeline list resource object representing a list of pipelines.
     */
    export class PipelineList extends ListResource {
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
         * Make a POST request to this pipeline list resource to create a new pipeline
         * item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} data.name - pipeline name
         * @param {string} [data.authors] - pipeline authors
         * @param {string} [data.category] - pipeline category
         * @param {string} [data.description] - pipeline description
         * @param {boolean} [data.locked=true] - pipeline status
         * @param {string} [data.plugin_tree] - JSON string containing a plugin tree list
         * @param {number} [data.plugin_inst_id] - plugin instance id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: {
            name: string;
            authors?: string;
            category?: string;
            description?: string;
            locked?: boolean;
            plugin_tree?: string;
            plugin_inst_id?: number;
        }, timeout?: number): Promise<PipelineList>;
    }
    /**
     * Plugin piping item resource object representing a plugin piping within
     * a pipeline.
     */
    export class PluginPiping extends ItemResource {
        /**
         * Fetch the parent plugin piping within the corresponding pipeline from the
         * REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginPiping|null>} - JS Promise, resolves to a ``PluginPiping`` object or ``null``
         */
        getPreviousPluginPiping(timeout?: number): Promise<PluginPiping | null>;
        /**
         * Fetch the corresponding plugin for this plugin piping from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
         */
        getPlugin(timeout?: number): Promise<Plugin>;
        /**
         * Fetch the corresponding pipeline for this plugin piping from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
         */
        getPipeline(timeout?: number): Promise<Pipeline>;
    }
    /**
     * Item resource object for a plugin piping defaul parameter representing a
     * default value for a plugin parameter associated with this plugin piping.
     */
    export class PipingDefaultParameter extends ItemResource {
        /**
         * Fetch the corresponding plugin piping for this plugin piping default
         * parameter from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginPiping>} - JS Promise, resolves to a ``PluginPiping`` object
         */
        getPluginPiping(timeout?: number): Promise<PluginPiping>;
        /**
         * Fetch the corresponding plugin parameter for this plugin piping default
         * parameter from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginParameter>} - JS Promise, resolves to a ``PluginParameter`` object
         */
        getPluginParameter(timeout?: number): Promise<PluginParameter>;
    }
    /**
     * Pipeline-specific plugin list resource object representing a list of plugins
     * composing the pipeline.
     */
    export class PipelinePluginList extends ListResource {
    }
    /**
     * Pipeline-specific plugin piping list resource object representing a list of
     * plugin pipings composing the pipeline.
     */
    export class PipelinePluginPipingList extends ListResource {
    }
    /**
     * List resource object representing a pipeline-specific list of plugin piping
     * default parameter values for the plugin pipings composing the pipeline.
     */
    export class PipelinePipingDefaultParameterList extends ListResource {
    }
    import { ItemResource } from "resource";
    import { PipelineInstanceList } from "pipelineinstance";
    import { ListResource } from "resource";
    import { PluginList } from "plugin";
    import { Plugin } from "plugin";
    import { PluginParameter } from "pluginparameter";
}
declare module "pipelineinstance" {
    /**
     * Pipeline instance item resource object representing a pipeline instance.
     */
    export class PipelineInstance extends ItemResource {
        /**
         * Fetch the pipeline associated to this pipeline instance from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
         */
        getPipeline(timeout?: number): Promise<Pipeline>;
        /**
         * Fetch a list of plugin instances associated to this pipeline instance from
         * the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PipelineInstancePluginInstanceList>} - JS Promise, resolves to a ``PipelineInstancePluginInstanceList`` object
         */
        getPluginInstances(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PipelineInstancePluginInstanceList>;
        /**
         * Make a PUT request to modify this pipeline instance resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.title] - title of the pipeline instance
         * @param {string} [data.description] - pipeline instance description
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        put(data: {
            title?: string;
            description?: string;
        }, timeout?: number): Promise<PipelineInstance>;
        /**
         * Make a DELETE request to delete this pipeline instance resource through the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise} - JS Promise
         */
        delete(timeout?: number): Promise<any>;
    }
    /**
     * Pipeline instance list resource object representing a list of pipeline-specific
     * instances.
     */
    export class PipelineInstanceList extends ListResource {
        /**
         * Make a POST request to this pipeline instance list resource to create a new
         * pipeline instance item resource through the REST API.
         *
         * @param {Object} data - request JSON data object which is pipeline-specific and it's
         * properties can be determined by calling the ``getPOSTParameters`` method on this
         * resource object
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: any, timeout?: number): Promise<PipelineInstanceList>;
    }
    /**
     * Pipeline instance list resource object representing a list of all pipeline
     * instances.
     */
    export class AllPipelineInstanceList extends ListResource {
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
    }
    import { ItemResource } from "resource";
    import { Pipeline } from "pipeline";
    import { PipelineInstancePluginInstanceList } from "plugininstance";
    import { ListResource } from "resource";
    import { PipelineList } from "pipeline";
}
declare module "plugininstance" {
    /**
     * Plugin instance item resource object representing a plugin instance.
     */
    export class PluginInstance extends ItemResource {
        /**
         * Fetch the feed created by this plugin instance from the REST API
         * (only for fs plugins, 'ds' plugins pass null to the resultant Promise).
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed|null>} - JS Promise, resolves to a ``Feed`` object or ``null``
         */
        getFeed(timeout?: number): Promise<Feed | null>;
        /**
         * Fetch the plugin associated to this plugin instance item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
         */
        getPlugin(timeout?: number): Promise<Plugin>;
        /**
         * Fetch the compute resource associated to this plugin instance item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<ComputeResource>} - JS Promise, resolves to a ``ComputeResource`` object
         */
        getComputeResource(timeout?: number): Promise<ComputeResource>;
        /**
         * Fetch the parent plugin instance of this plugin instance from the REST API
         * (only for 'ds' plugins, 'fs' plugins pass null to the resultant Promise).
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstance|null>} - JS Promise, resolves to a ``PluginInstance`` object or ``null``
         */
        getPreviousPluginInstance(timeout?: number): Promise<PluginInstance | null>;
        /**
         * Fetch the pipeline instance (if any) that created this plugin instance from
         * the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PipelineInstance|null>} - JS Promise, resolves to a ``PipelineInstance`` object or ``null``
         */
        getPipelineInstance(timeout?: number): Promise<PipelineInstance | null>;
        /**
         * Fetch a list of plugin instances that are descendents of this plugin instance from the
         * REST API.
         *
         * @param {Object} [params=null] - page parameters
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstanceDescendantList>} - JS Promise, resolves to a ``PluginInstanceDescendantList`` object
         */
        getDescendantPluginInstances(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PluginInstanceDescendantList>;
        /**
         * Fetch a list of plugin instance parameters associated to this plugin instance from
         * the REST API.
         *
         * @param {Object} [params=null] - page parameters
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstanceParameterList>} - JS Promise, resolves to a ``PluginInstanceParameterList`` object
         */
        getParameters(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PluginInstanceParameterList>;
        /**
         * Fetch a list of files created by this plugin instance from the REST API.
         *
         * @param {Object} [params=null] - page parameters
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstanceFileList>} - JS Promise, resolves to a ``PluginInstanceFileList`` object
         */
        getFiles(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PluginInstanceFileList>;
        /**
         * Fetch a list of output directory splits applied to this plugin instance from the
         * REST API.
         *
         * @param {Object} [params=null] - page parameters
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstanceSplitList>} - JS Promise, resolves to a ``PluginInstanceSplitList`` object
         */
        getSplits(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PluginInstanceSplitList>;
        /**
         * Make a PUT request to modify this plugin instance resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.title] - title of the plugin instance
         * @param {string} [data.status] - execution status of the plugin instance (eg. `cancelled`)
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        put(data: {
            title?: string;
            status?: string;
        }, timeout?: number): Promise<PluginInstance>;
        /**
         * Make a DELETE request to delete this plugin instance resource through the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise} - JS Promise
         */
        delete(timeout?: number): Promise<any>;
    }
    /**
     * Plugin instance list resource object representing a list of plugin-specific
     * instances.
     */
    export class PluginInstanceList extends ListResource {
        /**
         * Fetch the plugin associated to this plugin instance list from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
         */
        getPlugin(timeout?: number): Promise<Plugin>;
        /**
         * Make a POST request to this plugin instance list resource to create a new plugin
         * instance item resource through the REST API.
         *
         * @param {Object} data - request JSON data object which is plugin-specific and it's
         * properties can be determined by calling the ``getPOSTParameters`` method on this
         * resource object
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: any, timeout?: number): Promise<PluginInstanceList>;
    }
    /**
     * Plugin instance list resource object representing a list of all plugin
     * instances.
     */
    export class AllPluginInstanceList extends ListResource {
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
    }
    /**
     * Feed-specific plugin instance list resource object representing a list of plugin
     * instances associated to an specific feed.
     */
    export class FeedPluginInstanceList extends ListResource {
        /**
         * Fetch the feed associated to this feed-specific list of plugin instances from
         * the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(timeout?: number): Promise<Feed>;
    }
    /**
     * Pipeline instance-specific plugin instance list resource object representing
     * a list of plugin instances associated to an specific pipeline instance.
     */
    export class PipelineInstancePluginInstanceList extends ListResource {
    }
    /**
     * Plugin instance descendant list resource object. This is a list of all plugin
     * instances that have this plugin instance as an ancestor in a pipeline tree.
     */
    export class PluginInstanceDescendantList extends ListResource {
    }
    /**
     * Plugin instance split item resource object representing an output directory
     * split that has been applied to a plugin instance.
     */
    export class PluginInstanceSplit extends ItemResource {
        /**
         * Fetch the plugin instance associated to this split item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
         */
        getPluginInstance(timeout?: number): Promise<PluginInstance>;
    }
    /**
     * Plugin instance split list resource object. This is a list of all output
     * directory splits that have been applied to a plugin instance.
     */
    export class PluginInstanceSplitList extends ListResource {
        /**
         * Fetch the plugin instance associated to this split list item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
         */
        getPluginInstance(timeout?: number): Promise<PluginInstance>;
        /**
         * Make a POST request to this plugin instance split list resource to create a
         * new plugin instance split item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.filter] - A comma-separated list of regular expressions
         * @param {string} [data.compute_resource_name] - remote compute resource name
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: {
            filter?: string;
            compute_resource_name?: string;
        }, timeout?: number): Promise<PluginInstanceSplitList>;
    }
    /**
     * Plugin instance parameter item resource object representing a parameter that
     * the plugin instance was run with.
     */
    export class PluginInstanceParameter extends ItemResource {
        /**
         * Fetch the plugin instance associated to this parameter item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
         */
        getPluginInstance(timeout?: number): Promise<PluginInstance>;
        /**
         * Fetch the plugin parameter definition associated to this plugin instance item
         * from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginParameter>} - JS Promise, resolves to a ``PluginParameter`` object
         */
        getPluginParameter(timeout?: number): Promise<PluginParameter>;
    }
    /**
     * Plugin instance parameter list resource object representing a list of parameters that
     * the plugin instance was run with.
     */
    export class PluginInstanceParameterList extends ListResource {
    }
    import { ItemResource } from "resource";
    import { Feed } from "feed";
    import { Plugin } from "plugin";
    import { ComputeResource } from "computeresource";
    import { PipelineInstance } from "pipelineinstance";
    import { PluginInstanceFileList } from "feedfile";
    import { ListResource } from "resource";
    import { PluginList } from "plugin";
    import { PluginParameter } from "pluginparameter";
}
declare module "pluginmeta" {
    /**
     * Plugin meta item resource object representing a plugin meta.
     */
    export class PluginMeta extends ItemResource {
        /**
         * Constructor
         *
         * @param {string} url - url of the resource
         * @param {Object} [auth=null] - authentication object
         * @param {string} [auth.token] - authentication token
         */
        constructor(url: string, auth?: {
            token?: string;
        });
        /**
         * Fetch a list of plugins associated to this plugin meta from the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginMetaPluginList>} - JS Promise, resolves to a ``PluginMetaPluginList`` object
         */
        getPlugins(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PluginMetaPluginList>;
    }
    /**
     * Plugin meta list resource object representing a list of plugin metas.
     */
    export class PluginMetaList extends ListResource {
        /**
         * Constructor
         *
         * @param {string} url - url of the resource
         * @param {Object} [auth=null] - authentication object
         * @param {string} [auth.token] - authentication token
         */
        constructor(url: string, auth?: {
            token?: string;
        });
        /**
         * Fetch a list of plugins from the REST API.
         *
         * @param {Object} [searchParams=null] - search parameters object which is
         * resource-specific, the ``PluginList.getSearchParameters`` method
         * can be used to get a list of possible search parameters
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
         * Fetch a list of feeds from the REST API.
         *
         * @param {Object} [searchParams=null] - search parameters object which is
         * resource-specific, the ``FeedList.getSearchParameters`` method
         * can be used to get a list of possible search parameters
         * @param {number} [searchParams.limit] - page limit
         * @param {number} [searchParams.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<FeedList>} - JS Promise, resolves to a ``FeedList`` object
         */
        getFeeds(searchParams?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<FeedList>;
    }
    import { ItemResource } from "resource";
    import { PluginMetaPluginList } from "plugin";
    import { ListResource } from "resource";
    import { PluginList } from "plugin";
    import { FeedList } from "feed";
}
declare module "plugin" {
    /**
     * Plugin item resource object representing a plugin.
     */
    export class Plugin extends ItemResource {
        /**
         * Fetch a list of plugin parameters associated to this plugin from the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginParameterList>} - JS Promise, resolves to a ``PluginParameterList`` object
         */
        getPluginParameters(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PluginParameterList>;
        /**
         * Fetch a list of compute resources registered with this plugin from the REST
         * API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginComputeResourceList>} - JS Promise, resolves to a ``PluginComputeResourceList`` object
         */
        getPluginComputeResources(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PluginComputeResourceList>;
        /**
         * Fetch a list of plugin instances associated to this plugin from the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstanceList>} - JS Promise, resolves to a ``PluginInstanceList`` object
         */
        getPluginInstances(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<PluginInstanceList>;
    }
    /**
     * Plugin list resource object representing a list of plugins.
     */
    export class PluginList extends ListResource {
        /**
         * Fetch a list of feeds from the REST API.
         *
         * @param {Object} [searchParams=null] - search parameters object which is
         * resource-specific, the ``FeedList.getSearchParameters`` method
         * can be used to get a list of possible search parameters
         * @param {number} [searchParams.limit] - page limit
         * @param {number} [searchParams.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<FeedList>} - JS Promise, resolves to a ``FeedList`` object
         */
        getFeeds(searchParams?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<FeedList>;
    }
    /**
     * Plugin meta-specific plugin list resource object representing a list of
     * plugins associated to an specific plugin meta.
     */
    export class PluginMetaPluginList extends ListResource {
        /**
         * Constructor
         *
         * @param {string} url - url of the resource
         * @param {Object} [auth=null] - authentication object
         * @param {string} [auth.token] - authentication token
         */
        constructor(url: string, auth?: {
            token?: string;
        });
        /**
         * Fetch the plugin meta associated to this plugin meta-specific list of
         * plugins from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginMeta>} - JS Promise, resolves to a ``PluginMeta`` object
         */
        getPluginMeta(timeout?: number): Promise<PluginMeta>;
    }
    import { ItemResource } from "resource";
    import { PluginParameterList } from "pluginparameter";
    import { PluginComputeResourceList } from "computeresource";
    import { PluginInstanceList } from "plugininstance";
    import { ListResource } from "resource";
    import { FeedList } from "feed";
    import { PluginMeta } from "pluginmeta";
}
declare module "computeresource" {
    /**
     * Compute resource item resource object representing a compute resource.
     */
    export class ComputeResource extends ItemResource {
    }
    /**
     * Compute resource list resource object representing a list of compute resources.
     */
    export class ComputeResourceList extends ListResource {
        /**
         * Fetch a list of feeds from the REST API.
         *
         * @param {Object} [searchParams=null] - search parameters object which is
         * resource-specific, the ``FeedList.getSearchParameters`` method
         * can be used to get a list of possible search parameters
         * @param {number} [searchParams.limit] - page limit
         * @param {number} [searchParams.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<FeedList>} - JS Promise, resolves to a ``FeedList`` object
         */
        getFeeds(searchParams?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<FeedList>;
    }
    /**
     * Plugin-specific compute resource list resource object representing a list of
     * compute resources registered with an specific plugin.
     */
    export class PluginComputeResourceList extends ListResource {
        /**
         * Fetch the plugin associated to this compute resource list from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
         */
        getPlugin(timeout?: number): Promise<Plugin>;
    }
    import { ItemResource } from "resource";
    import { ListResource } from "resource";
    import { FeedList } from "feed";
    import { Plugin } from "plugin";
}
declare module "uploadedfile" {
    /**
     * Uploaded file item resource object representing a user's uploaded file.
     */
    export class UploadedFile extends ItemResource {
        /**
         * Fetch the file blob associated to this file item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
         */
        getFileBlob(timeout?: number): Promise<Blob>;
        /**
         * Make a PUT request to modify this uploaded file item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} data.upload_path - absolute path including file name where the file
         * will be uploaded on the storage service
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        put(data: {
            upload_path: string;
        }, timeout?: number): Promise<UploadedFile>;
        /**
         * Make a DELETE request to delete this uploaded file item resource through the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise} - JS Promise
         */
        delete(timeout?: number): Promise<any>;
    }
    /**
     * Uploaded file list resource object representing a list of a user's uploaded files.
     */
    export class UploadedFileList extends ListResource {
        /**
         * Make a POST request to this uploaded file list resource to create a new uploaded file
         * item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} data.upload_path - absolute path including file name where the file
         * will be uploaded on the storage service
         * @param {?Object} uploadFileObj - custom file object
         * @param {Object} uploadFileObj.fname - file blob
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: {
            upload_path: string;
        }, uploadFileObj: any | null, timeout?: number): Promise<UploadedFileList>;
    }
    import { ItemResource } from "resource";
    import { ListResource } from "resource";
}
declare module "pacsfile" {
    /**
     * PACS file item resource object representing a PACS file.
     */
    export class PACSFile extends ItemResource {
        /**
         * Fetch the file blob associated to this file item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
         */
        getFileBlob(timeout?: number): Promise<Blob>;
    }
    /**
     * PACS file list resource object representing a list of PACS files.
     */
    export class PACSFileList extends ListResource {
    }
    import { ItemResource } from "resource";
    import { ListResource } from "resource";
}
declare module "servicefile" {
    /**
     * Service file item resource object representing a file from an unregistered service.
     */
    export class ServiceFile extends ItemResource {
        /**
         * Fetch the file blob associated to this file item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
         */
        getFileBlob(timeout?: number): Promise<Blob>;
    }
    /**
     * Service file list resource object representing a list of files from an unregistered service.
     */
    export class ServiceFileList extends ListResource {
    }
    import { ItemResource } from "resource";
    import { ListResource } from "resource";
}
declare module "note" {
    /**
     * Note item resource object representing a feed's note.
     */
    export default class Note extends ItemResource {
        /**
         * Make a PUT request to modify this note item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.title] - title of the comment
         * @param {string} [data.content] - content of the comment
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        put(data: {
            title?: string;
            content?: string;
        }, timeout?: number): Promise<Note>;
    }
    import { ItemResource } from "resource";
}
declare module "tag" {
    /**
     * Tag item resource object representing a feed tag.
     */
    export class Tag extends ItemResource {
        /**
         * Fetch a list of feeds that are tagged with this tag from the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<TagFeedList>} - JS Promise, resolves to a ``TagFeedList`` object
         */
        getTaggedFeeds(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<TagFeedList>;
        /**
         * Fetch a list of taggings made with this tag from the REST API.
         *
         * @param {Object} [params=null] - page parameters object
         * @param {number} [params.limit] - page limit
         * @param {number} [params.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<TaggingList>} - JS Promise, resolves to a ``TaggingList`` object
         */
        getTaggings(params?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<any>;
        /**
         * Make a PUT request to modify this tag item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.name] - tag name
         * @param {string} [data.color] - tag color
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        put(data: {
            name?: string;
            color?: string;
        }, timeout?: number): Promise<Tag>;
        /**
         * Make a DELETE request to delete this tag item resource through the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise} - JS Promise
         */
        delete(timeout?: number): Promise<any>;
    }
    /**
     * Tag list resource object representing a list of a feed's tags.
     */
    export class TagList extends ListResource {
        /**
         * Fetch a list of feeds from the REST API.
         *
         * @param {Object} [searchParams=null] - search parameters object which is
         * resource-specific, the ``FeedList.getSearchParameters`` method can be
         * used to get a list of possible search parameters
         * @param {number} [searchParams.limit] - page limit
         * @param {number} [searchParams.offset] - page offset
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<FeedList>} - JS Promise, resolves to a ``FeedList`` object
         */
        getFeeds(searchParams?: {
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<FeedList>;
        /**
         * Make a POST request to this tag list resource to create a new tag item resource
         * through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.name] - tag name
         * @param {string} [data.color] - tag color
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: {
            name?: string;
            color?: string;
        }, timeout?: number): Promise<TagList>;
    }
    /**
     * Tagging item resource object representing a tagging of an specific feed with an
     * specific tag.
     */
    export class Tagging extends ItemResource {
        /**
         * Fetch the tag associated to this tagging from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
         */
        getTag(timeout?: number): Promise<Tag>;
        /**
         * Fetch the feed associated to this tagging from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(timeout?: number): Promise<Feed>;
        /**
         * Make a DELETE request to delete this tagging item resource through the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise} - JS Promise
         */
        delete(timeout?: number): Promise<any>;
    }
    /**
     * Tag-specific tagging list resource object representing a list of taggings made with an
     * specific tag.
     */
    export class TagTaggingList extends ListResource {
        /**
         * Fetch the tag associated to this tag-specific list of taggings from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
         */
        getTag(timeout?: number): Promise<Tag>;
        /**
         * Make a POST request to this tag-specific tagging list resource to create a new
         * tagging item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} data.feed_id - id of the feed to be tagged
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: {
            feed_id: string;
        }, timeout?: number): Promise<TagTaggingList>;
    }
    /**
     * Feed-specific tagging list resource object representing a list of taggings applied to
     * an specific feed.
     */
    export class FeedTaggingList extends ListResource {
        /**
         * Fetch the feed associated to this feed-specific list of taggings from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(timeout?: number): Promise<Feed>;
        /**
         * Make a POST request to this feed-specific tagging list resource to create a new
         * tagging item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} data.tag_id - id of the tag to be used to tag the feed
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: {
            tag_id: string;
        }, timeout?: number): Promise<FeedTaggingList>;
    }
    /**
     * Tag-specific feed list resource object representing a list of feeds that are tagged
     * with an specific tag.
     */
    export class TagFeedList extends ListResource {
        /**
         * Fetch the tag associated to this tag-specific list of feeds from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
         */
        getTag(timeout?: number): Promise<Tag>;
    }
    /**
     * Feed-specific tag list resource object representing a list of tags that an specific
     * feed is tagged with.
     */
    export class FeedTagList extends ListResource {
        /**
         * Fetch the feed associated to this feed-specific list of tags from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(timeout?: number): Promise<Feed>;
    }
    import { ItemResource } from "resource";
    import { ListResource } from "resource";
    import { FeedList } from "feed";
    import { Feed } from "feed";
}
declare module "comment" {
    /**
     * Comment item resource object representing a feed comment.
     */
    export class Comment extends ItemResource {
        /**
         * Fetch the feed associated to the comment item from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(timeout?: number): Promise<Feed>;
        /**
         * Make a PUT request to modify this comment item resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.title] - title of the comment
         * @param {string} [data.content] - content of the comment
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        put(data: {
            title?: string;
            content?: string;
        }, timeout?: number): Promise<Comment>;
        /**
         * Make a DELETE request to delete this comment item resource through the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise} - JS Promise
         */
        delete(timeout?: number): Promise<any>;
    }
    /**
     * Comment list resource object representing a list of feed comments.
     */
    export class CommentList extends ListResource {
        /**
         * Fetch the feed associated to the comment list from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(timeout?: number): Promise<Feed>;
        /**
         * Make a POST request to this comment list resource to create a new comment item
         * resource through the REST API.
         *
         * @param {Object} data - request JSON data object
         * @param {string} [data.title] - title of the comment
         * @param {string} [data.content] - content of the comment
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<this>} - JS Promise, resolves to ``this`` object
         */
        post(data: {
            title?: string;
            content?: string;
        }, timeout?: number): Promise<CommentList>;
    }
    import { ItemResource } from "resource";
    import { Feed } from "feed";
    import { ListResource } from "resource";
}
declare module "feed" {
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
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<FeedFileList>;
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
        tagFeed(tag_id: number, timeout?: number): Promise<any>;
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
            name?: string;
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
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<AllFeedFileList>;
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
            limit?: number;
            offset?: number;
        }, timeout?: number): Promise<UploadedFileList>;
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
         * Fetch currently authenticated user's information from the REST API.
         *
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
         */
        getUser(timeout?: number): Promise<User>;
    }
    import { ItemResource } from "resource";
    import Note from "note";
    import { FeedTagList } from "tag";
    import { FeedTaggingList } from "tag";
    import { CommentList } from "comment";
    import { FeedFileList } from "feedfile";
    import { FeedPluginInstanceList } from "plugininstance";
    import { ListResource } from "resource";
    import { AllFeedFileList } from "feedfile";
    import { ComputeResourceList } from "computeresource";
    import { PluginList } from "plugin";
    import { AllPluginInstanceList } from "plugininstance";
    import { PipelineList } from "pipeline";
    import { AllPipelineInstanceList } from "pipelineinstance";
    import { TagList } from "tag";
    import { UploadedFileList } from "uploadedfile";
    import { PACSFileList } from "pacsfile";
    import { ServiceFileList } from "servicefile";
    import User from "user";
}
declare module "client" {
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
         * @param {Object} auth - authentication object
         * @param {string} auth.token - authentication token
         */
        constructor(url: string, auth: {
            token: string;
        });
        /** @type {string} */
        url: string;
        /** @type {Object} */
        auth: any;
        feedsUrl: string;
        chrisInstanceUrl: string;
        filesUrl: string;
        computeResourcesUrl: string;
        pluginMetasUrl: string;
        pluginsUrl: string;
        pluginInstancesUrl: string;
        pipelinesUrl: string;
        pipelineInstancesUrl: string;
        tagsUrl: string;
        uploadedFilesUrl: string;
        pacsFilesUrl: string;
        serviceFilesUrl: string;
        userUrl: string;
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
            min_creation_date?: number;
            max_creation_date?: number;
        }, timeout?: number): Promise<FeedList>;
        /**
         * Get a feed resource object given its id.
         *
         * @param {number} id - feed id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
         */
        getFeed(id: number, timeout?: number): Promise<any>;
        /**
         * Tag a feed given its id and the id of the tag.
         *
         * @param {number} feed_id - feed id
         * @param {number} tag_id - tag id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<Tagging>} - JS Promise, resolves to a ``Tagging`` object
         */
        tagFeed(feed_id: number, tag_id: number, timeout?: number): Promise<any>;
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
            limit?: number;
            offset?: number;
            id?: number;
            fname?: string;
            fname_exact?: string;
            fname_icontains?: string;
            plugin_inst_id?: number;
            feed_id?: number;
            min_creation_date?: string;
            max_creation_date?: string;
        }, timeout?: number): Promise<AllFeedFileList>;
        /**
         * Get a file resource object given its id.
         *
         * @param {number} id - file id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<FeedFile>} - JS Promise, resolves to a ``FeedFile`` object
         */
        getFile(id: number, timeout?: number): Promise<any>;
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
         * @return {Promise<ComputeResource>} - JS Promise, resolves to a ``ComputeResource`` object
         */
        getComputeResource(id: number, timeout?: number): Promise<any>;
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
         * @return {Promise<PluginMeta>} - JS Promise, resolves to a ``PluginMeta`` object
         */
        getPluginMeta(id: number, timeout?: number): Promise<any>;
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
         * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
         */
        getPlugin(id: number, timeout?: number): Promise<Plugin>;
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
        getPluginInstances(searchParams?: {
            limit?: number;
            offset?: number;
            id?: number;
            title?: string;
            status?: string;
            owner_username?: string;
            feed_id?: number;
            root_id?: number;
            plugin_id?: number;
            plugin_name?: number;
            plugin_name_exact?: number;
            plugin_version?: number;
        }, timeout?: number): Promise<AllPluginInstanceList>;
        /**
         * Get a plugin instance resource object given its id.
         *
         * @param {number} id - plugin instance id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PluginInstance>} - JS Promise, resolves to a ``PluginInstance`` object
         */
        getPluginInstance(id: number, timeout?: number): Promise<any>;
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
            title?: string;
            compute_resource_name?: string;
            cpu_limit?: string;
            memory_limit?: string;
            number_of_workers?: string;
            gpu_limit?: string;
        }, timeout?: number): Promise<any>;
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
        createPluginInstanceSplit(pluginInstanceId: number, filter?: string, cr_name?: string, timeout?: number): Promise<any>;
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
         * @return {Promise<Pipeline>} - JS Promise, resolves to a ``Pipeline`` object
         */
        getPipeline(id: number, timeout?: number): Promise<any>;
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
            authors?: string;
            category?: string;
            description?: string;
            locked?: boolean;
            plugin_tree?: string;
            plugin_inst_id?: number;
        }, timeout?: number): Promise<any>;
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
            limit?: number;
            offset?: number;
            id?: number;
            title?: string;
            description?: string;
            pipeline_name?: string;
        }, timeout?: number): Promise<AllPipelineInstanceList>;
        /**
         * Get a pipeline instance resource object given its id.
         *
         * @param {number} id - pipeline instance id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PipelineInstance>} - JS Promise, resolves to a ``PipelineInstance`` object
         */
        getPipelineInstance(id: number, timeout?: number): Promise<any>;
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
        createPipelineInstance(pipelineId: number, data: {
            previous_plugin_inst_id: number;
            title?: string;
            description?: string;
        }, timeout?: number): Promise<any>;
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
         * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
         */
        getTag(id: number, timeout?: number): Promise<any>;
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
            name?: string;
        }, timeout?: number): Promise<any>;
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
         * @param {string} [searchParams.owner_username] - match file's owner username exactly with this string
         * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
         * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<UploadedFileList>} - JS Promise, resolves to a ``UploadedFileList`` object
         */
        getUploadedFiles(searchParams?: {
            limit?: number;
            offset?: number;
            id?: number;
            fname?: string;
            fname_exact?: string;
            fname_icontains?: string;
            owner_username?: string;
            min_creation_date?: string;
            max_creation_date?: string;
        }, timeout?: number): Promise<UploadedFileList>;
        /**
         * Get an uploaded file resource object given its id.
         *
         * @param {number} id - uploaded file id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<UploadedFile>} - JS Promise, resolves to an ``UploadedFile`` object
         */
        getUploadedFile(id: number, timeout?: number): Promise<any>;
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
        uploadFile(data: {
            upload_path: string;
        }, uploadFileObj: any | null, timeout?: number): Promise<any>;
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
         * @param {number} [searchParams.PatientID] - match file's PatientID exactly with this string
         * @param {string} [searchParams.PatientName] - match file's PatientName containing this string
         * @param {number} [searchParams.StudyInstanceUID] - match file's StudyInstanceUID exactly with this string
         * @param {string} [searchParams.StudyDescription] - match file's StudyDescription containing this string
         * @param {number} [searchParams.SeriesInstanceUID] - match file's SeriesInstanceUID exactly with this string
         * @param {string} [searchParams.SeriesDescription] - match file's SeriesDescription containing this string
         * @param {number} [searchParams.pacs_identifier] - match file's PACS identifier exactly with this string
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
            PatientID?: number;
            PatientName?: string;
            StudyInstanceUID?: number;
            StudyDescription?: string;
            SeriesInstanceUID?: number;
            SeriesDescription?: string;
            pacs_identifier?: number;
            min_creation_date?: string;
            max_creation_date?: string;
        }, timeout?: number): Promise<PACSFileList>;
        /**
         * Get a PACS file resource object given its id.
         *
         * @param {number} id - PACS file id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<PACSFile>} - JS Promise, resolves to a ``PACSFile`` object
         */
        getPACSFile(id: number, timeout?: number): Promise<any>;
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
         * @param {string} [searchParams.service_identifier] - match file's service isentifier containing this string
         * @param {number} [searchParams.service_id] - match file's service id exactly with this number
         * @param {string} [searchParams.min_creation_date] - match file's creation_date greater than this date string
         * @param {string} [searchParams.max_creation_date] - match file's creation_date lesser than this date string
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<ServiceFileList>} - JS Promise, resolves to a ``ServiceFileList`` object
         */
        getServiceFiles(searchParams?: {
            limit?: number;
            offset?: number;
            id?: number;
            fname?: string;
            fname_exact?: string;
            fname_icontains?: string;
            service_identifier?: string;
            service_id?: number;
            min_creation_date?: string;
            max_creation_date?: string;
        }, timeout?: number): Promise<ServiceFileList>;
        /**
         * Get a service file resource object given its id.
         *
         * @param {number} id - PACS file id
         * @param {number} [timeout=30000] - request timeout
         *
         * @return {Promise<ServiceFile>} - JS Promise, resolves to a ``ServiceFile`` object
         */
        getServiceFile(id: number, timeout?: number): Promise<any>;
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
    import ChrisInstance from "chrisinstance";
    import { FeedList } from "feed";
    import { AllFeedFileList } from "feedfile";
    import { ComputeResourceList } from "computeresource";
    import { PluginMetaList } from "pluginmeta";
    import { PluginList } from "plugin";
    import { AllPluginInstanceList } from "plugininstance";
    import { PipelineList } from "pipeline";
    import { AllPipelineInstanceList } from "pipelineinstance";
    import { TagList } from "tag";
    import { UploadedFileList } from "uploadedfile";
    import { PACSFileList } from "pacsfile";
    import { ServiceFileList } from "servicefile";
    import User from "user";
}
declare module "index" {
    export default Client;
    import Client from "client";
    import Request from "request";
    import Collection from "cj";
    import RequestException from "exception";
    import { ListResource } from "resource";
    import { ItemResource } from "resource";
    import { Resource } from "resource";
    import ChrisInstance from "chrisinstance";
    import { FeedList } from "feed";
    import { Feed } from "feed";
    import { PluginList } from "plugin";
    import { PluginMetaPluginList } from "plugin";
    import { Plugin } from "plugin";
    import { PluginMetaList } from "pluginmeta";
    import { PluginMeta } from "pluginmeta";
    import { PluginParameterList } from "pluginparameter";
    import { PluginParameter } from "pluginparameter";
    import { PluginComputeResourceList } from "computeresource";
    import { ComputeResourceList } from "computeresource";
    import { ComputeResource } from "computeresource";
    import { PluginInstanceDescendantList } from "plugininstance";
    import { PluginInstanceList } from "plugininstance";
    import { PluginInstance } from "plugininstance";
    import { AllPluginInstanceList } from "plugininstance";
    import { PluginInstanceSplitList } from "plugininstance";
    import { PluginInstanceSplit } from "plugininstance";
    import { PluginInstanceParameterList } from "plugininstance";
    import { PluginInstanceParameter } from "plugininstance";
    import { FeedPluginInstanceList } from "plugininstance";
    import { PipelineInstancePluginInstanceList } from "plugininstance";
    import { PipelineList } from "pipeline";
    import { PipelinePluginList } from "pipeline";
    import { PipelinePluginPipingList } from "pipeline";
    import { Pipeline } from "pipeline";
    import { PipelinePipingDefaultParameterList } from "pipeline";
    import { PluginPiping } from "pipeline";
    import { PipingDefaultParameter } from "pipeline";
    import { AllPipelineInstanceList } from "pipelineinstance";
    import { PipelineInstanceList } from "pipelineinstance";
    import { PipelineInstance } from "pipelineinstance";
    import { TagList } from "tag";
    import { Tag } from "tag";
    import { TagTaggingList } from "tag";
    import { FeedTaggingList } from "tag";
    import { Tagging } from "tag";
    import { TagFeedList } from "tag";
    import { FeedTagList } from "tag";
    import Note from "note";
    import User from "user";
    import { CommentList } from "comment";
    import { Comment } from "comment";
    import { AllFeedFileList } from "feedfile";
    import { PluginInstanceFileList } from "feedfile";
    import { FeedFileList } from "feedfile";
    import { FeedFile } from "feedfile";
    import { UploadedFileList } from "uploadedfile";
    import { UploadedFile } from "uploadedfile";
    import { PACSFileList } from "pacsfile";
    import { PACSFile } from "pacsfile";
    import { ServiceFileList } from "servicefile";
    import { ServiceFile } from "servicefile";
    export { Request, Collection, RequestException, ListResource, ItemResource, Resource, ChrisInstance, FeedList, Feed, PluginList, PluginMetaPluginList, Plugin, PluginMetaList, PluginMeta, PluginParameterList, PluginParameter, PluginComputeResourceList, ComputeResourceList, ComputeResource, PluginInstanceDescendantList, PluginInstanceList, PluginInstance, AllPluginInstanceList, PluginInstanceSplitList, PluginInstanceSplit, PluginInstanceParameterList, PluginInstanceParameter, FeedPluginInstanceList, PipelineInstancePluginInstanceList, PipelineList, PipelinePluginList, PipelinePluginPipingList, Pipeline, PipelinePipingDefaultParameterList, PluginPiping, PipingDefaultParameter, AllPipelineInstanceList, PipelineInstanceList, PipelineInstance, TagList, Tag, TagTaggingList, FeedTaggingList, Tagging, TagFeedList, FeedTagList, Note, User, CommentList, Comment, AllFeedFileList, PluginInstanceFileList, FeedFileList, FeedFile, UploadedFileList, UploadedFile, PACSFileList, PACSFile, ServiceFileList, ServiceFile };
}
