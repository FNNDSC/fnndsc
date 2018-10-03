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
    this.auth = auth;
    this.contentType = 'application/vnd.collection+json';
    this.collection = null;
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

    this.item = null;
  }

  /**
   * Fetch this item resource from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  get(timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);
    const self = this;
    let url = this.url;

    const result = req.get(url);

    return new Promise((resolve, reject) => {
      result
        .then(response => {

          // change the state of this object on successfull response
          self.collection = null;
          self.item = null;
          if (response.data && response.data.collection) {
            self.collection = response.data.collection;
            self.item = self.collection.items[0];
          }
          resolve(self);
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
    if (this.item) {
      return Collection.getItemDescriptors(this.item);
    }
    return null;
  }

  /**
   * Return true if the item resource object contains any item data.
   *
   * @return {*}
   */
  get isEmpty() {
    if (this.item) {
      return false;
    }
    return true;
  }

  /**
  * Internal method to fetch a related resource from the REST API referenced by
  * a link relation in the item object.
   *
   * @param {*} linkRelation
   * @param {*} ResourceClass
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  _getResource(linkRelation, ResourceClass, params = null, timeout = 30000) {
    if (this.item) {
      const urls = Collection.getLinkRelationUrls(this.item, linkRelation);

      if (urls.length) {
        const resourceUrl = urls[0];
        const resourceObj = new ResourceClass(resourceUrl, this.auth);

        return resourceObj.get(params, timeout);
      } else {
        const errMsg = 'Missing "' + linkRelation + '" link relation!';
        throw new RequestException(errMsg);
      }
    }
    return Promise.reject("Item object has not been set!");
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

    this.queryUrl = '';
    this.searchParams = null;
  }

  /**
   * Fetch this list resource from the REST API.
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
   * Return true if the list resource object contains any item data.
   *
   * @return {*}
   */
  get isEmpty() {
    if (this.collection && this.collection.items.length) {
      return false;
    }
    return true;
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

  /**
   * Internal method to get the list of item objects.
   *
   * @param {*} ItemClass
   * @return {*}
   */
  _getItems(ItemClass) {
    if (this.collection) {
      const items = this.collection.items;

      return items.map(item => {
        const itemResource = new ItemClass(item.href, this.auth);

        itemResource.collection = this.collection;
        itemResource.item = item;
      });
    }
    return null;
  }

  /**
   * Internal method to fetch a related resource from the REST API referenced by
   * a link relation in the collection object.
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
    return Promise.reject("Collection object has not been set!");
  }
}
