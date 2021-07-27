/**
 * Comment item resource object representing a feed comment.
 */
export class Comment extends ItemResource {
    /**
     * Fetch the feed associated to the comment item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): Promise<Feed>;
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
    put(data: {
        title?: string;
        content?: string;
    }, timeout?: number): Promise<Comment>;
    /**
     * Make a DELETE request to delete this comment item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout?: number): Promise<any>;
}
/**
 * Comment list resource object representing a list of feed comments.
 */
export class CommentList extends ListResource {
    /**
     * Fetch the feed associated to the comment list from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout?: number): Promise<Feed>;
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
    post(data: {
        title?: string;
        content?: string;
    }, timeout?: number): Promise<CommentList>;
}
import { ItemResource } from "./resource";
import { Feed } from "./feed";
import { ListResource } from "./resource";
