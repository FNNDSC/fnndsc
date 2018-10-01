/** * Imports ***/
import Request from './request';
import { ItemResource } from './resource';

/**
 * API note objects.
 *
 * @module note
 */
export default class Note extends ItemResource {
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
   * Update this note.
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
