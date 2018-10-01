/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';

/**
 * API Tag objects.
 *
 * @module tag
 */
export class Tag extends ItemResource {
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

export class TagList extends ListResource {
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

    return this._getItems(Tag);
  }
}
