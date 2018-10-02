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
   * Fetch this resource from the REST API.
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
          // change the state of this object on successfull response
          self.collection = null;
          self.searchParams = params;
          if (response.data && response.data.collection) {
            self.collection = response.data.collection;
          }
          resolve(self);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Internal method to fetch a related resource referenced by a link relation from the
   * REST API.
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

  /**
   * Return true if the resource object contains any item data.
   *
   * @return {*}
   */
  get isEmpty() {
    if (this.collection && this.collection.items.length) {
      return false;
    }
    return true;
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

  /**
   * Fetch the next resource page from the paginated REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getNext(timeout = 30000) {
    return this._getNextOrPrevious('next', timeout);
  }

  /**
   * Fetch the previous resource page from the paginated REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getPrevious(timeout = 30000) {
    return this._getNextOrPrevious('previous', timeout);
  }

  /**
   * Internal method to fetch the next or previous page from the paginated REST API.
   *
   * @param {*} linkRelation
   * @param {*} timeout
   * @return {*}
   */
  _getNextOrPrevious(linkRelation, timeout = 30000) {
    if (this.collection) {
      const urls = Collection.getLinkRelationUrls(this.collection, linkRelation);

      if (urls.length) {
        const searchParams = new URL(urls[0]).searchParams;
        const offset = parseInt(searchParams.get('offset'));
        const limit = searchParams.get('limit');
        const params = {};

        if (offset) {
          params.offset = offset;
        }
        if (limit) {
          params.limit = limit;
        }
        return this.get(params, timeout);
      }
    }

    this.collection = null;
    this.searchParams = null;
    return Promise.resolve(this);
  }
}
