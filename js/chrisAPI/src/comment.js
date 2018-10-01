/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';

/**
 * API comment objects.
 *
 * @module comment
 */
export class Comment extends ItemResource {
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

export class CommentList extends ListResource {
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

    return this._getItems(Comment);
  }
}
