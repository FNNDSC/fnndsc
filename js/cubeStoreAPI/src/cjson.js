/**
 * Collection+Json object.
 *
 * @module cjson
 */
export default class Collection {
  /**
   * Constructor
   */
  constructor(data) {
    this.collectionObj = data.collection;
  }

  get collection() {
    return this.collectionObj;
  }

  set collection(coll) {
    this.collectionObj = coll;
  }

  /**
   * Get the error message from the collection object.
   *
   * @return {*}
   */
  getErrorMessage() {
    if (this.collectionObj.error) {
      return this.collectionObj.error.message;
    }
    return '';
  }

  /**
   * Get the list of urls for a link relation in a collection or item object.
   *
   * @param {*} obj
   * @param {*} relationName
   * @return {*}
   */
  static get_link_relation_urls(obj, relationName) {
    const links = obj.links.filter(link => {
      return link.rel === relationName;
    });
    return links.map(link => link.href);
  }

  /**
   * Get an item's data (descriptors) in an object.
   *
   * @param {*} item
   * @return {*}
   */
  static get_item_descriptors(item) {
    const item_obj = {};

    // collect the item's descriptors
    for (let descriptor of item.data) {
      item_obj[descriptor.name] = descriptor.value;
    }
    return item_obj;
  }
}
