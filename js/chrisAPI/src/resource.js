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
    //this.allowVerbs = response.headers.allow.split(',');
    //this.collection = response.data.collection;
    //this.contentType = response.headers['content-type'];
    //this.timeout = response.config.timeout;
    //this.url = Collection.getUrl(this.collection);
    this.url = resourceUrl;
    this.auth = auth;
    this.contentType = 'application/vnd.collection+json';
    this.collection = null;
  }

  /**
   * Fetch this resource from the API.
   *
   * @param {*} timeout
   * @return {*}
   */
  get(timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);
    const self = this;
    const result = req.get(this.url);

    return new Promise((resolve, reject) => {
      result
        .then(response => {
          if (response.data && response.data.collection) {
            self.collection = response.data.collection;
          }
          resolve();
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
   * Fetch this resource from the API.
   *
   * @param {*} timeout
   * @return {*}
   */
  get(timeout = 30000) {
    const result = super.get(timeout);
    const self = this;

    return new Promise((resolve, reject) => {
      result
        .then(() => {
          resolve(self.itemData);
        })
        .catch(error => {
          reject(error);
        });
    });
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
   * Fetch this resource from the API.
   *
   * @param {*} timeout
   * @return {*}
   */
  get(timeout = 30000) {
    const result = super.get(timeout);
    const self = this;

    return new Promise((resolve, reject) => {
      result
        .then(() => {
          resolve(self.itemsData);
        })
        .catch(error => {
          reject(error);
        });
    });
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
