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
  constructor(chrisUrl, auth, timeout = 30000) {
    this.chrisUrl = chrisUrl;
    this.chrisQueryUrl = chrisUrl + 'search/';
    if (!auth) {
      throw new RequestException('Authentication object is required');
    }
    this.auth = auth;
    this.timeout = timeout;
    this.contentType = 'application/vnd.collection+json';
  }

  /**
   * Get currently authenticated user's feeds.
   *
   * @return {*}
   */
  getFeeds() {
    const chrisUrl = this.chrisUrl;
    const req = new Request(this.auth, this.contentType, this.timeout);

    return new Promise((resolve, reject) => {
      const result = req.get(chrisUrl);
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
   * Create a custom obj representing the resource in the response.
   * @param {*} response
   *
   * @return {*}
   */
  static createCustomResponseObj(response) {
    const config = response.config;
    const allowVerbs = response.headers.allow.split(',');
    const collection = response.data.collection;
    const contentType = response.headers['content-type'] || 'application/vnd.collection+json';
    const customObj = {};

    const req = new Request(config.auth, contentType, config.timeout);

    if (allowVerbs.indexOf('GET') !== -1) {
      customObj.get = function() {
        return req.get(Collection.getUrl(collection));
      };
    }

    if (allowVerbs.indexOf('POST') !== -1) {
      customObj.post = function(data, uploadFileObj = null) {
        const url = Collection.getUrl(collection);

        return req.post(url, data, uploadFileObj);
      };
    }

    if (allowVerbs.indexOf('PUT') !== -1) {
      customObj.put = function(data, uploadFileObj = null) {
        const url = Collection.getUrl(collection);

        return req.put(url, data, uploadFileObj);
      };
    }

    if (allowVerbs.indexOf('DELETE') !== -1) {
      customObj.delete = function() {
        return req.delete(Collection.getUrl(collection));
      };
    }

    for (let link of collection.links) {
      let methodName = 'get_' + link.rel;

      if (customObj.hasOwnProperty(methodName)) {
        // don't keep a method for a link relation with multiple elements
        delete customObj[methodName];
      } else {
        customObj[methodName] = () => req.get(link.href);
      }
    }

    return customObj;
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
