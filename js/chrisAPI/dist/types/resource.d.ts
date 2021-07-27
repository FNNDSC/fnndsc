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
