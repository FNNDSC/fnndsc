/**
 * Http request object.
 */
export default class Request {
    /**
     * Internal method to make an axios request.
     *
     * @param {Object} config - axios configuration object
     *
     * @return {Object} - JS Promise, resolves to an ``axios reponse`` object
     */
    static _callAxios(config: any): any;
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
     * @return {Object} - JS Promise, resolves to an ``axios reponse`` object
     */
    get(url: string, params?: any | null): any;
    /**
     * Perform a POST request.
     *
     * @param {string} url - url of the resource
     * @param {Object} data - JSON data object
     * @param {?Object} uploadFileObj - custom object with a property with the same name as
     * the API descriptor corresponding to the file and whose value is the file blob
     *
     * @return {Object} - JS Promise, resolves to an ``axios reponse`` object
     */
    post(url: string, data: any, uploadFileObj?: any | null): any;
    /**
     * Perform a PUT request.
     *
     * @param {string} url - url of the resource
     * @param {Object} data - JSON data object
     * @param {?Object} uploadFileObj - custom object with a property with the same name as
     * the API descriptor corresponding to the file and whose value is the file blob
     *
     * @return {Object} - JS Promise, resolves to an ``axios reponse`` object
     */
    put(url: string, data: any, uploadFileObj?: any | null): any;
    /**
     * Perform a DELETE request.
     *
     * @param {string} url - url of the resource
     *
     * @return {Object} - JS Promise, resolves to an ``axios reponse`` object
     */
    delete(url: string): any;
    /**
     * Internal method to make either a POST or PUT request.
     *
     * @param {string} requestMethod - either 'post' or 'put'
     * @param {string} url - url of the resource
     * @param {Object} data - JSON data object
     * @param {?Object} uploadFileObj - custom object with a property with the same name as
     * the API descriptor corresponding to the file and whose value is the file blob
     *
     * @return {Object} - JS Promise, resolves to an ``axios reponse`` object
     */
    _postOrPut(requestMethod: string, url: string, data: any, uploadFileObj?: any | null): any;
    /**
     * Internal method to create a config file for axios.
     *
     * @param {string} url - url of the resource
     * @param {string} method - request verb
     *
     * @return {Object} - axios configuration object
     */
    _getConfig(url: string, method: string): any;
}
