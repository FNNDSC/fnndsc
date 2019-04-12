/**
 * Custom exception object.
 *
 * @module exception
 */
export default class RequestException extends Error {
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
