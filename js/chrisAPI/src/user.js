/** * Imports ***/
import Request from './request';
import { ItemResource } from './resource';

/**
 * User item resource object.
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
   * Update currently authenticated user's information (email and or password).
   *
   * @param {Object} data - user data object
   * @param {string} data.email - user email
   * @param {string} data.password - user password
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to ``this`` object
   */
  update(data, timeout = 30000) {
    const url = this.url;
    const req = new Request(this.auth, this.contentType, timeout);
    const self = this;

    return new Promise((resolve, reject) => {
      const userData = {
        template: {
          data: [{ name: 'email', value: data.email }, { name: 'password', value: data.password }],
        },
      };

      const result = req.put(url, userData);

      result
        .then(response => {
          if (response.data && response.data.collection) {
            self.collection = response.data.collection;
          }
          resolve(self);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
