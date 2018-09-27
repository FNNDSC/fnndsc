/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';
import { User } from './user';

/**
 * API Feed objects.
 *
 * @module feed
 */
export class Feed extends ItemResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
    this.user = new User(this.chrisUrl, this.auth);
  }
}

export class FeedList extends ListResource {
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
    if (this.collection) {
      return this.collection.items.map(item => new Feed(item.href, this.auth));
    }
    return null;
  }
}
