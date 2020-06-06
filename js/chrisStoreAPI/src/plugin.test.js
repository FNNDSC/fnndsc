import { expect } from 'chai';
import Request from './request';
import { PluginMetaList, PluginMeta } from './pluginmeta';
import { Plugin } from './plugin';
import { PluginParameterList } from './pluginparameter';
import { PipelineList } from './pipeline';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'cubeadmin';
  const password = 'cubeadmin1234';
  const chrisStoreUrl = 'http://localhost:8010/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let plgListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let plgMetaRes = new PluginMetaList(chrisStoreUrl, auth);
        try {
          plgMetaRes = yield plgMetaRes.get();
          plgListRes = yield plgMetaRes.getPlugins();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(plgListRes);
      });
    });
  });

  describe('Plugin', () => {
    let plugin;

    beforeEach(() => {
      const url = plgListRes.collection.items[0].href;
      plugin = new Plugin(url, auth);
      return plugin.get();
    });

    it('can fetch the associated plugin parameters from the REST API', done => {
      const result = plugin.getPluginParameters();
      result
        .then(plgParams => {
          expect(plgParams).to.be.an.instanceof(PluginParameterList);
          expect(plgParams.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the associated plugin meta from the REST API', done => {
      const result = plugin.getPluginMeta();
      result
        .then(plgMeta => {
          expect(plgMeta).to.be.an.instanceof(PluginMeta);
          expect(plgMeta.isEmpty).to.be.false;
        })
        .then(done, done);
    });
  });
  describe('PluginList', () => {
    let pluginList;

    beforeEach(() => {
      pluginList = plgListRes.clone();
    });

    it('can fetch the list of pipelines from the REST API', done => {
      const result = pluginList.getPipelines();
      result
        .then(pipelineList => {
          expect(pipelineList).to.be.an.instanceof(PipelineList);
          expect(pipelineList.isEmpty).to.be.false;
        })
        .then(done, done);
    });
  });
});
