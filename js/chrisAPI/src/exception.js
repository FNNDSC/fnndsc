/**
 * Custom exception object.
 */
export default class RequestException extends Error {
  /**
   * Constructor
   *
   * @param {...string} args
   */
  constructor(...args) {
    super(...args);
    /** @type {string} */
    this.name = this.constructor.name;
  }
}
