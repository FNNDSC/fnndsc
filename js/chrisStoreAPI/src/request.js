/** * Imports ***/
import axios from 'axios';
import Collection from './cj';
import StoreRequestException from './exception';

/**
 * Http request object.
 *
 * @module request
 */
export default class Request {
  /**
   * Constructor
   */
  constructor(auth, contentType, timeout = 30000) {
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
    const config = this._getConfig(url, 'get');
    config.params = params;

    return axios(config)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        Request._handleRequestError(error);
      });
  }

  /**
   * Perform a POST request to the ChRIS store.
   *
   * @param {*} url
   * @param {*} data
   * @param {*} descriptorFile
   * @return {*}
   */
  post(url, data, descriptorFile) {
    const config = this._getConfig(url, 'post');
    config.data = data;

    if (descriptorFile) {
      config['headers']['content-type'] = 'multipart/form-data';
      const bFormData = new FormData();
      bFormData.set('name', data.name);
      bFormData.set('dock_image', data.dock_image);
      bFormData.set('public_repo', data.public_repo);
      bFormData.set('descriptor_file', descriptorFile);
      config.data = bFormData;
    }

    return axios(config)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        Request._handleRequestError(error);
      });
  }

  /**
   * Internal method to create a config file for axios.
   *
   * @param {*} url
   * @param {*} method
   * @return {*}
   */
  _getConfig(url, method) {
    const config = {
      url: url,
      method: method,
      headers: {
        Accept: this.contentType,
        'content-type': this.contentType,
      },
      timeout: this.timeout,
    };

    if (this.auth && this.auth.username && this.auth.password) {
      config.auth = this.auth;
    } else if (this.auth && this.auth.token) {
      config.headers.Authorization = 'Token ' + this.auth.token;
    }

    return config;
  }

  /**
   * Internal method to handle errors produced by HTTP requests to the ChRIS store.
   *
   * @param {*} error
   */
  static _handleRequestError(error) {
    let errMsg;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //console.log(error.response.data);
      //console.log(error.response.status);
      //console.log(error.response.headers);
      errMsg = error.response;
      if (error.response.data.collection) {
        errMsg = Collection.getErrorMessage(error.response.data.collection);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //console.log(error.request);
      errMsg = error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      //console.log('Error', error.message);
      errMsg = error.message;
    }

    throw new StoreRequestException(errMsg);
    //console.log(error.config);
  }
}
