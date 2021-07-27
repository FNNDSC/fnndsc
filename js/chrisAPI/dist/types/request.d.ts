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
