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

* ``ItemResource`` (an object containing a reference to an individual item in a collection of resource items)
* ``ListResource`` (an object modeling a collection of resource items)

These model the two general type of REST API resources available from a ChRIS server.

In addition to methods and properties provided by these base classes every resource object returned by
the client API has additional methods to fetch its associated resources (item or list resources)
from the ChRIS REST API. It can also have ``get``, ``post``, ``put`` and ``delete`` methods as allowed by
the REST API. In particular every object inherits a ``get`` method that updates the internal state of the object
with the new data fetched from the ChRIS server. A `clone` method is provided to cover the case when a reference
to the previous object state is desired. This method returns a new instance of the same class as the cloned object.

All methods that fetch a resource from the REST API return a JS Promise which is passed the corresponding resource
object as an argument to the fulfillment callback.

All resources can be fetched from the REST API starting with the initial `FeedList` instance returned by the client
as in the following examples:

``` javascript

// create a new client instance with an auth object to be able to make authenticated requests
const auth = {token: authToken};
// or alternatively auth = {username: 'cube', password: 'cube1234'}
const client = new Client(chrisUrl, auth);

// fetch a subset of the authenticated user's feeds from the REST API into an initial
// Feedlist object
let params = { limit: 10, offset: 0 };
resp = client.getFeeds(params);
resp
  .then(feedListObj => {
    let result;

    window.console.log('FeedList resource object: ', feedListObj);

    // the getItems method of any list resource obj can be used to retrieve an array of
    // its item resource objects
    // here we retrieve an array of Feed item resource objects from feedListObj
    let feedObjArray = feedListObj.getItems();

    // the data property of an item resource object can be used to get its data
    // (REST API descriptors), here we log the individual Feed items' data
    for (let feed of feedObjArray) {

        window.console.log(feed.data);
    }

    // the current object's state can be saved into another copy object before fetching
    // more data if desired
    const feedListObjClone = feedListObj.clone();

    // the hasNextPage/hasPreviousPage property of any list resource object tells whether
    // there is a next/previous page available from the paginated REST API
    if (feedListObj.hasNextPage) {

      // the getNextPage/getPreviousPage method of any list resource obj can be used to
      // fetch the next/previous page from the paginated REST API
      result = feedListObj.getNextPage();
      result
      .then(feedListObj => {

        window.console.log('FeedList resource object: ', feedListObj);
      });
    }

    // the get method of any list resource obj can be used to fetch any arbitrary page
    // from the paginated REST API
    result = feedListObj.get({ limit: 10, offset: 20 });
    result
      .then(feedListObj => {

        // the isEmpty property of any resource obj can be used to know if the object
        // contains any item/list data
        window.console.log('Does the feed list contain any data?: ', !feedListObj.isEmpty);
      });

    // resource objects have methods to fetch other related resources
    // here we fetch a list of available ChRIS plugins from the REST API
    result = feedListObj.getPlugins(params);
    result
      .then(pluginListObj => {

        window.console.log('PluginList resource object: ', pluginListObj);
      });
  })
  .catch(error => {

    window.console.log('Error!!!: ', error);
  });

// for convenience the Client class provides a runAsyncTask static method that could
// alternatively be used to wait for promises in Javascript 6
// for instance iterate over all pages of the list of available 'fs' plugins
Client.runAsyncTask(function*() {

  // fetch the FeedList resource obj which corresponds to the API home page
  let feedListObj = yield client.getFeeds(); // wait for response here

  // now fetch an initial PluginList resource obj from previous response
  let pluginListObj = yield feedListObj.getPlugins({limit: 1}); // wait here

  const searchParams = { type: 'fs'};
  // const searchParams = {limit: 5, type: 'fs'}; if you want to override default page size

  // the getSearch method of any list resource obj can be used to fetch a list resource from
  // the REST API based on search parameters, here we fetch lists of plugins of type 'fs'
  pluginListObj = yield pluginListObj.getSearch(searchParams); // wait here

  window.console.log('Page 1 of Plugin fs list resource object: ', pluginListObj);

  let i = 2;
  while (pluginListObj.hasNextPage) {

    try {

      pluginListObj = yield pluginListObj.getNextPage(); // wait here
      window.console.log('Page ' + i + ' of Plugin fs list resource object: ', pluginListObj);

    } catch (ex) { // errors while fetching resources can be handled

      window.console.log('Something went wrong while fetching page ' + i '!!!: ', ex);
    }

    i++;
  }
});

```

## API reference

Please check the API reference links to learn more about the API resource objects and their functionality.
