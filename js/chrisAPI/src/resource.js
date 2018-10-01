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

    if (params) {
      for (let param in params) {
        // if there are search params then use the query url for this resource
        if (params.hasOwnProperty(param) && param !== 'limit' && param !== 'offset') {
          if (self.queryUrl) {
            url = self.queryUrl;
            break;
          } else {
            const errMsg = 'A search url has not been setup for this resource!';
            throw new RequestException(errMsg);
          }
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

  /**
   * Internal method to fetch a related resource referenced by a link relation.
   *
   * @param {*} linkRelation
   * @param {*} ResourceClass
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  _getResource(linkRelation, ResourceClass, params = null, timeout = 30000) {
    if (this.collection) {
      const urls = Collection.getLinkRelationUrls(this.collection, linkRelation);

      if (urls.length) {
        const resourceUrl = urls[0];
        const resourceObj = new ResourceClass(resourceUrl, this.auth);

        return resourceObj.get(params, timeout);
      } else {
        const errMsg = 'Missing "' + linkRelation + '" link relation!';
        throw new RequestException(errMsg);
      }
    }
    return null;
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
   * Internal method to get the list of item objects.
   *
   * @param {*} ItemClass
   * @return {*}
   */
  _getItems(ItemClass) {
    if (this.collection) {
      const items = this.collection.items;

      return items.map(item => new ItemClass(item.href, this.auth));
    }
    return null;
  }

  /**
   * Get the list of items' data descriptors.
   *
   * @return {*}
   */
  get itemsData() {
    if (this.collection) {
      const items = this.collection.items;

      return items.map(item => Collection.getItemDescriptors(item));
    }
    return null;
  }
}
