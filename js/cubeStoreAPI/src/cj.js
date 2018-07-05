/**
 * Collection+Json object.
 *
 * @module cj
 */
export default class Collection {
  /**
   * Get the error message from the collection object.
   *
   * @return {*}
   */
  static getErrorMessage(collection) {
    if (collection.error) {
      return collection.error.message;
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
