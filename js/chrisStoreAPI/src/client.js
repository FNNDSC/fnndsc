/** * Imports ***/
import Collection from './cj';
import Request from './request';
import RequestException from './exception';

/**
 * Chris store object.
 *
 * @module client
 */
export default class StoreClient {
  /**
   * Constructor
   *
   * @param {string} storeUrl - url of the ChRIS storeservice
   * @param {Object} [auth=null] - authentication object
   * @param {string} [auth.token] - authentication token
   * @param {number} [timeout=30000] - request timeout
   */
  constructor(storeUrl, auth = null, timeout = 30000) {
    this.storeUrl = storeUrl;
    this.storeQueryUrl = storeUrl + 'search/';
    this.pipelinesUrl = '';
    this.pipelinesQueryUrl = '';
    this.auth = auth;
    this.timeout = timeout;
    this.contentType = 'application/vnd.collection+json';
  }

  /**
   * Get a paginated list of plugin data (descriptors) given query search
   * parameters. If no search parameters is given then get the default first
   * page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {string} [searchParams.name] - match plugin name containing this string
   * @param {string} [searchParams.name_latest] - match plugin name containing this string
   * and return only the latest version
   * @param {string} [searchParams.name_exact_latest] - match plugin name exactly with this string
   * and return only the latest version
   * @param {string} [searchParams.dock_image] - match plugin docker image exactly with this string
   * @param {string} [searchParams.public_repo] - match plugin public repository exactly with this string
   * @param {string} [searchParams.type] - match plugin type with this string
   * @param {string} [searchParams.category] - match plugin category containing this string
   * @param {string} [searchParams.owner_username] - match plugin username containing this string
   * @param {string} [searchParams.description] - match plugin description containing this string
   * @param {string} [searchParams.name_title_category] - match plugin name, title or category
   * containing this string
   * @param {string} [searchParams.title] - match plugin title containing this string
   * @param {string} [searchParams.min_creation_date] - match plugin creation date after this date
   * @param {string} [searchParams.max_creation_date] - match plugin creation date before this date
   * @return {Object} - JS Promise
   */
  getPlugins(searchParams = null) {
    let url = this.storeUrl;

    if (searchParams) {
      // then it's a query and should use the query url
      url = this.storeQueryUrl;
    }
    return this._fetchCollection(url, searchParams).then(coll => {
      return StoreClient.getDataFromCollection(coll, 'list');
    });
  }

  /**
   * Get a plugin's information (descriptors) given its ChRIS store id.
   *
   * @param {number} id - plugin id
   * @return {Object} - JS Promise
   */
  getPlugin(id) {
    const searchParams = { id: id };
    const url = this.storeQueryUrl;

    return this._fetchCollection(url, searchParams).then(coll => {
      if (coll.items.length) {
        return StoreClient.getDataFromCollection(coll, 'item');
      }
      const errMsg = 'Could not find plugin with id: ' + id;
      throw new RequestException(errMsg);
    });
  }

  /**
   * Get a plugin's paginated parameters given its ChRIS store id.
   *
   * @param {number} pluginId - plugin id
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @return {Object} - JS Promise
   */
  getPluginParameters(pluginId, params = null) {
    const url = this.storeQueryUrl;
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        let coll;
        let result = {
          data: [],
          hasNextPage: false,
          hasPreviousPage: false,
        };

        try {
          coll = yield self._fetchCollection(url, { id: pluginId });
          if (coll.items.length === 0) {
            const errMsg = 'Could not find plugin with id: ' + pluginId;
            throw new RequestException(errMsg);
          }
          const parametersLinks = Collection.getLinkRelationUrls(coll.items[0], 'parameters');
          if (parametersLinks.length) {
            coll = yield self._fetchCollection(parametersLinks[0], params); // there can only be a single parameters link
            result = StoreClient.getDataFromCollection(coll, 'list');
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(result);
      });
    });
  }

  /**
   * Internal method to fetch a collection object from a resource url.
   *
   * @param {string} url - url
   * @param {Object} [searchParams=null] - search parameters
   * @return {Object} - JS Promise
   */
  _fetchCollection(url, searchParams = null) {
    const req = new Request(this.auth, this.contentType, this.timeout);

    return req.get(url, searchParams).then(resp => resp.data.collection);
  }

  /**
   * Add a new plugin to the ChRIS store.
   *
   * @param {string} name - plugin name
   * @param {string} dockImage - plugin docker image
   * @param {Object} descriptorFile - file blob
   * @param {string} publicRepo - url of the plugin public repository
   * @return {Object} - JS Promise
   */
  addPlugin(name, dockImage, descriptorFile, publicRepo) {
    const req = new Request(this.auth, this.contentType, this.timeout);
    const data = {
      name: name,
      dock_image: dockImage,
      public_repo: publicRepo,
    };

    return req
      .post(this.storeUrl, data, { descriptor_file: descriptorFile })
      .then(resp => StoreClient.getDataFromCollection(resp.data.collection, 'item'));
  }

  /**
   * Modify an existing plugin in the ChRIS store.
   *
   * @param {number} id - plugin id
   * @param {string} publicRepo - url of the plugin public repository
   * @param {string} newOwner - username of a new owner for the plugin
   * @return {Object} - JS Promise
   */
  modifyPlugin(id, publicRepo = '', newOwner = '') {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        const req = new Request(self.auth, self.contentType, self.timeout);
        let resp;

        try {
          const searchParams = { id: id };
          resp = yield req.get(self.storeQueryUrl, searchParams);
          const coll = resp.data.collection;

          if (coll.items.length) {
            const url = coll.items[0].href;
            let data = {};

            if (publicRepo) {
              data.public_repo = publicRepo;
            } else {
              data.public_repo = coll.items[0].data.filter(descriptor => {
                return descriptor.name === 'public_repo';
              })[0].value;
            }
            if (newOwner) {
              data.owner = newOwner;
            }

            if (self.contentType === 'application/vnd.collection+json') {
              data = { template: Collection.makeTemplate(data) };
            }
            resp = yield req.put(url, data);
          } else {
            const errMsg = 'Could not find plugin with id: ' + id;
            throw new RequestException(errMsg);
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(StoreClient.getDataFromCollection(resp.data.collection, 'item'));
      });
    });
  }

  /**
   * Remove an existing plugin from the ChRIS store.
   *
   * @param {number} id - plugin id
   * @return {Object} - JS Promise
   */
  removePlugin(id) {
    const self = this;

    return new Promise(function(resolve, reject) {
      StoreClient.runAsyncTask(function*() {
        const req = new Request(self.auth, self.contentType, self.timeout);
        const searchParams = { id: id };
        let resp;

        try {
          resp = yield req.get(self.storeQueryUrl, searchParams);
          const coll = resp.data.collection;

          if (coll.items.length) {
            const url = coll.items[0].href;
            resp = yield req.delete(url);
          } else {
            const errMsg = 'Could not find plugin with id: ' + id;
            throw new RequestException(errMsg);
          }
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve();
      });
    });
  }

  /**
   * Get a paginated list of pipeline data (descriptors) given query search
   * parameters. If no search parameters is given then get the default first
   * page.
   *
   * @param {Object} [searchParams=null] - search parameters
   * @param {number} [searchParams.limit] - page limit
   * @param {number} [searchParams.offset] - page offset
   * @param {string} [searchParams.name] - match pipeline name containing this string
   * @param {string} [searchParams.category] - match pipeline category containing this string
   * @param {string} [searchParams.owner_username] - match pipeline's owner username exactly with this string
   * @param {string} [searchParams.description] - match pipeline description containing this string
   * @param {string} [searchParams.authors] - match pipeline authors containing this string
   * @param {string} [searchParams.min_creation_date] - match plugin creation date after this date
   * @param {string} [searchParams.max_creation_date] - match plugin creation date before this date
   * @param {number} [searchParams.id] - match pipeline id exactly with this number
   * @return {Object} - JS Promise
   */
  getPipelines(searchParams = null) {
    const storeUrl = this.storeUrl;

    const fetchData = (url, searchParams) =>
      this._fetchCollection(url, searchParams).then(coll => {
        return StoreClient.getDataFromCollection(coll, 'list');
      });

    if (searchParams) {
      if (this.pipelinesQueryUrl) {
        return fetchData(this.pipelinesQueryUrl, searchParams);
      } else {
        return this._fetchCollection(storeUrl).then(coll => {
          this.setPipelinesUrls(coll);
          return fetchData(this.pipelinesQueryUrl, searchParams);
        });
      }
    } else {
      if (this.pipelinesUrl) {
        return fetchData(this.pipelinesUrl);
      } else {
        return this._fetchCollection(storeUrl).then(coll => {
          this.setPipelinesUrls(coll);
          return fetchData(this.pipelinesUrl);
        });
      }
    }
  }

  /**
   * Get a pipeline's information (descriptors) given its ChRIS store id.
   *
   * @param {number} id - pipeline id
   * @return {Object} - JS Promise
   */
  getPipeline(id) {
    const storeUrl = this.storeUrl;
    const searchParams = { id: id };

    const fetchData = (url, searchParams) =>
      this._fetchCollection(url, searchParams).then(coll => {
        if (coll.items.length) {
          return StoreClient.getDataFromCollection(coll, 'item');
        }
        const errMsg = 'Could not find pipeline with id: ' + id;
        throw new RequestException(errMsg);
      });

    if (this.pipelinesQueryUrl) {
      return fetchData(this.pipelinesQueryUrl, searchParams);
    } else {
      return this._fetchCollection(storeUrl).then(coll => {
        this.setPipelinesUrls(coll);
        return fetchData(this.pipelinesQueryUrl, searchParams);
      });
    }
  }

  /**
   * Set the url of the pipelines from a collection object.
   *
   * @param {Object} coll - collection object
   */
  setPipelinesUrls(coll) {
    this.pipelinesUrl = Collection.getLinkRelationUrls(coll, 'pipelines');
    this.pipelinesQueryUrl = this.pipelinesUrl + 'search/';
  }

  /**
   * Get currently authenticated user's information.
   *
   * @return {Object} - JS Promise
   */
  getUser() {
    const storeUrl = this.storeUrl;
    const req = new Request(this.auth, this.contentType, this.timeout);

    return new Promise((resolve, reject) => {
      StoreClient.runAsyncTask(function*() {
        let resp;

        try {
          resp = yield req.get(storeUrl);
          let userUrls = Collection.getLinkRelationUrls(resp.data.collection, 'user');
          resp = yield req.get(userUrls[0]); // there is only a single user url
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(StoreClient.getDataFromCollection(resp.data.collection, 'item'));
      });
    });
  }

  /**
   * Update currently authenticated user's information (email and or password).
   *
   * @param {Object} userInfoObj - collection object
   * @param {string} userInfoObj.email - user's email
   * @param {string} userInfoObj.password - user's password
   * @return {Object} - JS Promise
   */
  updateUser(userInfoObj) {
    const storeUrl = this.storeUrl;
    const req = new Request(this.auth, this.contentType, this.timeout);

    const userData = {
      template: {
        data: [
          { name: 'email', value: userInfoObj.email },
          { name: 'password', value: userInfoObj.password },
        ],
      },
    };

    return new Promise((resolve, reject) => {
      StoreClient.runAsyncTask(function*() {
        let resp;

        try {
          resp = yield req.get(storeUrl);
          let userUrls = Collection.getLinkRelationUrls(resp.data.collection, 'user');
          resp = yield req.put(userUrls[0], userData); // there is only a single user url
        } catch (ex) {
          reject(ex);
          return;
        }

        resolve(StoreClient.getDataFromCollection(resp.data.collection, 'item'));
      });
    });
  }

  /**
   * Create a new store user account.
   *
   * @param {string} usersUrl - url of the user accounts service
   * @param {string} username - user's username
   * @param {string} password - user's password
   * @param {string} email - user's email
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise
   */
  static createUser(usersUrl, username, password, email, timeout = 30000) {
    const req = new Request(undefined, 'application/vnd.collection+json', timeout);
    const userData = {
      template: {
        data: [
          { name: 'username', value: username },
          { name: 'password', value: password },
          { name: 'email', value: email },
        ],
      },
    };
    return req
      .post(usersUrl, userData)
      .then(resp => StoreClient.getDataFromCollection(resp.data.collection, 'item'));
  }

  /**
   * Get a user's login authorization token.
   * @param {string} authUrl - url of the authentication service
   * @param {string} username - user's username
   * @param {string} password - user's password
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise
   */
  static getAuthToken(authUrl, username, password, timeout = 30000) {
    const req = new Request(undefined, 'application/json', timeout);
    const authData = {
      username: username,
      password: password,
    };
    return req.post(authUrl, authData).then(resp => resp.data.token);
  }

  /**
   * Helper method to run an asynchronous task defined by a task generator function.
   *
   * @param {function*()} taskGenerator - generator function
   */
  static runAsyncTask(taskGenerator) {
    Request.runAsyncTask(taskGenerator);
  }

  /**
   * Get the data object from a collection object.
   *
   * @param {Object} coll - collection object
   * @param {string} [collection_type='item'] - collection type, either 'list' or 'item'
   * @return {Object} - result object
   */
  static getDataFromCollection(coll, collection_type = 'item') {
    const result = {};

    if (collection_type === 'list') {
      result.data = [];

      // for each item get its data
      for (let item of coll.items) {
        result.data.push(Collection.getItemDescriptors(item));
      }
      const next = Collection.getLinkRelationUrls(coll, 'next');
      result.hasNextPage = next.length ? true : false;
      const previous = Collection.getLinkRelationUrls(coll, 'previous');
      result.hasPreviousPage = previous.length ? true : false;
    } else {
      result.data = Collection.getItemDescriptors(coll.items[0]);
    }
    return result;
  }

  /*export const login = credentials => {
    return axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
      // process response somehow
    });
  };*/
}
