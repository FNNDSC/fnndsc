/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';

/**
 * API plugin instance objects.
 *
 * @module plugin
 */
export class PluginInstance extends ItemResource {
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

export class PluginInstanceList extends ListResource {
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

    return this._getItems(PluginInstance);
  }
}
