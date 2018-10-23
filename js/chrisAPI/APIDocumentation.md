# ChRIS API
JavaScript6 client for the ChRIS API.

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


// retrieve a user auth token
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
the client API contains additional methods to fetch its associated resources (item or list resources)
from the ChRIS REST API. It can also contain ``get``, ``post``, ``put`` and ``delete`` methods as allowed by
the REST API. In particular every object has a ``get`` method that updates the internal state of the object
with the new data fetched from the ChRIS server. A `clone` method is provided to cover the case when a reference
to the previous object state is desired. This method returns a new instance of the same class as the cloned object.

All methods that fetch a resource from the REST API return a JS Promise which is passed the corresponding resource
object as an argument to the fulfillment callback.

All resources can be fetched from the REST API starting the initial `FeedList` instance object returned by the client
as in the following examples:

``` javascript

// create a new client instance with an auth object to be able to make authenticated requests
const auth = {token: authToken}; // or alternatively auth = {username: 'cube', password: 'cube1234'}
const client = new Client(chrisUrl, auth);

// fetch a subset of currently authenticated user's feeds from the REST API into an initial Feedlist object
let params = { limit: 10, offset: 0 };
let feedListObj;
let feedListObjClone;

resp = client.getFeeds(params);
resp
  .then(feedListObj => {

    window.console.log('Feed list resource object: ', feedListObj);

    // retrieve an array of the Feed item resource objects from feedListObj
    const feedObjArray = feedListObj.getItems();

    // log the individual Feed items' data
    for (let feed of feedObjArray) {
        window.console.log(feed.data);
    }

    // fetch a list of available ChRIS plugins from the REST API
    const result1 = feedListObj.getPlugins(params);
    result1
      .then(pluginListObj => {

        window.console.log('Plugin list resource object: ', pluginListObj);
      })

    // fetch the next page of feeds from the REST API
    feedListObjClone = feedListObj.clone(); // if desired save the object's current state in another object
    if (feedListObj.hasNextPage) {
      const result2 = feedListObj.getNextPage();
      result2
      .then(feedListObj => {

        window.console.log('Feed list resource object: ', feedListObj);
      })
    }
  })
  .catch(error => {

    window.console.log('Error!!!: ', error);
  });

// the Client's runAsyncTask static method could alternatively be used to wait for promises in Javascript 6
// for instance iterate over all pages of the list of available 'fs' plugins
Client.runAsyncTask(function*() {

  feedListObj = yield client.getFeeds(); // wait here
  let pluginListObj = yield feedListObj.getPlugins({limit: 1}); // this is to just fetch an initial PluginList resource obj

  const searchParams = { type: 'fs'};
  // const searchParams = {limit: 10, offset:0, type: 'fs'}; if you want to override default REST API page size
  pluginListObj = pluginListObj.getSearch(searchParams);
  window.console.log('Page 1 of Plugin fs list resource object: ', pluginListObj);

  let i = 2;
  while (pluginListObj.hasNextPage) {
    pluginListObj = pluginListObj.getNextPage();
    window.console.log('Page ' + i + ' of Plugin fs list resource object: ', pluginListObj);
    i++;
  }
});

```

## API reference

Please check the API reference links for more information.