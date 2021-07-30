/**
 * ChRIS instance item resource object uniquely representing a ChRIS instance.
 */
export default class ChrisInstance extends ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url: string, auth: {
        token: string;
    });
}
import { ItemResource } from "./resource";
