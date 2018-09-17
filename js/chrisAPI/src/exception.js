/**
 * Custom exception object.
 *
 * @module exception
 */
export default class RequestException extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
  }
}
