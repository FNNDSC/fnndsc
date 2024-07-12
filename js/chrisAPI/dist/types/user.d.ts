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
    * Fetch the list of user's groups from the REST API.
    *
    * @param {Object} [params=null] - page parameters object
    * @param {number} [params.limit] - page limit
    * @param {number} [params.offset] - page offset
    * @param {number} [timeout=30000] - request timeout
    *
    * @return {Promise<UserGroupList>} - JS Promise, resolves to a ``UserGroupList`` object
    */
    getGroups(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<UserGroupList>;
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
    }, timeout?: number): Promise<User>;
}
import { ItemResource } from "./resource";
import { UserGroupList } from "./group";
