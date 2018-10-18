/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { Feed } from './feed';

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

  /**
   * Fetch the feed associated to the comment item from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
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

  /**
   * Fetch the feed associated to the comment list from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}
