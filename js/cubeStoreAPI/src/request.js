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
  constructor(auth, timeout = 30000) {
    this.auth = auth;
    this.timeout = timeout;
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

    axios({
      method: 'get',
      headers: {
        Accept: self.contentType,
        'content-type': self.contentType,
      },
      url: url,
      params: params,
      auth: self.auth,
      timeout: self.timeout,
    })
      .then(function(response) {
        const cj = response;
        window.console.log('cj: ', cj);
      })
      .catch(function(error) {
        window.console.log(error);
      });
  }
}
