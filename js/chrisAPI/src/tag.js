/** * Imports ***/
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
    this.itemClass = Tag;
  }
}
