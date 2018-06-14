/** * Imports ***/
import axios from 'axios';

/**
 * Http request object.
 *
 * @module request
 */
export default class Request {
  /**
   * Constructor
   */
  constructor(auth, contentType = 'application/vnd.collection+json', timeout = 30000) {
    this.auth = auth;
    this.timeout = timeout;
    this.contentType = contentType;
  }

  /**
   * Internal method to make a GET request to the ChRIS store.
   *
   * @param {*} url
   * @param {*} params
   * @return {*}
   */
  get(url, params) {
    let self = this;

    if (self.auth) {
      return axios({
        method: 'get',
        headers: {
          Accept: self.contentType,
          'content-type': self.contentType,
        },
        url: url,
        params: params,
        auth: self.auth,
        timeout: self.timeout,
      });
    }

    return axios({
      method: 'get',
      headers: {
        Accept: self.contentType,
        'content-type': self.contentType,
      },
      url: url,
      params: params,
      timeout: self.timeout,
    });
  }
}
