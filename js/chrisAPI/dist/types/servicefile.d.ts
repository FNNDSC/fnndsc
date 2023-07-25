/**
 * Service file item resource object representing a file from an unregistered service.
 */
export class ServiceFile extends ItemResource {
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
}
/**
 * Service file list resource object representing a list of files from an unregistered service.
 */
export class ServiceFileList extends ListResource {
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
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
