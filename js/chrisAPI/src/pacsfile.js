/** * Imports ***/
import Request from './request';
import RequestException from './exception';
import Collection from './cj';
import { ItemResource, ListResource } from './resource';
import { FileBrowserFolder } from './filebrowser';

/**
 * PACS series item resource object representing a PACS series.
 */
export class PACSSeries extends ItemResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the folder associated with this PACS series from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
   getFolder(timeout = 30000) {
    const linkRelation = 'folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  } 
}

/**
 * PACS series list resource object representing a list of PACS series.
 */
export class PACSSeriesList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PACSSeries;
  }
}


/**
 * PACS file item resource object representing a PACS file.
 */
export class PACSFile extends ItemResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the file blob associated to this file item from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
   */
  getFileBlob(timeout = 30000) {
    if (this.isEmpty) {
      throw new RequestException('Item object has not been set!');
    }
    const req = new Request(this.auth, 'application/octet-stream', timeout);
    const item = this.collection.items[0];
    const blobUrl = Collection.getLinkRelationUrls(item, 'file_resource')[0];

    return req.get(blobUrl).then(resp => resp.data);
  }

  /**
   * Fetch the parent folder of this file from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
   getParentFolder(timeout = 30000) {
    const linkRelation = 'parent_folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  } 
}

/**
 * PACS file list resource object representing a list of PACS files.
 */
export class PACSFileList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PACSFile;
  }
}


/**
 * PACS query item resource object representing a PACS query.
 */
export class PACSQuery extends ItemResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch a paginated list of PACS retrieves associated to this PACS query from the REST API 
   * given query search parameters. If no search parameters then get the default first page.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [searchParams.id] - match PACS retrieve id exactly with this number
   * @param {string} [searchParams.min_creation_date] - match PACS retrieve's creation date gte this date
   * @param {string} [searchParams.max_creation_date] - match PACS retrieve's creation date lte this date
   * @param {string} [searchParams.status] - match PACS retrieve execution status exactly with this string
   * @param {string} [searchParams.owner_username] - match PACS retrieve's owner username exactly with this string
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSRetrieveList>} - JS Promise, resolves to a ``PACSRetrieveList`` object
   */
  getRetrieves(params = null, timeout = 30000) {
    const linkRelation = 'retrieve_list';
    const resourceClass = PACSRetrieveList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Make a PUT request to modify this PACS query resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} [data.title] - title of the PACS query
   * @param {string} [data.description] - description of the PACS query
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  }

  /**
   * Make a DELETE request to delete this PACS query resource through the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise} - JS Promise
   */
  delete(timeout = 30000) {
    return this._delete(timeout);
  }
}

/**
 * PACS query list resource object representing a list of PACS-specific queries.
 */
export class PACSQueryList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PACSQuery;
  }

  /**
   * Fetch the PACS associated to this PACS query list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACS>} - JS Promise, resolves to a ``PACS`` object
   */
  getPACS(timeout = 30000) {
    const linkRelation = 'pacs';
    const resourceClass = PACS;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a POST request to this PACS query list resource to create a new PACS query 
   * item resource through the REST API.
   *
   * @param {Object} data - request JSON data object
   * @param {string} data.title - PACS query title
   * @param {string} data.query - PACS query JSON string representing a query
   * @param {string} [data.description] - PACS query description
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(data, timeout = 30000) {
    return this._post(data, null, timeout);
  }
}

/**
 * PACS query list resource object representing a list of all PACS queries.
 */
export class AllPACSQueryList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PACSQuery;
  }
}

/**
 * PACS retrieve item resource object representing a PACS retrieve.
 */
export class PACSRetrieve extends ItemResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the PACS query associated to this PACS retrieve from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSQuery>} - JS Promise, resolves to a ``PACSQuery`` object
   */
  getQuery(timeout = 30000) {
    const linkRelation = 'pacs_query';
    const resourceClass = PACSQuery;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a DELETE request to delete this PACS retrieve resource through the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise} - JS Promise
   */
  delete(timeout = 30000) {
    return this._delete(timeout);
  }
}

/**
 * PACS retrieve list resource object representing a list of PACS query-specific retrieves.
 */
export class PACSRetrieveList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PACSRetrieve;
  }

  /**
   * Fetch the PACS query associated to this PACS retrieve list from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSQuery>} - JS Promise, resolves to a ``PACSQuery`` object
   */
  getQuery(timeout = 30000) {
    const linkRelation = 'pacs_query';
    const resourceClass = PACSQuery;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Make a POST request to this PACS retrieve list resource to create a new PACS retrieve 
   * item resource through the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<this>} - JS Promise, resolves to ``this`` object
   */
  post(timeout = 30000) {
    return this._post({}, null, timeout);
  }
}

/**
 * PACS item resource object representing a PACS.
 */
export class PACS extends ItemResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Fetch the folder associated with this PACS from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
   */
   getFolder(timeout = 30000) {
    const linkRelation = 'folder';
    const resourceClass = FileBrowserFolder;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }

  /**
   * Fetch a list of PACS queries associated to this PACS from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSQueryList>} - JS Promise, resolves to a ``PACSQueryList`` object
   */
  getQueries(params = null, timeout = 30000) {
    const linkRelation = 'query_list';
    const resourceClass = PACSQueryList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
  
  /**
   * Fetch a list of PACS series associated to this PACS from the REST API.
   *
   * @param {Object} [params=null] - page parameters object
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Promise<PACSSpecificSeriesList>} - JS Promise, resolves to a ``PACSSpecificSeriesList`` object
   */
  getSeriesList(params = null, timeout = 30000) {
    const linkRelation = 'series_list';
    const resourceClass = PACSSpecificSeriesList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }   
}

/**
 * PACS list resource object representing a list of PACS.
 */
export class PACSList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PACS;
  }
}

/**
 * PACS-specific series list resource object representing a list of PACS series
 * for the PACS.
 */
export class PACSSpecificSeriesList extends ListResource {
  /**
   * Constructor
   *
   * @param {string} url - url of the resource
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   */
  constructor(url, auth = null) {
    super(url, auth);

    /** @type {Object} */
    this.itemClass = PACSSeries;
  }
}
