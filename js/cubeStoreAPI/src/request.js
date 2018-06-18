/** * Imports ***/
import axios from 'axios';

/**
 * Custom exception object.
 *
 * @module request
 */
export class StoreRequestException extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
  }
}

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
      })
        .then(response => {
          return response.data;
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            const errMessage = error.response.data.collection.error.message;
            throw new StoreRequestException(errMessage);
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
    })
      .then(response => {
        return response.data;
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          const errMessage = error.response.data.collection.error.message;
          throw new StoreRequestException(errMessage);
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
      });
  }
}
