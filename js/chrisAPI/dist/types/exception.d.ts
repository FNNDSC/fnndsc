/**
 * Custom exception object.
 *
 * @module exception
 */
export default class RequestException extends Error {
    constructor(...args: any[]);
    /** @type {Object} */
    request: Object;
    /** @type {Object} */
    response: Object;
}
