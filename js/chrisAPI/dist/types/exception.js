"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom exception object.
 *
 * @module exception
 */
class RequestException extends Error {
    constructor(...args) {
        super(...args);
        /** @type {string} */
        this.name = this.constructor.name;
        /** @type {Object} */
        this.request = null;
        /** @type {Object} */
        this.response = null;
    }
}
exports.default = RequestException;
