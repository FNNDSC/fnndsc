/**
 * Plugin parameter item resource object representing a plugin parameter.
 */
export class PluginParameter extends ItemResource {
    /**
     * Fetch the plugin associated to this parameter item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout?: number): Promise<Plugin>;
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
     * @return {Promise<Plugin>} - JS Promise, resolves to a ``Plugin`` object
     */
    getPlugin(timeout?: number): Promise<Plugin>;
}
import { ItemResource } from "./resource";
import { Plugin } from "./plugin";
import { ListResource } from "./resource";
