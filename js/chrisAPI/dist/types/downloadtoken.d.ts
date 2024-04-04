/**
 * Download token item resource object representing a file download token.
 */
export class DownloadToken extends ItemResource {
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
 * Download token list resource object representing a list of a user's file download tokens.
 */
export class DownloadTokenList extends ListResource {
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
     * Make a POST request to this download token list resource to create a new file download token
     * item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(timeout?: number): Promise<DownloadTokenList>;
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
