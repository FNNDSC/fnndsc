/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';

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
   * @param {*} timeout
   */
  constructor(chrisUrl, auth = null, timeout = 30000) {
    this.chrisUrl = chrisUrl;
    this.chrisQueryUrl = chrisUrl + 'search/';
    this.auth = auth;
    this.timeout = timeout;
    this.contentType = 'application/vnd.collection+json';
  }

  /**
   * Get currently authenticated user's information.
   *
   * @return {*}
   */
  getUser() {
    const chrisUrl = this.chrisUrl;
    const req = new Request(this.auth, this.contentType, this.timeout);

    return new Promise((resolve, reject) => {
      Request._runAsyncTask(function*() {
        let resp;

        try {
          resp = yield req.get(chrisUrl);
          const urls = Collection.getLinkRelationUrls(resp.collection, 'user');
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
        resolve(resp.collection);
      });
    });
  }

  /**
   * Update currently authenticated user's information (email and or password).
   *
   * @param {*} userInfoObj
   * @return {*}
   */
  updateUser(userInfoObj) {
    const chrisUrl = this.chrisUrl;
    const req = new Request(this.auth, this.contentType, this.timeout);

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
          const urls = Collection.getLinkRelationUrls(resp.collection, 'user');
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
        resolve(resp.collection);
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
          resolve(response.collection);
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
          resolve(response.token);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}
