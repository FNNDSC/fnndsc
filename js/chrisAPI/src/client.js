/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';
import { FeedList } from './feed';

/**
 * Chris object.
 *
 * @module client
 */
export default class Client {
  /**
   * Constructor
   *
   * @param {*} chrisUrl
   * @param {*} auth
   */
  constructor(chrisUrl, auth) {
    this.chrisUrl = chrisUrl;
    this.chrisQueryUrl = chrisUrl + 'search/';
    if (!auth) {
      throw new RequestException('Authentication object is required');
    }
    this.auth = auth;
    this.contentType = 'application/vnd.collection+json';
    this.feeds = null;
  }

  /**
   * Get currently authenticated user's feeds.
   *
   * @return {*}
   */
  getFeeds() {
    const feedList = new FeedList(this.chrisUrl, this.auth);
    const self = this;

    return new Promise((resolve, reject) => {
      const result = feedList.get();

      result
        .then(feedsData => {
          self.feeds = feedList;
          resolve(feedsData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Get currently authenticated user's information.
   *
   * @param {*} timeout
   * @return {*}
   */
  getUser(timeout = 30000) {
    const chrisUrl = this.chrisUrl;
    const req = new Request(this.auth, this.contentType, timeout);

    return new Promise((resolve, reject) => {
      Request._runAsyncTask(function*() {
        let resp;

        try {
          resp = yield req.get(chrisUrl);
          const urls = Collection.getLinkRelationUrls(resp.data.collection, 'user');
          if (urls.length) {
            const userUrl = urls[0]; // there is only a single user url
            resp = yield req.get(userUrl);
          } else {
            throw new RequestException('Missing user link relation');
          }
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(resp.data.collection);
      });
    });
  }

  /**
   * Update currently authenticated user's information (email and or password).
   *
   * @param {*} userInfoObj
   * @param {*} timeout
   * @return {*}
   */
  updateUser(userInfoObj, timeout = 30000) {
    const chrisUrl = this.chrisUrl;
    const req = new Request(this.auth, this.contentType, timeout);

    const userData = {
      template: {
        data: [
          { name: 'email', value: userInfoObj.email },
          { name: 'password', value: userInfoObj.password },
        ],
      },
    };

    return new Promise((resolve, reject) => {
      Request._runAsyncTask(function*() {
        let resp;

        try {
          resp = yield req.get(chrisUrl);
          const urls = Collection.getLinkRelationUrls(resp.data.collection, 'user');
          if (urls.length) {
            const userUrl = urls[0]; // there is only a single user url
            resp = yield req.put(userUrl, userData);
          } else {
            throw new RequestException('Missing user link relation');
          }
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(resp.data.collection);
      });
    });
  }

  /**
   * Create a new store user account.
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
   * Get a user's login authorization token.
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
