import { expect } from 'chai';
import Request from './request';
import { FeedList, Feed } from './feed';
import { Plugin } from './plugin';
import { PluginInstanceDescendantList, PluginInstance } from './plugininstance';
import { PluginInstanceParameterList } from './plugininstance';
import { PluginInstanceFileList } from './feedfile';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let pluginInstanceListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          const pluginListRes = yield feedListRes.getPlugins();
          // get the plugin with name 'simplefsapp'
          const plugin = pluginListRes.getItems().filter(plg => {
            return plg.data.name === 'simplefsapp';
          })[0];
          pluginInstanceListRes = yield plugin.getPluginInstances();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(pluginInstanceListRes);
      });
    });
  });

  describe('PluginInstance', () => {
    let pluginInst;

    beforeEach(() => {
      // get the plugin instance with id 1
      pluginInst = pluginInstanceListRes
        .getItems()
        .filter(item => {
          return item.data.id === 1;
        })[0]
        .clone();
    });

    it('can fetch the feed created by this plugin instance from the REST API', done => {
      const result = pluginInst.getFeed();
      result
        .then(feed => {
          if (pluginInst.data.type === 'fs') {
            expect(feed).to.be.an.instanceof(Feed);
            expect(feed.isEmpty).to.be.false;
          }
          if (pluginInst.data.type === 'ds') {
            expect(feed).to.be.a('null');
          }
        })
        .then(done, done);
    });

    it('can fetch the plugin associated to the plugin instance from the REST API', done => {
      const result = pluginInst.getPlugin();
      result
        .then(plugin => {
          expect(plugin).to.be.an.instanceof(Plugin);
          expect(plugin.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the previous plugin instance from the REST API', done => {
      const result = pluginInst.getPreviousPluginInstance();
      result
        .then(previousPlgInst => {
          if (pluginInst.data.type === 'fs') {
            expect(previousPlgInst).to.be.a('null');
          }
          if (pluginInst.data.type === 'ds') {
            expect(previousPlgInst).to.be.an.instanceof(PluginInstance);
            expect(previousPlgInst.isEmpty).to.be.false;
          }
        })
        .then(done, done);
    });

    it('can fetch the list of plugin instances that are its descendants from the REST API', done => {
      const result = pluginInst.getDescendantPluginInstances();
      result
        .then(plgInstList => {
          expect(plgInstList).to.be.an.instanceof(PluginInstanceDescendantList);
        })
        .then(done, done);
    });

    it('can fetch the list of associated plugin instance parameters from the REST API', done => {
      const result = pluginInst.getParameters();
      result
        .then(plgInstParamList => {
          expect(plgInstParamList).to.be.an.instanceof(PluginInstanceParameterList);
          expect(plgInstParamList.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the list of files created by the plugin instance from the REST API', done => {
      const result = pluginInst.getFiles();
      result
        .then(fileList => {
          expect(fileList).to.be.an.instanceof(PluginInstanceFileList);
          expect(fileList.isEmpty).to.be.false;
        })
        .then(done, done);
    });
  });

  describe('PluginInstanceList', () => {
    let pluginInstList;

    beforeEach(() => {
      pluginInstList = pluginInstanceListRes.clone();
    });

    it('can fetch the plugin associated to the plugin instances from the REST API', done => {
      const result = pluginInstList.getPlugin();
      result
        .then(plugin => {
          expect(plugin).to.be.an.instanceof(Plugin);
          expect(plugin.isEmpty).to.be.false;
        })
        .then(done, done);
    });
  });
});
