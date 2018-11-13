/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';

/**
 * API abstract resource class.
 */
class Resource {
  /**
   * Constructor
   *
   * @param {string} resourceUrl - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(resourceUrl, auth) {
    /** @type {string} */
    this.url = resourceUrl;

    if (!auth) {
      throw new RequestException('Authentication object is required');
    }
    /** @type {Object} */
    this.auth = auth;

    /** @type {string} */
    this.contentType = 'application/vnd.collection+json';

    /** @type {?Object} */
    this.collection = null; // Collection+JSON collection obj
  }

  /**
   * Make a deep copy clone of this object resource.
   *
   * @return {Object} - clone object
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

/**
 * API abstract item resource class.
 */
export class ItemResource extends Resource {
  /**
   * Constructor
   *
   * @param {string} itemUrl - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(itemUrl, auth) {
    super(itemUrl, auth);

    /** @type {?Object} */
    this.item = null; // Collection+JSON item obj
  }

  /**
   * Fetch this item resource from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
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
   * Get the item's data object (REST API descriptors).
   *
   * @type {?Object}
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
   * @type {boolean}
   */
  get isEmpty() {
    if (this.item) {
      return false;
    }
    return true;
  }

  /**
   * Get an array of parameter names that can be used as properties of the data
   * object in PUT requests.
   *
   * @return {?string[]} - array of PUT data property name or null if this list
   * resource's data has not been fetched from the API yet or it doesn't support
   * PUT requests.
   */
  getPUTDataParameters() {
    if (this.collection && this.collection.template) {
      return Collection.getTemplateDescriptorNames(this.collection.template);
    }
    return null;
  }

  /**
   * Internal method to fetch a related resource from the REST API that is referenced
   * by a link relation within the item object.
   *
   * @param {string} linkRelation
   * @param {Object} ResourceClass
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``ResourceClass`` object
   * @throws {RequestException} throw error when the link relation is not found
   * @throws {RequestException} throw error if this item resource has not yet been
   * fetched from the REST API
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
    throw new RequestException('Item object has not been set!');
  }

  /**
   * Internal helper method to make a PUT request to this item resource through
   * the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {?Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.fname - file blob
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  _put(data, uploadFileObj, timeout = 30000) {
    const url = this.url;
    const req = new Request(this.auth, this.contentType, timeout);
    let putData = data;

    if (!uploadFileObj && this.contentType === 'application/vnd.collection+json') {
      putData = { template: Collection.makeTemplate(data) };
    }

    return new Promise((resolve, reject) => {
      const result = req.put(url, putData, uploadFileObj);

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
   * Internal helper method to make a DELETE request to this item resource through
   * the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``null``
   */
  _delete(timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);

    return new Promise((resolve, reject) => {
      const result = req.delete(this.url);

      result
        .then(() => {
          // change the state of this object on successfull response
          this.collection = null;
          this.item = null;
          resolve(null);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

/**
 * API abstract list resource class.
 */
export class ListResource extends Resource {
  /**
   * Constructor
   *
   * @param {string} listUrl - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(listUrl, auth) {
    super(listUrl, auth);

    /** @type {string} */
    this.queryUrl = '';

    /** @type {?Object} */
    this.searchParams = null;

    /** @type {Object} */
    this.itemClass = ItemResource;
  }

  /**
   * Fetch this list resource from the REST API using limit and offset as optional
   * parameters.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
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
   * Get an array of search parameter names that can be used as properties of the
   * ``params`` argument to the ``getSearch`` method.
   *
   * @return {?string[]} - array of search parameter names or null if this list
   * resource's data has not been fetched from the API yet.
   */
  getSearchParameters() {
    if (this.collection) {
      if (this.collection.queries) {
        const params = Collection.getQueryParameters(this.collection.queries);
        params.push('limit', 'offset');
        return params;
      }
      return ['limit', 'offset'];
    }
    return null;
  }

  /**
   * Fetch this list resource from the REST API based on search parameters.
   *
   * @param {Object} params - search parameters, the ``getSearchParameters``
   * method can be used to get a list of possible search parameters
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
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
   * Return true if the list resource object contains any data.
   *
   * @type {boolean}
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
   * @type {boolean}
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
   * @type {boolean}
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
   * @return {?Object[]}
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
   * Get an array of parameter names that can be used as properties of the data
   * object in POST requests.
   *
   * @return {?string[]} - array of POST data properties or null if this list
   * resource's data has not been fetched from the API yet or it doesn't support
   * POST requests.
   */
  getPOSTDataParameters() {
    if (this.collection && this.collection.template) {
      return Collection.getTemplateDescriptorNames(this.collection.template);
    }
    return null;
  }

  /**
   * Fetch the next resource page from the paginated REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  getNextPage(timeout = 30000) {
    return this._getNextOrPreviousPage('next', timeout);
  }

  /**
   * Fetch the previous resource page from the paginated REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  getPreviousPage(timeout = 30000) {
    return this._getNextOrPreviousPage('previous', timeout);
  }

  /**
   * Internal method to fetch the next or previous page from the paginated REST API.
   *
   * @param {string} linkRelation - either the string 'previous' or 'next'
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  _getNextOrPreviousPage(linkRelation, timeout = 30000) {
    if (this.collection) {
      const urls = Collection.getLinkRelationUrls(this.collection, linkRelation);

      if (urls.length) {
        const searchParams = new URL(urls[0]).searchParams;
        const params = {};
        let urlHasSearchParams = false;

        for (let pair of searchParams.entries()) {
          params[pair[0]] = pair[1];
          if (pair[0] !== 'offset' && pair[0] !== 'limit') {
            urlHasSearchParams = true;
          }
        }

        if (urlHasSearchParams) {
          return this.getSearch(params, timeout);
        }
        if (params.offset || params.limit) {
          return this.get(params, timeout);
        }
        return this.get(null, timeout);
      }
    }
    this.collection = null;
    this.searchParams = null;
    return Promise.resolve(this);
  }

  /**
   * Internal method to fetch a related resource from the REST API that is referenced by
   * a link relation within this list resource's collection object.
   *
   * @param {string} linkRelation
   * @param {Object} ResourceClass
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``ResourceClass`` object
   * @throws {RequestException} throw error when the link relation is not found
   * @throws {RequestException} throw error if this list resource has not yet been fetched from the REST API
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
    throw new RequestException('Collection object has not been set!');
  }

  /**
   * Internal helper method to make a POST request to this list resource through
   * the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {?Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.fname - file blob
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  _post(data, uploadFileObj, timeout = 30000) {
    const url = this.url;
    const req = new Request(this.auth, this.contentType, timeout);
    let postData = data;

    if (!uploadFileObj && this.contentType === 'application/vnd.collection+json') {
      postData = { template: Collection.makeTemplate(data) };
    }

    return new Promise((resolve, reject) => {
      const result = req.post(url, postData, uploadFileObj);

      result
        .then(response => {
          // change the state of this object on successfull response
          this.collection = null;
          this.searchParams = null;
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
}
