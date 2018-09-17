/** * Imports ***/
import axios from 'axios';
import Collection from './cj';
import RequestException from './exception';

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
   * Perform a GET request.
   *
   * @param {*} url
   * @param {*} params
   * @return {*}
   */
  get(url, params) {
    const config = this._getConfig(url, 'get');
    config.params = params;

    return Request._callAxios(config);
  }

  /**
   * Perform a POST request.
   *
   * @param {*} url
   * @param {*} data
   * @param {*} uploadFile
   * @return {*}
   */
  post(url, data, uploadFile) {
    return this._postOrPut('post', url, data, uploadFile);
  }

  /**
   * Perform a PUT request.
   *
   * @param {*} url
   * @param {*} data
   * @param {*} uploadFile
   * @return {*}
   */
  put(url, data, uploadFile) {
    return this._postOrPut('put', url, data, uploadFile);
  }

  /**
   * Perform a DELETE request.
   *
   * @param {*} url
   */
  delete(url) {
    const config = this._getConfig(url, 'delete');

    return Request._callAxios(config);
  }

  /**
   * Internal method to make either a POST or PUT request.
   *
   * @param {*} requestMethod
   * @param {*} url
   * @param {*} data
   * @param {*} uploadFile
   * @return {*}
   */
  _postOrPut(requestMethod, url, data, uploadFile) {
    const config = this._getConfig(url, requestMethod);
    config.data = data;

    if (uploadFile) {
      config['headers']['content-type'] = 'multipart/form-data';
      const bFormData = new FormData();

      for (let property in data) {
        if (data.hasOwnProperty(property)) {
          bFormData.set(property, data[property]);
        }
      }
      bFormData.set('fname', uploadFile);
      config.data = bFormData;
    }

    return Request._callAxios(config);
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
   * Internal method to make an axios request.
   *
   * @param {*} config
   * @return {*}
   */
  static _callAxios(config) {
    return axios(config)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        Request._handleRequestError(error);
      });
  }

  /**
   * Internal method to handle errors produced by HTTP requests.
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

    throw new RequestException(errMsg);
    //console.log(error.config);
  }
}
