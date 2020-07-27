import Client from './client';
import { expect } from 'chai';
import RequestException from './exception';
import { PluginList, Plugin } from './plugin';
import { UserFavoritePluginMetaList, UserOwnedPluginMetaList } from './pluginmeta';
import { PluginMetaList, PluginMeta } from './pluginmeta';
import { PluginStar } from './pluginstar';
import { PipelineList, Pipeline } from './pipeline';
import User from './user';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Client', () => {
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
        optional: false,
        flag: '--dir',
        action: 'store',
        help: 'look up directory',
      },
    ],
  };

  const username = 'cubeadmin';
  const password = 'cubeadmin1234';
  const chrisStoreUrl = 'http://localhost:8010/api/v1/';
  const authUrl = chrisStoreUrl + 'auth-token/';
  const usersUrl = chrisStoreUrl + 'users/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  const client = new Client(chrisStoreUrl, auth);

  it('can create a new user through the REST API', done => {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '@babymri.org';

    const result = Client.createUser(usersUrl, username, password, email);
    result
      .then(user => {
        // window.console.log('data', user.data);
        expect(user.data.username).to.equal(username);
      })
      .then(done, done);
  });

  it('can report an unsuccessful atempt to create a new user through the REST API', done => {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '/babymri.org';

    const result = Client.createUser(usersUrl, username, password, email);
    result
      .catch(error => {
        expect(error).to.be.an.instanceof(RequestException);
        expect(error.message).to.be.a('string');
        expect(error.request).to.be.an.instanceof(XMLHttpRequest);
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('email');
      })
      .then(done, done);
  });

  it('can fetch a user auth token from the REST API', done => {
    const result = Client.getAuthToken(authUrl, username, password);
    result
      .then(token => {
        expect(token).to.be.a('string');
      })
      .then(done, done);
  });

  it('can fetch the list of plugin metas from the REST API', done => {
    const result = client.getPluginMetas();
    result
      .then(plgMetaList => {
        //window.console.log('items', plgMetaList.getItems());
        expect(plgMetaList).to.be.an.instanceof(PluginMetaList);
        expect(plgMetaList.data).to.have.lengthOf.at.least(1);
        expect(plgMetaList.totalCount).to.be.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch the list of user favorite plugin metas from the REST API', done => {
    const result = client.getFavoritePluginMetas();
    result
      .then(plgMetaList => {
        //window.console.log('items', plgMetaList.getItems());
        expect(plgMetaList).to.be.an.instanceof(UserFavoritePluginMetaList);
      })
      .then(done, done);
  });

  it('can fetch the list of user owned plugin metas from the REST API', done => {
    const result = client.getOwnedPluginMetas();
    result
      .then(plgMetaList => {
        //window.console.log('items', plgMetaList.getItems());
        expect(plgMetaList).to.be.an.instanceof(UserOwnedPluginMetaList);
        expect(plgMetaList.data).to.have.lengthOf.at.least(1);
        expect(plgMetaList.totalCount).to.be.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a plugin meta by id from the REST API', done => {
    const result = client.getPluginMeta(1);
    result
      .then(plgMeta => {
        expect(plgMeta).to.be.an.instanceof(PluginMeta);
        expect(plgMeta.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can make a plugin favorite through the REST API and then remove the star', done => {
    const data = {
      plugin_name: 'pl-simplefsapp',
    };
    const result = client.createPluginStar(data);
    result
      .then(plgStar => {
        expect(plgStar).to.be.an.instanceof(PluginStar);
        expect(plgStar.data.plugin_name).to.equal(data.plugin_name);
        return plgStar.delete();
      })
      .then(done, done);
  });

  it('can fetch the list of plugins from the REST API', done => {
    const client1 = new Client(chrisStoreUrl, auth);
    const result = client1.getPlugins();
    result
      .then(pluginList => {
        //window.console.log('pluginList.data', pluginList.data);
        //window.console.log('pluginList.hasNextPage', pluginList.hasNextPage);
        expect(pluginList).to.be.an.instanceof(PluginList);
        expect(pluginList.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a plugin by id from the REST API', done => {
    const client1 = new Client(chrisStoreUrl);
    const result = client1.getPlugin(1);
    result
      .then(plugin => {
        //console.log('plugin.data:', plugin.data);
        //window.console.log('items', feedList.getItems());
        expect(plugin).to.be.an.instanceof(Plugin);
        expect(plugin.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can create a new plugin through the REST API', done => {
    const data = {
      name: 'pl-simplefsapp' + Date.now(),
      dock_image: 'fnndsc/pl-simplefsapp',
      public_repo: 'http://github.com',
    };

    const fileData = JSON.stringify(testPluginRepresentation);
    const dfile = new Blob([fileData], { type: 'application/json' });
    const uploadFileObj = { descriptor_file: dfile };

    const result = client.createPlugin(data, uploadFileObj);
    result
      .then(plugin => {
        expect(plugin).to.be.an.instanceof(Plugin);
        expect(plugin.data.name).to.equal(data.name);
      })
      .then(done, done);
  });

  it('can fetch the list of pipelines from the REST API', done => {
    const result = client.getPipelines();
    result
      .then(pipelineList => {
        expect(pipelineList).to.be.an.instanceof(PipelineList);
        expect(pipelineList.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a pipeline by id from the REST API', done => {
    const result = client.getPipeline(1);
    result
      .then(pipeline => {
        expect(pipeline).to.be.an.instanceof(Pipeline);
        expect(pipeline.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can fetch authenticated user from the REST API', done => {
    const result = client.getUser();
    result
      .then(user => {
        expect(user).to.be.an.instanceof(User);
        expect(user.data.username).to.equal('cubeadmin');
      })
      .then(done, done);
  });
});
