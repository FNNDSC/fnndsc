"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** * Imports ***/
const request_1 = require("./request");
const resource_1 = require("./resource");
/**
 * User item resource object representing a user of the system.
 */
class User extends resource_1.ItemResource {
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
     * Make a PUT request to modify this user item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.password - user password
     * @param {string} data.email - user email
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data, timeout = 30000) {
        return this._put(data, null, timeout);
    }
}
exports.default = User;
