/** * Imports ***/
import Request from './request';
import RequestException from './exception';
import { FeedList } from './feed';

/**
 * Chris client object.
 *
 * @module client
 */
export default class Client {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    this.url = url;
    if (!auth) {
      throw new RequestException('Authentication object is required');
    }
    this.auth = auth;
    this.contentType = 'application/vnd.collection+json';
  }

  /**
   * Fetch a list of currently authenticated user's feeds.
   *
   * @param {*} params
   * @param {*} timeout
   * @return {*}
   */
  getFeeds(params = null, timeout = 30000) {
    const feedList = new FeedList(this.url, this.auth);

    return feedList.get(params, timeout);
  }

  /**
   * Create a new user account.
   *
   * @param {*} usersUrl
   * @param {*} username
   * @param {*} password
   * @param {*} email
   * @param {*} timeout
   * @return {*}
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
          resolve(response.data.collection);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Fetch a user's login authorization token.
   * @param {*} authUrl
   * @param {*} username
   * @param {*} password
   * @param {*} timeout
   *
   * @return {*}
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
}
