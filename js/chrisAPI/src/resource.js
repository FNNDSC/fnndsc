/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';

/**
 * API abstract resource objects.
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
    this.collection = null; // Collection+JSON collection obj
  }

  /**
   * Make a deep copy clone of this object resource.
   *
   * @return {*}
   */
  clone() {
    const cloneObj = Object.create(Object.getPrototypeOf(this));

    for (let prop in this) {
      if (this[prop] !== null && typeof this[prop] === 'object') {
        cloneObj[prop] = JSON.parse(JSON.stringify(this[prop]));
      } else {
        cloneObj[prop] = this[prop];
      }
    }
    return cloneObj;
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

    this.item = null; // Collection+JSON item obj
  }

  /**
   * Fetch this item resource from the REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  get(timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);

    const result = req.get(this.url);

    return new Promise((resolve, reject) => {
      result
        .then(response => {
          // change the state of this object on successfull response
          this.collection = null;
          this.item = null;
          if (response.data && response.data.collection) {
            this.collection = response.data.collection;
            this.item = this.collection.items[0];
          }
          resolve(this);
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
  get data() {
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
    return Promise.reject('Item object has not been set!');
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
    this.itemClass = ItemResource;
  }

  /**
   * Fetch this list resource from the REST API using limit and offset as optional
   * parameters.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  get(params = null, timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);
    let getParams = null;

    if (params) {
      for (let param in params) {
        if (params.hasOwnProperty(param) && (param === 'limit' || param === 'offset')) {
          if (!getParams) {
            getParams = {};
          }
          getParams[param] = params[param];
        }
      }
    }
    const result = req.get(this.url, getParams);

    return new Promise((resolve, reject) => {
      result
        .then(response => {
          // change the state of this object on successfull response
          this.collection = null;
          this.searchParams = getParams;

          if (response.data && response.data.collection) {
            this.collection = response.data.collection;

            if (this.collection.queries && this.collection.queries.length) {
              this.queryUrl = this.collection.queries[0].href;
            }
          }
          resolve(this);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Fetch this list resource from the REST API based on search parameters.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getSearch(params, timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);

    if (this.queryUrl) {
      const result = req.get(this.queryUrl, params);

      return new Promise((resolve, reject) => {
        result
          .then(response => {
            // change the state of this object on successfull response
            this.collection = null;
            this.searchParams = params;
            if (response.data && response.data.collection) {
              this.collection = response.data.collection;
            }
            resolve(this);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    return Promise.reject('A search url has not been setup for this resource!');
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
   * Return true if the list resource object has a next list page in the
   * paginated REST API.
   *
   * @return {*}
   */
  get hasNextPage() {
    if (this.collection) {
      const urls = Collection.getLinkRelationUrls(this.collection, 'next');
      if (urls.length) {
        return true;
      }
    }
    return false;
  }

  /**
   * Return true if the list resource object has a previous list page in the
   * paginated REST API.
   *
   * @return {*}
   */
  get hasPreviousPage() {
    if (this.collection) {
      const urls = Collection.getLinkRelationUrls(this.collection, 'previous');
      if (urls.length) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get an array of item resource objects corresponding to the items in this
   * list resource object.
   *
   * @return {*}
   */
  getItems() {
    if (this.collection) {
      const items = this.collection.items;

      return items.map(item => {
        const itemResource = new this.itemClass(item.href, this.auth);
        itemResource.collection = this.collection;
        itemResource.item = item;

        return itemResource;
      });
    }
    return null;
  }

  /**
   * Fetch the next resource page from the paginated REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getNextPage(timeout = 30000) {
    return this._getNextOrPreviousPage('next', timeout);
  }

  /**
   * Fetch the previous resource page from the paginated REST API.
   *
   * @param {*} timeout
   * @return {*}
   */
  getPreviousPage(timeout = 30000) {
    return this._getNextOrPreviousPage('previous', timeout);
  }

  /**
   * Internal method to fetch the next or previous page from the paginated REST API.
   *
   * @param {*} linkRelation
   * @param {*} timeout
   * @return {*}
   */
  _getNextOrPreviousPage(linkRelation, timeout = 30000) {
    if (this.collection) {
      const urls = Collection.getLinkRelationUrls(this.collection, linkRelation);

      if (urls.length) {
        const searchParams = new URL(urls[0]).searchParams;
        const offset = parseInt(searchParams.get('offset'));
        const limit = searchParams.get('limit');
        let params = {};

        if (offset) {
          params.offset = offset;
        }
        if (limit) {
          params.limit = limit;
        }
        if (!offset && !limit) {
          params = null;
        }
        return this.get(params, timeout);
      }
    }
    this.collection = null;
    this.searchParams = null;
    return Promise.resolve(this);
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
    return Promise.reject('Collection object has not been set!');
  }
}
