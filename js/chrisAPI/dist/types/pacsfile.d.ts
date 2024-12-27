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
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the folder associated with this PACS series from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
     */
    getFolder(timeout?: number): Promise<FileBrowserFolder>;
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
    constructor(url: string, auth: {
        token: string;
    });
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
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the file blob associated to this file item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
     */
    getFileBlob(timeout?: number): Promise<Blob>;
    /**
     * Fetch the parent folder of this file from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
     */
    getParentFolder(timeout?: number): Promise<FileBrowserFolder>;
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
    constructor(url: string, auth: {
        token: string;
    });
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
    constructor(url: string, auth: {
        token: string;
    });
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
    getRetrieves(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PACSRetrieveList>;
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
    put(data: {
        title?: string;
        description?: string;
    }, timeout?: number): Promise<PACSQuery>;
    /**
     * Make a DELETE request to delete this PACS query resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
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
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the PACS associated to this PACS query list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACS>} - JS Promise, resolves to a ``PACS`` object
     */
    getPACS(timeout?: number): Promise<PACS>;
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
    post(data: {
        title: string;
        query: string;
        description?: string;
    }, timeout?: number): Promise<PACSQueryList>;
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
    constructor(url: string, auth: {
        token: string;
    });
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
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the PACS query associated to this PACS retrieve from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACSQuery>} - JS Promise, resolves to a ``PACSQuery`` object
     */
    getQuery(timeout?: number): Promise<PACSQuery>;
    /**
     * Make a DELETE request to delete this PACS retrieve resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
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
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the PACS query associated to this PACS retrieve list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<PACSQuery>} - JS Promise, resolves to a ``PACSQuery`` object
     */
    getQuery(timeout?: number): Promise<PACSQuery>;
    /**
     * Make a POST request to this PACS retrieve list resource to create a new PACS retrieve
     * item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(timeout?: number): Promise<PACSRetrieveList>;
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
    constructor(url: string, auth: {
        token: string;
    });
    /**
     * Fetch the folder associated with this PACS from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserFolder>} - JS Promise, resolves to a ``FileBrowserFolder`` object
     */
    getFolder(timeout?: number): Promise<FileBrowserFolder>;
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
    getQueries(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PACSQueryList>;
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
    getSeriesList(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<PACSSpecificSeriesList>;
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
    constructor(url: string, auth: {
        token: string;
    });
}
/**
 * PACS-specific series list resource object representing a list of PACS series
 * for the PACS.
 */
export class PACSSpecificSeriesList extends ListResource {
}
import { ItemResource } from "./resource";
import { FileBrowserFolder } from "./filebrowser";
import { ListResource } from "./resource";
