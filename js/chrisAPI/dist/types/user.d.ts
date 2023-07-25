/**
 * User item resource object representing a user of the system.
 */
export default class User extends ItemResource {
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
     * Make a PUT request to modify this user item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.password - user password
     * @param {string} data.email - user email
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data: {
        password: string;
        email: string;
    }, timeout?: number | undefined): Promise<User>;
}
import { ItemResource } from "./resource";
