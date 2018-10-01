/** * Imports ***/
import Collection from './cj';
import RequestException from './exception';
import { ItemResource, ListResource } from './resource';

/**
 * API uploaded file objects.
 *
 * @module uploadedfile
 */
export class UploadedFile extends ItemResource {
  /**
   * Constructor
   *
   * @param {*} url
   * @param {*} auth
   */
  constructor(url, auth) {
    super(url, auth);
  }
}

export class UploadedFileList extends ListResource {
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
   * Get the list of items' data descriptors.
   *
   * @return {*}
   */
  get items() {

    return this._getItems(UploadedFile);
  }
}
