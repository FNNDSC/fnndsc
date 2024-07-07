/** * Imports ***/
import Request from './request';
import { ItemResource } from './resource';
import { UserGroupList } from './group';

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
  constructor(url, auth) {
    super(url, auth);
  }

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
   getGroups(params = null, timeout = 30000) {
    const linkRelation = 'groups';
    const resourceClass = UserGroupList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  } 

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
  put(data, timeout = 30000) {
    return this._put(data, null, timeout);
  }
}
