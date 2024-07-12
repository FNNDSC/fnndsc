/**
 * Group item resource object representing a group.
 */
export class Group extends ItemResource {
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
     * Fetch the list of group's users from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [searchParams.id] - match group-user id exactly with this number
     * @param {string} [searchParams.username] - match the username exactly with this string
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<GroupUserList>} - JS Promise, resolves to a ``GroupUserList`` object
     */
    getUsers(searchParams?: {
        limit?: number;
        offset?: number;
        id?: number;
        username?: string;
    }, timeout?: number): Promise<GroupUserList>;
    /**
     * Get a group user given the username.
     *
     * @param {string} username - group user username
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<GroupUser|null>} - JS Promise, resolves to a ``GroupUser`` object or ``null``
     */
    getUser(username: string, timeout?: number): Promise<GroupUser | null>;
    /**
     * Add a user to the group given the user's username.
     *
     * @param {string} username - user's username
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<GroupUser>} - JS Promise, resolves to a ``GroupUser`` object
     */
    adminAddUser(username: string, timeout?: number): Promise<GroupUser>;
    /**
     * Make a DELETE request to delete this group item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * Group list resource object representing a list of groups.
 */
export class GroupList extends ListResource {
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
     * Make a POST request (only admins) to this group list resource to create a new group item
     * resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.name] - group name
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: {
        name?: string;
    }, timeout?: number): Promise<GroupList>;
}
/**
 * Group user item resource object representing a group's user.
 */
export class GroupUser extends ItemResource {
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
     * Fetch the associated user from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout?: number): Promise<User>;
    /**
     * Fetch the associated group from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Group>} - JS Promise, resolves to a ``Group`` object
     */
    getGroup(timeout?: number): Promise<Group>;
    /**
     * Make a DELETE request to delete this group user item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * Group-specific user list resource object representing a list of group users.
 */
export class GroupUserList extends ListResource {
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
     * Fetch the group associated to this group-specific list of users from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Group>} - JS Promise, resolves to a ``Group`` object
     */
    getGroup(timeout?: number): Promise<Group>;
    /**
     * Make a POST request (only admins) to this group-specific user list resource to create
     * a new group user item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.username - user's username
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data: {
        username: string;
    }, timeout?: number): Promise<GroupUserList>;
}
/**
 * User-specific group list resource object representing a list of groups that an specific
 * user belongs to.
 */
export class UserGroupList extends ListResource {
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
     * Fetch the user associated to this user-specific list of groups from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<User>} - JS Promise, resolves to a ``User`` object
     */
    getUser(timeout?: number): Promise<User>;
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
import User from "./user";
