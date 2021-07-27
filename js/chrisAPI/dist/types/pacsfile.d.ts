/**
 * PACS file item resource object representing a PACS file.
 */
export class PACSFile extends ItemResource {
    /**
     * Fetch the file blob associated to this file item from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Blob>} - JS Promise, resolves to a ``Blob`` object
     */
    getFileBlob(timeout?: number): Promise<Blob>;
}
/**
 * PACS file list resource object representing a list of PACS files.
 */
export class PACSFileList extends ListResource {
}
import { ItemResource } from "./resource";
import { ListResource } from "./resource";
