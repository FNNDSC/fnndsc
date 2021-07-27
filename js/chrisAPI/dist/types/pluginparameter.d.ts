/**
 * Plugin parameter item resource object representing a plugin parameter.
 */
export class PluginParameter extends ItemResource {
    /**
     * Fetch the plugin associated to this parameter item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout?: number): any;
}
/**
 * Plugin parameter list resource object representing a list of plugin parameters.
 */
export class PluginParameterList extends ListResource {
    /**
     * Fetch the plugin associated to this list of parameters from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Object} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout?: number): any;
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
