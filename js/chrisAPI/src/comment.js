/** * Imports ***/
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
    this.itemClass = Comment;
  }
}
