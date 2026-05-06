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
  static getErrorMessage(collection: Object): string;
  /**
   * Get the list of urls for a link relation from a collection or item object.
   *
   * @param {Object} obj - Collection+Json collection or item object
   * @param {string} relationName - name of the link relation
   *
   * @return {string[]} - list of urls
   */
  static getLinkRelationUrls(obj: Object, relationName: string): string[];
  /**
   * Get an item's data (descriptors).
   *
   * @param {Object} item - Collection+Json item object
   *
   * @return {Object} - object whose properties and values are the item's descriptor names and values respectively
   */
  static getItemDescriptors(item: Object): Object;
  /**
   * Get the url of the representation given by a collection obj.
   *
   * @param {Object} collection - Collection+Json collection object
   *
   * @return {string} - url of the resource representation
   */
  static getUrl(collection: Object): string;
  /**
   * Get the total number of items from a collection object.
   *
   * @param {Object} collection - Collection+Json collection object
   *
   * @return {number} - total number of items or -1 if the collection objects
   * doesn't contain that information
   */
  static getTotalNumberOfItems(collection: Object): number;
  /**
   * Get the list of descriptor names within a collection's template object.
   *
   * @param {Object} template - Collection+Json template object
   *
   * @return {string[]} - list of descriptor names
   */
  static getTemplateDescriptorNames(template: Object): string[];
  /**
   * Get the list of descriptor names within a Collection+Json query array.
   *
   * @param {Object[]} queryArr - Collection+Json query array
   *
   * @return {string[]} - list of query parameter names
   */
  static getQueryParameters(queryArr: Object[]): string[];
  /**
   * Create an empty Collection+Json object.
   *
   * @return {Object} - template object
   */
  static createCollectionObj(): Object;
  /**
   * Make a Collection+Json template object from a regular object whose properties are
   * the item descriptors.
   *
   * @param {Object} descriptorsObj - item descriptors object
   *
   * @return {Object} - template object
   */
  static makeTemplate(descriptorsObj: Object): Object;
}
