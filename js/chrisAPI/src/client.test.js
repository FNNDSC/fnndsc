import Client from './client';
import { expect } from 'chai';
import ChrisInstance from './chrisinstance';
import { FeedList, Feed } from './feed';
import { PluginList, Plugin } from './plugin';
import { PluginMetaList, PluginMeta } from './pluginmeta';
import { AllPluginInstanceList, PluginInstance, PluginInstanceSplit } from './plugininstance';
import { PipelineList, Pipeline } from './pipeline';
import { Workflow } from './workflow';
import { Tag, Tagging } from './tag';
import { UserFile } from './userfile';
import { FileBrowserFolder } from './filebrowser';
import { DownloadToken } from './downloadtoken';
import { GroupList, Group } from './group';
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

  it('can fetch a user file by id from the REST API', (done) => {
    const result = client.getUserFile(1);
    result
      .then((userFile) => {
        expect(userFile).to.be.an.instanceof(UserFile);
        expect(userFile.isEmpty).to.be.false;
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
    const result = client.getPlugins();
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
    const result = client.getPlugin(1);
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
    const pluginId = 2;
    const data = {
      title: 'Test plugin instance',
      dir: 'home/' + username + '/uploads',
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

  /*
  it('can fetch a pipeline by id from the REST API', (done) => {
    const result = client.getPipeline(3);
    result
      .then((pipeline) => {
        expect(pipeline).to.be.an.instanceof(Pipeline);
        expect(pipeline.isEmpty).to.be.false;

        const resp = pipeline.getDefaultParameters();
        return resp.then(defaultParams => {
          const nodes = client.computeWorkflowNodesInfo(defaultParams.data);
          console.log('workflow nodes:', nodes[0].plugin_parameter_defaults);
        });
      })
      .then(done, done);
  });
  */

  it('can create a new workflow through the REST API', (done) => {
    const pipelineId = 2;
    const nodes = [
      {piping_id: 3, compute_resource_name: "host",
      plugin_parameter_defaults: [{name: "prefix", default: "test"},
      {name: "dummyInt", default: 3}]},
      {piping_id: 4, compute_resource_name: "host"},
      {piping_id: 5, compute_resource_name: "host"}
    ];
    const data = {
      nodes_info: JSON.stringify(nodes),
      title: 'Workflow1',
      previous_plugin_inst_id: 1
    };
    const result = client.createWorkflow(pipelineId, data);
    result
      .then(workflow => {
        expect(workflow).to.be.an.instanceof(Workflow);
        expect(workflow.data.title).to.equal('Workflow1');

        /*const resp = workflow.getPluginInstances();
        return resp.then(plgInstances => {
          console.log('workflow plugin instances:', plgInstances.data);
        });*/

        /*const resp = workflow.put({'title': 'Work2'});
        return resp.then(work => {
          console.log('workflow title:', work.data.title);
        });*/
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
      upload_path: 'home/' + username + '/uploads/test' + Date.now() + '.txt',
    };
    const fileContent = 'This is a test file';
    const fileData = JSON.stringify(fileContent);
    const uploadFile = new Blob([fileData], { type: 'application/json' });
    const uploadFileObj = { fname: uploadFile };

    const result = client.uploadFile(data, uploadFileObj);
    result
      .then((userFile) => {
        expect(userFile).to.be.an.instanceof(UserFile);
        expect(userFile.data.fname).to.equal(data.upload_path);
      })
      .then(done, done);
  });

  it('can fetch a file browser folder resource given its path string from the REST API', (done) => {
    const result = client.getFileBrowserFolderByPath('home/cube');
    result
      .then(browserFolder => {
        expect(browserFolder).to.be.an.instanceof(FileBrowserFolder);
        expect(browserFolder.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can fetch the file browser root folder resource from the REST API', (done) => {
    const result = client.getFileBrowserFolderByPath();
    result
      .then(browserFolder => {
        //window.console.log('browserFolder.data', browserFolder.data);
        expect(browserFolder).to.be.an.instanceof(FileBrowserFolder);
        expect(browserFolder.isEmpty).to.be.false;
      })
      .then(done, done);
  });

  it('can create a new filebrowser folder through the REST API', (done) => {
    const data = {
      path: 'home/' + username + '/uploads/test-' + Date.now(),
    };

    const result = client.createFileBrowserFolder(data);
    result
      .then((folder) => {
        expect(folder).to.be.an.instanceof(FileBrowserFolder);
        expect(folder.data.path).to.equal(data.path);
      })
      .then(done, done);
  });

  it('can create a new file download token through the REST API', (done) => {
    const result = client.createDownloadToken();
    result
      .then(downloadToken => {
        expect(downloadToken).to.be.an.instanceof(DownloadToken);
        expect(downloadToken.data.owner_username).to.equal(username);
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

  it('can fetch the list of groups from the REST API', (done) => {
    const result = client.getGroups();
    result
      .then((groupList) => {
        expect(groupList).to.be.an.instanceof(GroupList);
        expect(groupList.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can fetch a group by id from the REST API', (done) => {
    const result = client.getGroup(1);
    result
      .then((group) => {
        expect(group).to.be.an.instanceof(Group);
        expect(group.isEmpty).to.be.false;
      })
      .then(done, done);
  }); 

  it('can create a new group through the REST API', (done) => {
    const data = {
      name: 'group' + Date.now(),
    };
    const auth = { username: 'chris', password: 'chris1234' };
    const client1 = new Client(chrisUrl, auth);
    const result = client1.adminCreateGroup(data);
    result
      .then((group) => {
        expect(group).to.be.an.instanceof(Group);
        expect(group.data.name).to.equal(data.name);
      })
      .then(done, done);
  });
});
