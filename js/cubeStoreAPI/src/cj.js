/**
 * Collection+Json object.
 *
 * @module cj
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
  static getLinkRelationUrls(obj, relationName) {
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
  static getItemDescriptors(item) {
    const itemObj = {};

    // collect the item's descriptors
    for (let descriptor of item.data) {
      itemObj[descriptor.name] = descriptor.value;
    }
    return itemObj;
  }
}
