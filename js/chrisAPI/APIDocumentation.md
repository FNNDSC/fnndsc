# ChRIS API
JavaScript 6 client for the ChRIS API.


## Usage

``` javascript
import Client from '@fnndsc/chrisapi';

const chrisUrl = 'http://localhost:8000/api/v1/';
const usersUrl = chrisUrl + 'users/';
const authUrl = chrisUrl + 'auth-token/';
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

The ChRIS Javascript client API takes an object oriented approach in which every API resource object is an instance
of a Javascript class that inherits from either of two base classes:

* ``ListResource`` (an object modeling a collection of items)
* ``ItemResource`` (an object modeling an individual item in a collection of items)

These model the two general type of REST API resources available from a ChRIS server.

In addition to methods and properties provided by these base classes every resource object returned by
the client API has additional methods to fetch its associated resources (item or list resources)
from the ChRIS REST API. It can also have ``get``, ``post``, ``put`` and ``delete`` methods as allowed by
the REST API. In particular every object inherits a ``get`` method that updates the internal state of the object
with the new data fetched from the ChRIS server. A `clone` method is provided to cover the case when a reference
to the previous object state is desired. This method returns a new instance of the same class as the cloned object.

All methods that fetch a resource from the REST API return a JS Promise which is passed the corresponding resource
object as an argument to the fulfillment callback.

All resources can be fetched from the REST API starting with a ``client`` object as in the following examples:

``` javascript

// create a new client instance with an auth object to be able to make authenticated requests
const auth = {token: authToken};
// or alternatively auth = {username: 'cube', password: 'cube1234'}
const client = new Client(chrisUrl, auth);

// fetch a paginated list of the authenticated user's feeds from the REST API into a ``FeedList`` resource object
let params = { limit: 20, offset: 0 };
resp = client.getFeeds(params);
resp
  .then(feedListResObj => {

    window.console.log('FeedList resource object: ', feedListResObj);

    // the ``data`` property of any resource object can be used to get its data
    // here we got the first page of a paginated list of data objects (feed REST API descriptors)
    let i = 0;
    for (let dataObj of feedListResObj.data) {
        window.console.log('Data item ' + i + ' of the feed list resource object: ', dataObj);
        i++;
    }

    // the hasNextPage/hasPreviousPage property of any list resource object tells whether
    // there is a next/previous page available from the paginated REST API
    window.console.log('Is there a next page?: ', feedListResObj.hasNextPage);
    window.console.log('Is there a previous page?: ', feedListResObj.hasPreviousPage);

    // the ``getItems`` helper method of any list resource obj can be used to create an array of
    // the individual item resource objects in the list
    // here we retrieve an array of ``Feed`` item resource objects from ``feedListResObj``
    const feedResArray = feedListResObj.getItems();
    let feedRes = feedResArray[0]
    window.console.log(feedRes.data);

    // the ``getItem`` helper method of any list resource obj can be used to create a single item
    // resource object given it's id as long as an item with that id is in the list
    // here we create a ``Feed`` item resource object from ``feedListResObj``
    feedRes = feedListResObj.getItem(feedResArray[0].data.id);

    // the current object's state can be saved into another copy object before fetching
    // more data if desired
    const feedListResObjClone = feedListResObj.clone();

    // the ``get`` method of any list resource obj can be used to fetch any arbitrary page
    // from the paginated REST API
    const result = feedListResObj.get({ limit: 20, offset: 20 });
    result
      .then(feedListResObj => {

        // the isEmpty property of any resource obj can be used to know if the object
        // contains any item/list data
        window.console.log('Does the feed list resource object contain any data?: ', !feedListResObj.isEmpty);
      });
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// Individual item resource objects for high-level resources can also be directly  
// fetched from the REST API, these include ``Feed``. ``FeedFile``, ``Plugin``, ``PluginInstance``,
// ``Pipeline``, ``PipelineInstance``, ``UploadedFile`` and ``Tag``
// here we fetch a ``Feed`` resource object by id
const feed_id = 1;
resp = client.getFeed(feed_id);
resp
  .then(feedRes => {

    window.console.log('Feed resource object: ', feedRes);
    window.console.log('Data in the feed resource object: ', feedRes.data);

    // resource objects have methods to fetch other related resources
    // here we fetch the feed-specific ``Note`` resource object from the REST API
    const result = feedRes.getNote();
    result
      .then(noteRes => {

        window.console.log('Note resource object data: ', noteRes.data);
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
  let pluginListResObj = yield client.getPlugins(searchParams); // wait for response here

  window.console.log('Page 1 data of plugin fs list resource object: ', pluginListResObj.data);

  let i = 2;
  while (pluginListResObj.hasNextPage) {

    try {
      searchParams.offset += searchParams.limit;
      pluginListResObj = yield client.getPlugins(searchParams); // wait for response here
      // alternatively, as explained above you could directly use the ``get`` method available in any resource object
      // pluginListResObj = yield pluginListResObj.get(searchParams); // wait for response here

      window.console.log('Page ' + i + ' data of plugin fs list resource object: ', pluginListResObj.data);

    } catch (ex) { // errors while fetching resources can be handled

      window.console.log('Something went wrong while fetching page ' + i '!!!: ', ex);
    }

    i++;
  }
});


// For convenience some high-level resources can be directly created through the client object
const pluginId = 1; // assuming that the plugin with id 1 is 'pl-simplefsapp'
const data = {
  previous_id: null,  // instances of 'fs' plugins have previous_id set to null
  title: "Test plugin instance",
  dir: "./"  
};
resp = client.createPluginInstance(pluginId, data);
resp
  .then(plgInstResObj => {

      window.console.log('New plugin instance: ', plgInstResObj);
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
