"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** * Imports ***/
const request_1 = require("./request");
const resource_1 = require("./resource");
/**
 * ChRIS instance item resource object uniquely representing a ChRIS instance.
 */
class ChrisInstance extends resource_1.ItemResource {
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
}
exports.default = ChrisInstance;
