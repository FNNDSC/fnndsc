/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';

/**
 * API resource objects.
 *
 * @module resource
 */
class Resource {
  /**
   * Constructor
   *
   * @param {*} resourceUrl
   * @param {*} auth
   */
  constructor(resourceUrl, auth) {
    this.url = resourceUrl;
    this.queryUrl = '';
    this.auth = auth;
    this.contentType = 'application/vnd.collection+json';
    this.collection = null;
    this.searchParams = null;
  }

  /**
   * Fetch this resource from the API.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  get(params = null, timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);
    const self = this;
    let url = this.url;

    for (let param in params) {
      // if there are search params then use the query url for this resource
      if (params.hasOwnProperty(param) && param !== 'limit' && param !== 'offset') {
        if (self.queryUrl) {
          url = self.queryUrl;
          break;
        } else {
          throw new RequestException('A search url has not been setup for this resource!');
        }
      }
    }
    const result = req.get(url, params);

    return new Promise((resolve, reject) => {
      result
        .then(response => {
          if (response.data && response.data.collection) {
            self.collection = response.data.collection;
            self.searchParams = params;
          }
          resolve(self);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export class ItemResource extends Resource {
  /**
   * Constructor
   *
   * @param {*} itemUrl
   * @param {*} auth
   */
  constructor(itemUrl, auth) {
    super(itemUrl, auth);
  }

  /**
   * Get the item's data descriptors
   *
   * @return {*}
   */
  get itemData() {
    if (this.collection && this.collection.items.length) {
      return Collection.getItemDescriptors(this.collection.items[0]);
    }
    return null;
  }
}

export class ListResource extends Resource {
  /**
   * Constructor
   *
   * @param {*} listUrl
   * @param {*} auth
   */
  constructor(listUrl, auth) {
    super(listUrl, auth);
  }

  /**
   * Get the list of items' data descriptors.
   *
   * @return {*}
   */
  get itemsData() {
    if (this.collection) {
      return this.collection.items.map(item => Collection.getItemDescriptors(item));
    }
    return null;
  }
}
