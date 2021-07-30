/**
 * Note item resource object representing a feed's note.
 */
export default class Note extends ItemResource {
    /**
     * Make a PUT request to modify this note item resource through the REST API.
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
    }, timeout?: number): Promise<Note>;
}
import { ItemResource } from "./resource";
