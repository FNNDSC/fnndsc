/**
 * Collection+Json utility object.
 */
export default class Collection {
  /**
   * Get the error message from the collection object.
   *
   * @param {Object} collection - Collection+Json collection object
   *
   * @return {string} - error message
   */
  static getErrorMessage(collection) {
    if (collection.error) {
      return collection.error.message;
    }
    return '';
  }

  /**
   * Get the list of urls for a link relation from a collection or item object.
   *
   * @param {Object} obj - Collection+Json collection or item object
   * @param {string} relationName - name of the link relation
   *
   * @return {string[]} - list of urls
   */
  static getLinkRelationUrls(obj, relationName) {
    const links = obj.links.filter((link) => {
      return link.rel === relationName;
    });
    return links.map((link) => link.href);
  }

  /**
   * Get an item's data (descriptors).
   *
   * @param {Object} item - Collection+Json item object
   *
   * @return {Object} - object whose properties and values are the item's descriptor names and values respectively
   */
  static getItemDescriptors(item) {
    const itemObj = {};

    // collect the item's descriptors
    for (let descriptor of item.data) {
      itemObj[descriptor.name] = descriptor.value;
    }
    return itemObj;
  }

  /**
   * Get the url of the representation given by a collection obj.
   *
   * @param {Object} collection - Collection+Json collection object
   *
   * @return {string} - url of the resource representation
   */
  static getUrl(collection) {
    return collection.href;
  }

  /**
   * Get the total number of items from a collection object.
   *
   * @param {Object} collection - Collection+Json collection object
   *
   * @return {number} - total number of items or -1 if the collection objects
   * doesn't contain that information
   */
  static getTotalNumberOfItems(collection) {
    if (collection.total) {
      return collection.total;
    }
    return -1;
  }

  /**
   * Get the list of descriptor names within a collection's template object.
   *
   * @param {Object} template - Collection+Json template object
   *
   * @return {string[]} - list of descriptor names
   */
  static getTemplateDescriptorNames(template) {
    return template.data.map((descriptor) => descriptor.name);
  }

  /**
   * Get the list of descriptor names within a Collection+Json query array.
   *
   * @param {Object[]} queryArr - Collection+Json query array
   *
   * @return {string[]} - list of query parameter names
   */
  static getQueryParameters(queryArr) {
    return queryArr[0].data.map((descriptor) => descriptor.name);
  }

  /**
   * Create an empty Collection+Json object.
   *
   * @return {Object} - template object
   */
  static createCollectionObj() {
    const obj = {
      href: '',
      items: [],
      links: [],
      version: '1.0',
    };
    return obj;
  }

  /**
   * Make a Collection+Json template object from a regular object whose properties are
   * the item descriptors.
   *
   * @param {Object} descriptorsObj - item descriptors object
   *
   * @return {Object} - template object
   */
  static makeTemplate(descriptorsObj) {
    const template = { data: [] };

    let i = 0;
    for (let property in descriptorsObj) {
      if (descriptorsObj.hasOwnProperty(property)) {
        template.data[i] = { name: property, value: descriptorsObj[property] };
      }
      i++;
    }
    return template;
  }
}
