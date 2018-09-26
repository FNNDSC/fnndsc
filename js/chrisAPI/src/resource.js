/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';

/**
 * API resource objects.
 *
 * @module resource
 */
class Resource {
  /**
   * Constructor
   *
   * @param {*} response
   */
  constructor(response) {
    this.allowVerbs = response.headers.allow.split(',');
    this.collection = response.data.collection;
    this.contentType = response.headers['content-type'];
    this.auth = response.config.auth;
    this.timeout = response.config.timeout;
    this.url = Collection.getUrl(this.collection);
  }

  /**
   * Get currently authenticated user's feeds.
   *
   * @return {*}
   */
  get items() {
    return this.element.innerHTML;
  }

  /**
   * Fetch this resource from the API.
   *
   * @return {*}
   */
  get() {
    const url = this.url;
    const req = new Request(this.auth, this.contentType, this.timeout);

    return new Promise((resolve, reject) => {
      const result = req.get(url);
      result
        .then(response => {
          const lresource = new Resource(response);
          resolve(lresource);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export class ItemResource extends Resource {
  /**
   * Constructor
   *
   * @param {*} response
   */
  constructor(response) {
    super(response);
  }

  /**
   * Get currently authenticated user's feeds.
   *
   * @return {*}
   */
  get items() {
    return this.element.innerHTML;
  }
}


export class ListResource extends Resource {
  /**
   * Constructor
   *
   * @param {*} response
   */
  constructor(response) {
    super(response);
  }

  /**
   * Get currently authenticated user's feeds.
   *
   * @return {*}
   */
  get items() {
    return this.element.innerHTML;
  }
}
