# ChRIS Store API
JavaScript6 client for the ChRIS Store API.


## Usage

``` javascript
import Client from '@fnndsc/chrisstoreapi';

const chrisStoreUrl = 'http://localhost:8010/api/v1/';
const usersUrl = chrisStoreUrl + 'users/';
const authUrl = chrisStoreUrl + 'auth-token/';
let authToken;
let resp;


// create a new user
resp = Client.createUser(usersUrl, 'user1', 'user1pass', 'user1@gmail.com');
resp
  .then(user => {

    window.console.log('New user: ', user);
  })
  .catch(error => {

    window.console.log('Error!!!: ', error);
  });


// fetch a user auth token
resp = Client.getAuthToken(authUrl, 'cube', 'cube1234');
resp
  .then(token => {

    window.console.log('Token: ', token);
    authToken = token;
  })
  .catch(error => {

    window.console.log('Error!!!: ', error);
  });

```

The ChRIS Store Javascript client API takes an object oriented approach in which every API resource object is an instance
of a Javascript class that inherits from either of two base classes:

* ``ListResource`` (an object modeling a collection of items)
* ``ItemResource`` (an object modeling an individual item in a collection of items)

These model the two general type of REST API resources available from a ChRIS Store server.

In addition to methods and properties provided by these base classes every resource object returned by
the client API has additional methods to fetch its associated resources (item or list resources)
from the ChRIS Store REST API. It can also have ``get``, ``post``, ``put`` and ``delete`` methods as allowed by
the REST API. In particular every object inherits a ``get`` method that updates the internal state of the object
with the new data fetched from the ChRIS Store server. A `clone` method is provided to cover the case when a reference
to the previous object state is desired. This method returns a new instance of the same class as the cloned object.

All methods that fetch a resource from the REST API return a JS Promise which is passed the corresponding resource
object as an argument to the fulfillment callback.

All resources can be fetched from the REST API starting with a ``client`` object as in the following examples:


``` javascript

// create a new client instance  without an auth object to make allowed unauthenticated requests
let client = new Client(chrisStoreUrl);

// fetch a subset of the plugin metas in the store corresponding to the page determined by offset and limit
let searchParams = { limit: 20, offset:0 };

resp = client.getPluginMetas(searchParams);
resp
  .then(plgMetas => {

    window.console.log('Plugin meta list: ', plgMetas);

    // the hasNextPage/hasPreviousPage property of any list resource object informs whether
    // there is a next/previous page available from the paginated REST API
    window.console.log('Is there a next page?: ', plgMetas.hasNextPage);
    window.console.log('Is there a previous page?: ', plgMetas.hasPreviousPage);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });

// fetch a subset of the plugins in the store corresponding to the page determined by offset and limit
resp = client.getPlugins(searchParams);
resp
  .then(plugins => {

    window.console.log('Plugin list: ', plugins);

    // the ``data`` property of any resource object can be used to get its data
    // here we got the first page of a paginated list of data objects (plugin REST API descriptors)
    let i = 0;
    for (let dataObj of plugins.data) {
        window.console.log('Data item ' + i + ' of the plugin list resource object: ', dataObj);
        i++;
    }

    // the ``getItems`` helper method of any list resource obj can be used to create an array of
    // the individual item resource objects in the list
    // here we retrieve an array of ``Plugin`` item resource objects from ``plugins``
    const pluginArray = plugins.getItems();
    let plugin = pluginArray[0]
    window.console.log(plugin.data);

    // the ``getItem`` helper method of any list resource obj can be used to create a single item
    // resource object given it's id as long as an item with that id is in the list
    // here we create a ``Plugin`` item resource object from ``plugins``
    plugin = plugins.getItem(pluginArray[0].data.id);

    // the current object's state can be saved into another copy object before fetching
    // more data if desired
    const pluginsClone = plugins.clone();

    // the ``get`` method of any list resource obj can be used to fetch any arbitrary page
    // from the paginated REST API
    const result = plugins.get({ limit: 20, offset: 20 });
    result
      .then(plugins => {

        // the isEmpty property of any resource obj can be used to know if the object
        // contains any item/list data
        window.console.log('Does the plugin list resource object contain any data?: ', !plugins.isEmpty);
      });

  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// fetch a subset of the plugin metas in the store created by a specific user
let searchParams = { owner_username: 'cubeadmin', limit: 10, offset:10 };
resp = client.getPluginMetas(searchParams);
resp
  .then(userPluginMetas => {

    window.console.log('A subset of the plugin metas created by the user: ', userPluginMetas);
    window.console.log('Is there a next page?: ', userPluginMetas.hasNextPage);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// create a new client instance  with an auth object to be able to make required authenticated requests
const auth = {token: authToken}; // or alternatively auth = {username: 'cubeadmin', password: 'cubeadmin1234'}
const client = new Client(chrisStoreUrl, auth);

// fetch a subset of the plugin metas in the store that are the authenticated user's favorite
let params = { limit: 40, offset: 0 };
resp = client.getFavoritePluginMetas(params);
resp
  .then(plgMetas => {

    window.console.log('Favorite plugin meta list: ', plgMetas);
    window.console.log('Is there a next page?: ', plgMetas.hasNextPage);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// Individual item resource objects for high-level resources can also be directly  
// fetched from the REST API, these include ``PluginMeta`. ``PluginStar``, ``Plugin``,
// ``Pipeline``
// here we fetch a ``Plugin` resource object by id
const plugin_id = 1;
resp = client.getPlugin(plugin_id);
resp
  .then(plugin => {

    window.console.log('Plugin resource object: ', plugin);
    window.console.log('Data in the plugin resource object: ', plugin.data);

    // resource objects have methods to fetch other related resources
    // here we fetch the plugin-specific list of plugin parameters ``PluginParameterList``
    // resource object from the REST API
    const params = { limit: 40, offset: 0 };
    const result = plugin.getPluginParameters(params);
    result
      .then(parameters => {

        window.console.log('Plugin parameter list resource object data: ', parameters.data);
      });    
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// For convenience the Client class provides a runAsyncTask static method that could
// alternatively be used to wait for promises in Javascript 6
// for instance iterate over all pages of the list of available 'fs' plugins
Client.runAsyncTask(function*() {

  const searchParams = { type: 'fs', limit: 20, offset: 0 };
  let plugins = yield client.getPlugins(searchParams); // wait for response here

  window.console.log('Page 1 data of plugin fs list resource object: ', plugins.data);

  let i = 2;
  while (plugins.hasNextPage) {

    try {
      searchParams.offset += searchParams.limit;
      plugins = yield client.getPlugins(searchParams); // wait for response here
      // alternatively, as explained above you could directly use the ``get`` method available in any resource object
      // plugins = yield plugins.get(searchParams); // wait for response here

      window.console.log('Page ' + i + ' data of plugin fs list resource object: ', plugins.data);

    } catch (ex) { // errors while fetching resources can be handled

      window.console.log('Something went wrong while fetching page ' + i '!!!: ', ex);
    }

    i++;
  }
});


// For convenience some high-level resources can be directly created through the client object
// Here the user gives a star to a plugin (making it a favorite) by creating a plugin star
const data = {
  plugin_name: 'pl-simplefsapp'  
};
resp = client.createPluginStar(data);
resp
  .then(plgStar => {

      window.console.log('New plugin star: ', plgStar);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });

```


## Error handling

The API basically follows the same error handling scheme as the [Axios](https://https://github.com/axios/axios)
library.

So given an error you first check if ``error.response`` exists. If so the error data is in ``error.response.data``,
otherwise `error.message` should be used to report the error.

Now ``error.response.data`` may be a plain error string or an object whose properties are the field names that produced
the bad request. It may also have a property called ``non_field_errors`` when the error is not specifically related
to a single field. The value of any of those properties is a list of plain string errors. This is the standard Django
Rest Framework approach to reporting errors.


## API reference

Please check the API reference links to learn more about the `client` object and other API resource objects and their functionality.
