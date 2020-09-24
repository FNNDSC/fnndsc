/** * Imports ***/
import Request from './request';
import { ItemResource } from './resource';

/**
 * ChRIS instance item resource object uniquely representing a ChRIS instance.
 */
export default class ChrisInstance extends ItemResource {
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
