/** * Imports ***/
import Request from './request';
import RequestException from './exception';
import User from './user';
import { FeedList } from './feed';

/**
 * API client object.
 */
export default class Client {
  /**
   * Constructor
   *
   * @param {string} url - url of the ChRIS service
   * @param {Object} auth - authentication object
   * @param {string} auth.token - authentication token
   */
  constructor(url, auth) {
    /** @type {string} */
    this.url = url;
    if (!auth) {
      throw new RequestException('Authentication object is required');
    }
    /** @type {Object} */
    this.auth = auth;
  }

  /**
   * Get a paginated list of currently authenticated user's feeds (descriptors) from the
   * REST API  given query search parameters. If no search parameters is given then get
   * the default first page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {string} [searchParams.name] - match plugin name containing this string
   * @param {string} [searchParams.name_latest] - match plugin name containing this string
   * and return only the latest version
   * @param {string} [searchParams.name_exact_latest] - match plugin name exactly with this string
   * and return only the latest version
   * @param {string} [searchParams.dock_image] - match plugin docker image exactly with this string
   * @param {string} [searchParams.public_repo] - match plugin public repository exactly with this string
   * @param {string} [searchParams.type] - match plugin type with this string
   * @param {string} [searchParams.category] - match plugin category containing this string
   * @param {string} [searchParams.owner_username] - match plugin username containing this string
   * @param {string} [searchParams.description] - match plugin description containing this string
   * @param {string} [searchParams.name_title_category] - match plugin name, title or category
   * containing this string
   * @param {string} [searchParams.title] - match plugin title containing this string
   * @param {string} [searchParams.min_creation_date] - match plugin creation date after this date
   * @param {string} [searchParams.max_creation_date] - match plugin creation date before this date
   * @return {Object} - JS Promise, resolves to a ``FeedList`` object
   */
  getFeeds(searchParams = null, timeout = 30000) {
    const feedList = new FeedList(this.url, this.auth);

    return feedList.get(params, timeout);
  }

  /**
   * Create a new user account.
   *
   * @param {string} usersUrl - url of the user accounts service
   * @param {string} username - username
   * @param {string} password - password
   * @param {string} email - user email
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``User`` object
   */
  static createUser(usersUrl, username, password, email, timeout = 30000) {
    const req = new Request(undefined, 'application/vnd.collection+json', timeout);
    const userData = {
      template: {
        data: [
          { name: 'username', value: username },
          { name: 'password', value: password },
          { name: 'email', value: email },
        ],
      },
    };
    return req.post(usersUrl, userData).then(resp => {
      const coll = resp.data.collection;
      const userUrl = coll.items[0].href;
      const auth = { username: username, password: password };
      const user = new User(userUrl, auth);
      user.collection = coll;
      return user;
    });
  }

  /**
   * Fetch a user's login authorization token from the REST API.
   * @param {string} authUrl - url of the authorization service
   * @param {string} username - username
   * @param {string} password - password
   * @param {number} [timeout=30000] - request timeout
   *
   * @return {Object} - JS Promise, resolves to a ``string`` value
   */
  static getAuthToken(authUrl, username, password, timeout = 30000) {
    const req = new Request(undefined, 'application/json', timeout);
    const authData = {
      username: username,
      password: password,
    };
    return req.post(authUrl, authData).then(resp => resp.data.token);
  }

  /**
   * Helper method to run an asynchronous task defined by a task generator function.
   *
   * @param {function*()} taskGenerator - generator function
   */
  static runAsyncTask(taskGenerator) {
    Request.runAsyncTask(taskGenerator);
  }
}
