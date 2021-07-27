/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';

/**
 * API abstract resource class.
 */
export class Resource {
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
   * Return true if the resource object contains any data.
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
   * Make a deep copy clone of this object resource.
   *
   * @return {Resource} - clone object
   */
  clone() {
    return Resource.cloneObj(this);
  }

  /**
   * Helper method to make a deep copy clone of the passed object resource.
   *
   * @param {Object} obj - object to be cloned
   *
   * @return {*} - clone object
   */
  static cloneObj(obj) {
    const cloneObj = Object.create(Object.getPrototypeOf(obj));

    for (let prop in obj) {
      if (obj[prop] !== null && typeof obj[prop] === 'object') {
        cloneObj[prop] = JSON.parse(JSON.stringify(obj[prop]));
      } else {
        cloneObj[prop] = obj[prop];
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
  }

  /**
   * Fetch this item resource from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  get(timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);

    return req.get(this.url).then((resp) => {
      // change the state of this object on successfull response
      this.collection = null;
      if (resp.data && resp.data.collection) {
        this.collection = resp.data.collection;
      }
      return this;
    });
  }

  /**
   * Get the item's data object (REST API descriptors).
   *
   * @type {?Object}
   */
  get data() {
    if (this.isEmpty) {
      return null;
    }
    return Collection.getItemDescriptors(this.collection.items[0]);
  }

  /**
   * Get an array of parameter names that can be used as properties of the data
   * object in PUT requests.
   *
   * @return {?string[]} - array of PUT data property name or null if this list
   * resource's data has not been fetched from the API yet or it doesn't support
   * PUT requests.
   */
  getPUTParameters() {
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
   * @param {Object} [searchParams=null] - search parameters object which is resource-specific
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Promise<ResourceClass>} - JS Promise, resolves to a ``ResourceClass`` object
   * @throws {RequestException} throw error if this item resource has not yet been
   * fetched from the REST API
   * @throws {RequestException} throw error when the link relation is not found
   */
  _getResource(linkRelation, ResourceClass, searchParams = null, timeout = 30000) {
    if (this.isEmpty) {
      throw new RequestException('Item object has not been set!');
    }
    const item = this.collection.items[0];
    const urls = Collection.getLinkRelationUrls(item, linkRelation);

    if (!urls.length) {
      const errMsg = 'Missing "' + linkRelation + '" link relation!';
      throw new RequestException(errMsg);
    }
    const resourceUrl = urls[0];
    const resourceObj = new ResourceClass(resourceUrl, this.auth);
    if (searchParams) {
      return resourceObj.get(searchParams, timeout);
    }
    return resourceObj.get(timeout);
  }

  /**
   * Internal helper method to make a PUT request to this item resource through
   * the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {?Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.fname - file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  _put(data, uploadFileObj, timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);
    let putData = data;

    if (!uploadFileObj && this.contentType === 'application/vnd.collection+json') {
      putData = { template: Collection.makeTemplate(data) };
    }
    return req.put(this.url, putData, uploadFileObj).then((resp) => {
      // change the state of this object on successfull response
      this.collection = null;
      if (resp.data && resp.data.collection) {
        this.collection = resp.data.collection;
      }
      return this;
    });
  }

  /**
   * Internal helper method to make a DELETE request to this item resource through
   * the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise} - JS Promise
   */
  _delete(timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);

    return req.delete(this.url).then(() => {
      // change the state of this object on successfull response
      this.collection = null;
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
   * Fetch this list resource from the REST API based on search parameters. If
   * no search parameters then get the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters object which is
   * resource-specific, the ``getSearchParameters`` method can be used to get a list
   * of possible search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  get(searchParams = null, timeout = 30000) {
    const req = new Request(this.auth, this.contentType, timeout);

    const updateInternalState = (resp) => {
      // change the state of this object on successfull response
      this.collection = null;
      this.searchParams = searchParams;

      if (resp.data && resp.data.collection) {
        this.collection = resp.data.collection;

        if (this.collection.queries && this.collection.queries.length) {
          this.queryUrl = this.collection.queries[0].href;
        }
      }
      return this;
    };

    if (searchParams) {
      for (let prop in searchParams) {
        if (searchParams.hasOwnProperty(prop) && prop !== 'limit' && prop !== 'offset') {
          // here we assume a fixed queryUrl form but API resource objecs are more flexible than this
          this.queryUrl = this.queryUrl || this.url + 'search/';

          return req.get(this.queryUrl, searchParams).then(updateInternalState);
        }
      }
      return req.get(this.url, searchParams).then(updateInternalState);
    }
    return req.get(this.url).then(updateInternalState);
  }

  /**
   * Get an array of search parameter names that can be used as properties of the
   * ``searchParams`` argument to the ``get`` method.
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
   * Get an item resource object given its id from the list of items in this
   * list resource object.
   *
   * @param {number} id - item id
   *
   * @return {Object} - an instance of ``this.itemClass``
   */
  getItem(id) {
    if (this.isEmpty) {
      return null;
    }
    const items = this.collection.items.filter(
      (item) => Collection.getItemDescriptors(item).id === id
    );
    if (!items.length) {
      return null;
    }
    const itemResource = new this.itemClass(items[0].href, this.auth);
    itemResource.collection = Collection.createCollectionObj();
    itemResource.collection.items.push(items[0]);
    itemResource.collection.href = items[0].href;
    return itemResource;
  }

  /**
   * Get an array of item resource objects corresponding to the items in this
   * list resource object.
   *
   * @return {?Object[]}
   */
  getItems() {
    if (this.isEmpty) {
      return [];
    }
    return this.collection.items.map((item) => {
      const itemResource = new this.itemClass(item.href, this.auth);
      itemResource.collection = Collection.createCollectionObj();
      itemResource.collection.items.push(item);
      itemResource.collection.href = item.href;
      return itemResource;
    });
  }

  /**
   * Get the list of item data objects (REST API descriptors).
   *
   * @type {?Object[]}
   */
  get data() {
    if (this.isEmpty) {
      return null;
    }
    const data = [];
    // for each item get its data
    for (let item of this.collection.items) {
      data.push(Collection.getItemDescriptors(item));
    }
    return data;
  }

  /**
   * Get the total count of items of the entire collection across pages in the
   * paginated REST API. Return -1 if no data has been fetched or the total
   * number of items info is not available from the fetched data.
   *
   * @type {number}
   */
  get totalCount() {
    if (this.collection) {
      return Collection.getTotalNumberOfItems(this.collection);
    }
    return -1;
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
   * Get an array of parameter names that can be used as properties of the data
   * object in POST requests.
   *
   * @return {?string[]} - array of POST data properties or null if this list
   * resource's data has not been fetched from the API yet or it doesn't support
   * POST requests.
   */
  getPOSTParameters() {
    if (this.collection && this.collection.template) {
      return Collection.getTemplateDescriptorNames(this.collection.template);
    }
    return null;
  }

  /**
   * Internal method to fetch a related resource from the REST API that is
   * referenced by a link relation within this list resource's collection object.
   *
   * @param {string} linkRelation
   * @param {Object} ResourceClass
   * @param {Object} [searchParams=null] - search parameters object which is resource-specific
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<ResourceClass>} - JS Promise, resolves to a ``ResourceClass`` object
   * @throws {RequestException} throw error if this list resource has not yet
   * been fetched from the REST API
   * @throws {RequestException} throw error when the link relation is not found
   */
  _getResource(linkRelation, ResourceClass, searchParams = null, timeout = 30000) {
    if (!this.collection) {
      throw new RequestException('Collection object has not been set!');
    }
    const urls = Collection.getLinkRelationUrls(this.collection, linkRelation);

    if (!urls.length) {
      const errMsg = 'Missing "' + linkRelation + '" link relation!';
      throw new RequestException(errMsg);
    }
    const resourceUrl = urls[0];
    const resourceObj = new ResourceClass(resourceUrl, this.auth);

    if (searchParams) {
      return resourceObj.get(searchParams, timeout);
    }
    return resourceObj.get(timeout);
  }

  /**
   * Internal helper method to make a POST request to this list resource through
   * the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {?Object} uploadFileObj - custom file object
   * @param {Object} uploadFileObj.fname - file blob
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  _post(data, uploadFileObj, timeout = 30000) {
    const url = this.url;
    const req = new Request(this.auth, this.contentType, timeout);
    let postData = data;

    if (!uploadFileObj && this.contentType === 'application/vnd.collection+json') {
      postData = { template: Collection.makeTemplate(data) };
    }

    return req.post(url, postData, uploadFileObj).then((resp) => {
      // change the state of this object on successfull response
      this.collection = null;
      this.searchParams = null;
      if (resp.data && resp.data.collection) {
        this.collection = resp.data.collection;
      }
      return this;
    });
  }
}
