# ChRIS Store API
[![Build Status](https://travis-ci.org/FNNDSC/fnndsc.svg?branch=master)](https://travis-ci.org/FNNDSC/fnndsc)

JavaScript6 client for the ChRIS Store API.

## Installation

``` bash
npm i @fnndsc/chrisstoreapi
```

## Usage

If you have a ChRIS store server up and running (eg. as explained below) then you can use and test the api in your JS code:

``` javascript
import {StoreClient} from '@fnndsc/chrisstoreapi';

const storeUrl = 'http://localhost:8010/api/v1/';
const usersUrl = storeUrl + 'users/';
const authUrl = storeUrl + 'auth-token/';
let authToken;
let resp;

// create a new user
resp = StoreClient.createUser(usersUrl, 'user1', 'user1pass', 'user1@gmail.com');
resp
  .then(user => {

    window.console.log('New user: ', user);
  });

// retrieve a user auth token
resp = StoreClient.getAuthToken(authUrl, 'cubeadmin', 'cubeadmin1234');
resp
  .then(token => {

    window.console.log('Token: ', token);
    authToken = token;
  });

// create a new client instance  
const auth = {token: authToken};
const client = new StoreClient(storeUrl, auth);

// retrieve a plugin given its name
resp = client.getPlugin('simplefsapp');
resp
  .then(plugin => {

    window.console.log('plugin: ', plugin);
  });

// retrieve a sublist of plugins given search params
let searchParams = { limit: 10, offset:10 };
resp = client.getPlugins(searchParams);
resp
  .then(smallPluginList => {

    window.console.log('small plugin list: ', smallPluginList);
  });

// retrieve a paginated list of plugins given search params and call a callback function on every page of the plugin list
searchParams = { type: 'fs' };
resp = client.getPlugins(searchParams, onePageFsPluginList => {

  window.console.log('one page of the fs plugin list: ', onePageFsPluginList);
});
resp
  .then(fullFsPluginList => {

    window.console.log('"fs" plugins: ', fullFsPluginList);
  });

// retrieve a paginated list of all plugins in the ChRIS store and call a callback function on every page of plugin list
resp = client.getPlugins(null, onePageAllPluginList => {

  window.console.log('one page of the full plugin list: ', onePageAllPluginList);
});
resp
  .then(allPluginList => {

    window.console.log('all plugins in the store: ', allPluginList);
  });
```

## Development and testing

### ChRIS Store server preconditions

These preconditions are only necessary to be able to test the client against an actual
instance of a ChRIS Store server both during development and for the automated tests.

#### Install latest Docker and Docker Compose. Currently tested platforms
* ``Docker 17.04.0+``
* ``Docker Compose 1.10.0+``
* ``Ubuntu (16.04/17.04/17.10) and MAC OS X 10.11+``

#### Make sure to add your computer user to the ``docker group`` in your machine

#### Fire up the full set of ChRIS services:

Open a terminal and run the following commands in any working directory:

``` bash
$> git clone https://github.com/FNNDSC/ChRIS_ultron_backEnd.git
$> cd ChRIS_ultron_backEnd
$> ./docker-make-chris_dev.sh -U -I -i
```

Check that all the services are up:

``` bash
$> docker-compose ps
```

### JavaScript package manager prerequisite

* yarn

Open a terminal in the directory of this README file

### Commands

Install dependencies

``` bash
$> yarn install
```

Start tests in watch mode (used for developing)

``` bash
$> yarn start
```

Start test in single run mode (used by `Travis CI`)

``` bash
$> yarn test
```

Compile library to standalone bundle

``` bash
$> yarn build
```
