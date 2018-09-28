/** * Imports ***/
import Request from './request';
import { ItemResource } from './resource';

/**
 * API User objects.
 *
 * @module user
 */
export default class User extends ItemResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
  }

  /**
   * Update currently authenticated user's information (email and or password).
   *
   * @param {*} userInfoObj
   * @param {*} timeout
   * @return {*}
   */
  update(userInfoObj, timeout = 30000) {
    const url = this.url;
    const req = new Request(this.auth, this.contentType, timeout);
    const self = this;

    return new Promise((resolve, reject) => {
      const userData = {
        template: {
          data: [
            { name: 'email', value: userInfoObj.email },
            { name: 'password', value: userInfoObj.password },
          ],
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
