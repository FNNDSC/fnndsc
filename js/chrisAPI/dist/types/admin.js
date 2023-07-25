"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginAdminList = exports.PluginAdmin = exports.ComputeResourceAdminList = exports.ComputeResourceAdmin = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
/**
 * Compute resource admin item resource object representing a compute resource admin.
 */
class ComputeResourceAdmin extends resource_1.ItemResource {
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
     * Make a DELETE request to delete this compute resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.ComputeResourceAdmin = ComputeResourceAdmin;
/**
 * Compute resource admin list resource object representing a list of compute resource admins.
 */
class ComputeResourceAdminList extends resource_1.ListResource {
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
        this.itemClass = ComputeResourceAdmin;
    }
    /**
     * Make a POST request to this compute resource admin list resource to create a new
     * compute resource admin item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.name - compute resource name
     * @param {string} data.compute_url - compute resource's url
     * @param {string} data.compute_user - compute resource's user
     * @param {string} data.compute_password - compute resource's password
     * @param {string} [data.compute_auth_url] - compute resource's auth url
     * @param {string} [data.compute_auth_token='initial_token'] - compute resource's auth token
     * @param {string} [data.description] - compute resource's description
     * @param {number} [data.max_job_exec_seconds=-1] - compute resource's max job execution in seconds
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.ComputeResourceAdminList = ComputeResourceAdminList;
/**
 * Plugin admin item resource object representing a plugin admin.
 */
class PluginAdmin extends resource_1.ItemResource {
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
     * Make a DELETE request to delete this plugin through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.PluginAdmin = PluginAdmin;
/**
 * Plugin admin list resource object representing a list of plugin admins.
 */
class PluginAdminList extends resource_1.ListResource {
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
        this.itemClass = PluginAdmin;
    }
    /**
     * Fetch a list of compute resource admins from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<ComputeResourceAdminList>} - JS Promise, resolves
     * to a ``ComputeResourceAdminList`` object
     */
    getComputeResourceAdmins(searchParams = null, timeout = 30000) {
        const linkRelation = 'compute_resources';
        const resourceClass = ComputeResourceAdminList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
    /**
     * Make a POST request to this plugin admin list resource to create a new
     * plugin admin item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.compute_names - string representing a comma-separated
     * list of names of already registered compute resources
     * @param {?Object} pluginFileObj - custom file object
     * @param {Object} pluginFileObj.fname - plugin's file blob
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data, pluginFileObj, timeout = 30000) {
        return this._post(data, pluginFileObj, timeout);
    }
}
exports.PluginAdminList = PluginAdminList;
