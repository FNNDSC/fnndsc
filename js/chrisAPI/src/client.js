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
   * Fetch a list of currently authenticated user's feeds from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``FeedList`` object
   */
  getFeeds(params = null, timeout = 30000) {
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
    const result = req.post(usersUrl, userData);

    return new Promise((resolve, reject) => {
      result
        .then(response => {
          const coll = response.data.collection;
          const userUrl = coll.items[0].href;
          const auth = { username: username, password: password };

          const user = new User(userUrl, auth);
          user.collection = coll;
          user.item = coll.items[0];

          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
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
    const result = req.post(authUrl, authData);

    return new Promise((resolve, reject) => {
      result
        .then(response => {
          resolve(response.data.token);
        })
        .catch(error => {
          reject(error);
        });
    });
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
