"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginParameterList = exports.PluginParameter = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const plugin_1 = require("./plugin");
/**
 * Plugin parameter item resource object representing a plugin parameter.
 */
class PluginParameter extends resource_1.ItemResource {
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
     * Fetch the plugin associated to this parameter item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout = 30000) {
        const linkRelation = 'plugin';
        const resourceClass = plugin_1.Plugin;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.PluginParameter = PluginParameter;
/**
 * Plugin parameter list resource object representing a list of plugin parameters.
 */
class PluginParameterList extends resource_1.ListResource {
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
        this.itemClass = PluginParameter;
    }
    /**
     * Fetch the plugin associated to this list of parameters from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout = 30000) {
        const linkRelation = 'plugin';
        const resourceClass = plugin_1.Plugin;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.PluginParameterList = PluginParameterList;
