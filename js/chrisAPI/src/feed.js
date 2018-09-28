/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';
import User from './user';
import { PluginList } from './plugin';

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

  /**
   * Get currently authenticated user's information.
   *
   * @param {*} timeout
   * @return {*}
   */
  getUser(timeout = 30000) {
    if (this.collection) {
      const urls = Collection.getLinkRelationUrls(this.collection, 'user');

      if (urls.length) {
        const userUrl = urls[0]; // there is only a single "user" url
        const user = new User(userUrl, this.auth);

        return user.get(timeout);
      } else {
        throw new RequestException('Missing "user" link relation in feed list');
      }
      return null;
    }
  }

  /**
   * Get currently authenticated user's feeds.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getPlugins(params = null, timeout = 30000) {
    if (this.collection) {
      const urls = Collection.getLinkRelationUrls(this.collection, 'plugins');

      if (urls.length) {
        const pluginsUrl = urls[0];
        const pluginList = new PluginList(pluginsUrl, this.auth);

        return pluginList.get(params, timeout);
      } else {
        throw new RequestException('Missing "plugins" link relation in feed list');
      }
      return null;
    }
  }
}
