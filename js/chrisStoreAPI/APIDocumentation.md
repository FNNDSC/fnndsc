# ChRIS Store API
JavaScript6 client for the ChRIS Store API.

## Usage

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
const testPlgId = 1;
const testPlgDockImg = 'fnndsc/pl-simplefsapp11';
const testPlgPublicRepo = 'https://github.com/FNNDSC11';

resp = client.modifyPlugin(testPlgId, testPlgDockImg, testPlgPublicRepo);
resp
  .then(response => {

    window.console.log('Updated description for plugin with id: ', testPlgId);
  })
  .catch(error => {

    window.console.log('Something went wrong with this request!!!: ', error);
  });


// share an existing plugin with another store user (who then becomes an owner of the plugin)
resp = client.modifyPlugin(testPlgId, undefined, undefined, 'chris');
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

## API reference

Please check the API reference links to learn more about the API resource objects and their functionality.
