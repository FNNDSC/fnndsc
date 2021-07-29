/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { Feed } from './feed';

/**
 * Comment item resource object representing a feed comment.
 */
export class Comment extends ItemResource {
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

  /**
   * Fetch the feed associated to the comment item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a PUT request to modify this comment item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} [data.title] - title of the comment
   * @param {string} [data.content] - content of the comment
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  }

  /**
   * Make a DELETE request to delete this comment item resource through the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise} - JS Promise
   */
  delete(timeout = 30000) {
    return this._delete(timeout);
  }
}

/**
 * Comment list resource object representing a list of feed comments.
 */
export class CommentList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = Comment;
  }

  /**
   * Fetch the feed associated to the comment list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a POST request to this comment list resource to create a new comment item
   * resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} [data.title] - title of the comment
   * @param {string} [data.content] - content of the comment
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}
