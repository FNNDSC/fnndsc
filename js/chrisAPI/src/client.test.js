import Client from './client';
import { expect } from 'chai';
import ChrisInstance from './chrisinstance';
import { FeedList, Feed } from './feed';
import { AllFeedFileList, FeedFile } from './feedfile';
import { PluginList, Plugin } from './plugin';
import { PluginMetaList, PluginMeta } from './pluginmeta';
import { AllPluginInstanceList, PluginInstance, PluginInstanceSplit } from './plugininstance';
import { PipelineList, Pipeline } from './pipeline';
import { PipelineInstance } from './pipelineinstance';
import { Tag, Tagging } from './tag';
import { UploadedFile } from './uploadedfile';
import { FileBrowserPath } from './filebrowser';
import User from './user';
import RequestException from './exception';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Client', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const authUrl = chrisUrl + 'auth-token/';
  const usersUrl = chrisUrl + 'users/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  const client = new Client(chrisUrl, auth);

  it('can create a new user through the REST API', (done) => {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '@babymri.org';

    const result = Client.createUser(usersUrl, username, password, email);
    result
      .then((user) => {
        // window.console.log('data', user.data);
        expect(user.data.username).to.equal(username);
      })
      .then(done, done);
  });

  it('can report an unsuccessful atempt to create a new user through the REST API', (done) => {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '/babymri.org';

    const result = Client.createUser(usersUrl, username, password, email);
    result
      .catch((error) => {
        expect(error).to.be.an.instanceof(RequestException);
        expect(error.message).to.be.a('string');
        expect(error.request).to.be.an.instanceof(XMLHttpRequest);
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('email');
      })
      .then(done, done);
  });

  it('can fetch a user auth token from the REST API', (done) => {
    const result = Client.getAuthToken(authUrl, username, password);
    result
      .then((token) => {
        expect(token).to.be.a('string');
      })
      .then(done, done);
  });

  it('can fetch the ChRIS instance from the REST API', (done) => {
    const result = client.getChrisInstance();
    result
      .then((instance) => {
        expect(instance).to.be.an.instanceof(ChrisInstance);
        expect(instance.data.id).to.equal(1);
        console.log('Chris instance: ', instance.data);
      })
      .then(done, done);
  });

  it('can fetch the list of feeds from the REST API', (done) => {
    const result = client.getFeeds();
    result
      .then((feedList) => {
        //window.console.log('items', feedList.getItems());
        expect(feedList).to.be.an.instanceof(FeedList);
        expect(feedList.data).to.have.lengthOf.at.least(1);
        expect(feedList.totalCount).to.be.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a feed by id from the REST API', (done) => {
    const result = client.getFeed(1);
    result
      .then((feed) => {
        //window.console.log('items', feedList.getItems());
        expect(feed).to.be.an.instanceof(Feed);
        expect(feed.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can tag a feed through the REST API', (done) => {
    const data = {
      name: 'Test feed tag',
      color: 'red',
    };
    const result = client.createTag(data).then((tag) => client.tagFeed(1, tag.data.id));
    result
      .then((tagging) => {
        expect(tagging).to.be.an.instanceof(Tagging);
        expect(tagging.data.feed_id).to.equal(1);
      })
      .then(done, done);
  });

  it('can fetch the list of files for all user-owned feeds from the REST API', (done) => {
    const result = client.getFiles();
    result
      .then((fileList) => {
        expect(fileList).to.be.an.instanceof(AllFeedFileList);
        expect(fileList.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a feed file by id from the REST API', (done) => {
    const result = client.getFile(1);
    result
      .then((feedFile) => {
        expect(feedFile).to.be.an.instanceof(FeedFile);
        expect(feedFile.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can fetch the list of plugin metas from the REST API', (done) => {
    const result = client.getPluginMetas();
    result
      .then((plgMetaList) => {
        //window.console.log('items', plgMetaList.getItems());
        expect(plgMetaList).to.be.an.instanceof(PluginMetaList);
        expect(plgMetaList.data).to.have.lengthOf.at.least(1);
        expect(plgMetaList.totalCount).to.be.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a plugin meta by id from the REST API', (done) => {
    const result = client.getPluginMeta(1);
    result
      .then((plgMeta) => {
        expect(plgMeta).to.be.an.instanceof(PluginMeta);
        expect(plgMeta.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can fetch the list of plugins from the REST API', (done) => {
    const client1 = new Client(chrisUrl, auth);
    const result = client1.getPlugins();
    result
      .then((pluginList) => {
        //window.console.log('pluginList.data', pluginList.data);
        //window.console.log('pluginList.hasNextPage', pluginList.hasNextPage);
        expect(pluginList).to.be.an.instanceof(PluginList);
        expect(pluginList.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a plugin by id from the REST API', (done) => {
    const client1 = new Client(chrisUrl, auth);
    const result = client1.getPlugin(1);
    result
      .then((plugin) => {
        //window.console.log('items', feedList.getItems());
        expect(plugin).to.be.an.instanceof(Plugin);
        expect(plugin.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can fetch the list of plugin instances from the REST API', (done) => {
    const result = client.getPluginInstances();
    result
      .then((plgInstanceList) => {
        expect(plgInstanceList).to.be.an.instanceof(AllPluginInstanceList);
        expect(plgInstanceList.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a plugin instance by id from the REST API', (done) => {
    const result = client.getPluginInstance(1);
    result
      .then((plgInstance) => {
        expect(plgInstance).to.be.an.instanceof(PluginInstance);
        expect(plgInstance.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can create a new plugin instance through the REST API', (done) => {
    const pluginId = 1;
    const data = {
      title: 'Test plugin instance',
      dir: username + '/',
    };

    const result = client.createPluginInstance(pluginId, data);
    result
      .then((plgInstance) => {
        expect(plgInstance).to.be.an.instanceof(PluginInstance);
        expect(plgInstance.data.title).to.equal('Test plugin instance');
      })
      .then(done, done);
  });

  it('can create a new plugin instance split through the REST API', (done) => {
    const pluginInstanceId = 1;

    const result = client.createPluginInstanceSplit(pluginInstanceId);
    result
      .then((plgInstanceSplit) => {
        expect(plgInstanceSplit).to.be.an.instanceof(PluginInstanceSplit);
        expect(plgInstanceSplit.data.plugin_inst_id).to.equal(1);
      })
      .then(done, done);
  });

  it('can fetch the list of pipelines from the REST API', (done) => {
    const result = client.getPipelines();
    result
      .then((pipelineList) => {
        expect(pipelineList).to.be.an.instanceof(PipelineList);
        expect(pipelineList.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a pipeline by id from the REST API', (done) => {
    const result = client.getPipeline(1);
    result
      .then((pipeline) => {
        expect(pipeline).to.be.an.instanceof(Pipeline);
        expect(pipeline.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can create a new pipeline instance through the REST API', (done) => {
    const pipelineId = 2;
    const data = {
      title: 'Test pipeline instance',
      previous_plugin_inst_id: 1,
    };
    const result = client.createPipelineInstance(pipelineId, data);
    result
      .then((pipelineInstance) => {
        expect(pipelineInstance).to.be.an.instanceof(PipelineInstance);
        expect(pipelineInstance.data.title).to.equal('Test pipeline instance');
      })
      .then(done, done);
  });

  it('can create a new tag through the REST API', (done) => {
    const data = {
      name: 'Test tag',
      color: 'red',
    };
    const result = client.createTag(data);
    result
      .then((tag) => {
        expect(tag).to.be.an.instanceof(Tag);
        expect(tag.data.name).to.equal('Test tag');
      })
      .then(done, done);
  });

  it('can upload a file through the REST API', (done) => {
    const data = {
      upload_path: username + '/uploads/test' + Date.now() + '.txt',
    };
    const fileContent = 'This is a test file';
    const fileData = JSON.stringify(fileContent);
    const uploadFile = new Blob([fileData], { type: 'application/json' });
    const uploadFileObj = { fname: uploadFile };

    const result = client.uploadFile(data, uploadFileObj);
    result
      .then((uploadedFile) => {
        expect(uploadedFile).to.be.an.instanceof(UploadedFile);
        expect(uploadedFile.data.fname).to.equal(data.upload_path);
      })
      .then(done, done);
  });

  it('can fetch a file browser path resource given the path string from the REST API', (done) => {
    const result = client.getFileBrowserPath('cube');
    result
      .then(browserPath => {
        expect(browserPath).to.be.an.instanceof(FileBrowserPath);
        expect(browserPath.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can fetch authenticated user from the REST API', (done) => {
    const result = client.getUser();
    result
      .then((user) => {
        expect(user).to.be.an.instanceof(User);
        expect(user.data.username).to.equal('cube');
      })
      .then(done, done);
  });
});
