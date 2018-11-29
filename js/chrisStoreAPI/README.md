# ChRIS Store API
[![Build Status](https://travis-ci.org/FNNDSC/fnndsc.svg?branch=master)](https://travis-ci.org/FNNDSC/fnndsc)

JavaScript6 client for the ChRIS Store API.

## Installation

``` bash
npm i @fnndsc/chrisstoreapi
```

## Usage

If you have a ChRIS store server up and running (eg. as explained below) then you can test the API in your JS code:

``` javascript
import StoreClient from '@fnndsc/chrisstoreapi';

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
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// fetch a user auth token
resp = StoreClient.getAuthToken(authUrl, 'cubeadmin', 'cubeadmin1234');
resp
  .then(token => {

    window.console.log('Token: ', token);
    authToken = token;
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// create a new client instance  without an auth object to make allowed unauthenticated requests
let client = new StoreClient(storeUrl);


// fetch a plugin given its id
resp = client.getPlugin(1);
resp
  .then(plugin => {

    window.console.log('Plugin: ', plugin);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// fetch in a list a subset of the plugins in the store given search params
let searchParams = { limit: 10, offset:10 };
resp = client.getPlugins(searchParams);
resp
  .then(smallPluginList => {

    window.console.log('Small plugin list: ', smallPluginList);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// fetch in a list a subset of the plugins in the store created by a specific user
let searchParams = { owner_username: 'cubeadmin', limit: 10, offset:10 };
resp = client.getPlugins(searchParams);
resp
  .then(userPluginList => {

    window.console.log('A subset of the plugins created by the user: ', userPluginList);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// fetch a paginated list of plugins given search params and call a callback function on every page of the plugin list
searchParams = { type: 'fs' };
resp = client.getPlugins(searchParams, onePageFsPluginList => {

  window.console.log('One page of the fs plugin list: ', onePageFsPluginList);
});
resp
  .then(fullFsPluginList => {

    window.console.log('"fs" plugins: ', fullFsPluginList);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// create a new client instance  with an auth object to be able to make required authenticated requests
const auth = {token: authToken}; // or alternatively auth = {username: 'cubeadmin', password: 'cubeadmin1234'}
client = new StoreClient(storeUrl, auth);


// add a new plugin to the store
const testPlgName = 'myPlugin';
const testPlgDockImg = 'fnndsc/pl-myPlugin';
const testPlgPublicRepo = 'https://github.com/FNNDSC/pl-myPlugin';
const testPluginRepresentation = {
  creation_date: '2018-05-22T15:49:52.419437Z',
  modification_date: '2018-05-22T15:49:52.419481Z',
  type: 'fs',
  authors: 'FNNDSC (dev@babyMRI.org)',
  title: 'Simple chris fs app',
  category: '',
  description: 'A simple chris fs app demo',
  documentation: 'http://wiki',
  license: 'Opensource (MIT)',
  version: '0.1',
  execshell: 'python3',
  selfpath: '/usr/src/simplefsapp',
  selfexec: 'simplefsapp.py',
  min_number_of_workers: 1,
  max_number_of_workers: 1,
  min_cpu_limit: 1000,
  max_cpu_limit: 2147483647,
  min_memory_limit: 200,
  max_memory_limit: 2147483647,
  min_gpu_limit: 0,
  max_gpu_limit: 0,
  parameters: [
    {
      name: 'dir',
      type: 'path',
      optional: true,
      default: './',
      flag: '--dir',
      action: 'store',
      help: 'look up directory',
    },
  ],
};

let fileData = JSON.stringify(testPluginRepresentation);
let dfile = new Blob([fileData], { type: 'application/json' });

resp = client.addPlugin(testPlgName, testPlgDockImg, dfile, testPlgPublicRepo);
resp
  .then(response => {

      window.console.log('New plugin in the store: ', response);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// modify an existing plugin's representation in the store
testPluginRepresentation.description = 'A new description';
fileData = JSON.stringify(testPluginRepresentation);
dfile = new Blob([fileData], { type: 'application/json' });

resp = client.modifyPlugin(testPlgName, testPlgDockImg, dfile, testPlgPublicRepo);
resp
  .then(response => {

    window.console.log('Updated description for plugin: ', testPlgName);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// change an existing plugin's name (the descriptor file is always required)
const testPlgId = 1;
resp = client.modifyPlugin(testPlgId, dfile, 'newPluginName');
resp
  .then(response => {

    window.console.log('Plugin name is now newPluginName');
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// share an existing plugin with another store user (who then becomes an owner of the plugin)
resp = client.modifyPlugin(testPlgId, dfile, undefined, undefined, undefined, 'chris');
resp
  .then(response => {

    window.console.log('User chris is now in the list of owners of plugin with id : ' + testPlgId);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// remove an existing plugin from the store
resp = client.removePlugin(testPlgId);
resp
  .then(() => {

    window.console.log('Removed plugin with id: ', testPlgId);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
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
