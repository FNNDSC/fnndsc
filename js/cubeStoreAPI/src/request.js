/** * Imports ***/
import axios from 'axios';
import StoreRequestException from './exception';
import Collection from './cjson';

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
    this.contentType = contentType;
    this.timeout = timeout;
  }

  /**
   * Perform a GET request to the ChRIS store.
   *
   * @param {*} url
   * @param {*} params
   * @return {*}
   */
  get(url, params) {
    const config = {
      method: 'get',
      headers: {
        Accept: this.contentType,
        'content-type': this.contentType,
      },
      url: url,
      params: params,
      timeout: this.timeout,
    };

    if (this.auth) {
      config.auth = this.auth;
    }

    return axios(config)
      .then(response => {
        return new Collection(response.data);
      })
      .catch(error => {
        Request._handleRequestError(error);
      });
  }

  /**
   * Internal method to handle errors produced by HTTP requests to the ChRIS store.
   *
   * @param {*} error
   */
  static _handleRequestError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //console.log(error.response.data);
      //console.log(error.response.status);
      //console.log(error.response.headers);
      const coll = new Collection(error.response.data);
      throw new StoreRequestException(coll.getErrorMessage());
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //console.log(error.request);
      throw new StoreRequestException(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      //console.log('Error', error.message);
      throw new StoreRequestException(error.message);
    }
    //console.log(error.config);
  }
}
