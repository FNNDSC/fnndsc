/**
 * File browser path file item resource object representing a generic browser file.
 */
export class FileBrowserPathFile extends ItemResource {
    /**
     * Fetch the file blob associated to this browser file item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
     * @throws {RequestException} throw error if this item resource has not yet been
     * fetched from the REST API
     */
    getFileBlob(timeout?: number): Promise<Blob>;
}
/**
 * File browser path file list resource object representing a list of all
 * browser files directly under a folder.
 */
export class FileBrowserPathFileList extends ListResource {
}
/**
 * File browser path item resource object representing a file browser path.
 */
export class FileBrowserPath extends ItemResource {
    /**
     * Fetch the paginated list of files directly under this file browser path from the REST API.
     *
     * @param {Object} [params=null] - page parameters
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FileBrowserPathFileList>} - JS Promise, resolves to a ``FileBrowserPathFileList`` object
     */
    getFiles(params?: {
        limit?: number;
        offset?: number;
    }, timeout?: number): Promise<FileBrowserPathFileList>;
}
/**
 * File browser path list resource object representing the initial page of the
 * collection of file browser paths.
 */
export class FileBrowserPathList extends ListResource {
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
