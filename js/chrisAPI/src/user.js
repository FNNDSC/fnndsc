/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';
import { ItemResource } from './resource';

/**
 * API User objects.
 *
 * @module user
 */
export class User extends ItemResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
  }
}
