import { expect } from 'chai';
import Request from './request';
import { Plugin } from './plugin';
import { FeedList } from './feed';
import { PluginComputeResourceList } from './computeresource';
import { PluginParameterList } from './pluginparameter';
import { PluginInstanceList } from './plugininstance';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let pluginListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          pluginListRes = yield feedListRes.getPlugins();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(pluginListRes);
      });
    });
  });

  describe('Plugin', () => {
    let plugin;

    beforeEach(() => {
      const url = pluginListRes.collection.items[0].href;
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

    it('can fetch the associated compute resources from the REST API', done => {
      const result = plugin.getPluginComputeResources();
      result
        .then(computeResources => {
          expect(computeResources).to.be.an.instanceof(PluginComputeResourceList);
          expect(computeResources.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the associated plugin instances from the REST API', done => {
      const result = plugin.getPluginInstances();
      result
        .then(plgInstances => {
          expect(plgInstances).to.be.an.instanceof(PluginInstanceList);
        })
        .then(done, done);
    });
  });

  describe('PluginList', () => {
    let pluginList;

    beforeEach(() => {
      pluginList = pluginListRes.clone();
    });

    it('can fetch the list of feeds from the REST API', done => {
      const result = pluginList.getFeeds();
      result
        .then(feedList => {
          expect(feedList).to.be.an.instanceof(FeedList);
          expect(feedList.isEmpty).to.be.false;
        })
        .then(done, done);
    });
  });
});
