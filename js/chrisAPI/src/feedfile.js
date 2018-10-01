/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';

/**
 * API feed file objects.
 *
 * @module feedfile
 */
export class FeedFile extends ItemResource {
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

export class FeedFileList extends ListResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Get the list of items' data descriptors.
   *
   * @return {*}
   */
  get items() {

    return this._getItems(FeedFile);
  }
}
