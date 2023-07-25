"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentList = exports.Comment = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const feed_1 = require("./feed");
/**
 * Comment item resource object representing a feed comment.
 */
class Comment extends resource_1.ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
    }
    /**
     * Fetch the feed associated to the comment item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout = 30000) {
        const linkRelation = 'feed';
        const resourceClass = feed_1.Feed;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Make a PUT request to modify this comment item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.title] - title of the comment
     * @param {string} [data.content] - content of the comment
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data, timeout = 30000) {
        return this._put(data, null, timeout);
    }
    /**
     * Make a DELETE request to delete this comment item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.Comment = Comment;
/**
 * Comment list resource object representing a list of feed comments.
 */
class CommentList extends resource_1.ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
        /** @type {Object} */
        this.itemClass = Comment;
    }
    /**
     * Fetch the feed associated to the comment list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout = 30000) {
        const linkRelation = 'feed';
        const resourceClass = feed_1.Feed;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Make a POST request to this comment list resource to create a new comment item
     * resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.title] - title of the comment
     * @param {string} [data.content] - content of the comment
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.CommentList = CommentList;
