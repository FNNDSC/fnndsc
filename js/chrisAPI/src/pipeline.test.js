import { expect } from 'chai';
import Request from './request';
import { PipelinePluginList, Pipeline } from './pipeline';
import { FeedList } from './feed';
import { PluginList } from './plugin';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let pipelineListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          pipelineListRes = yield feedListRes.getPipelines();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(pipelineListRes);
      });
    });
  });

  describe('Pipeline', () => {
    let pipeline;

    beforeEach(() => {
      const url = pipelineListRes.collection.items[0].href;
      pipeline = new Pipeline(url, auth);
      return pipeline.get();
    });

    it('can fetch the associated plugins from the REST API', done => {
      const result = pipeline.getPlugins();
      result
        .then(plugins => {
          expect(plugins).to.be.an.instanceof(PipelinePluginList);
          expect(plugins.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can modify this pipeline resource through a REST API PUT request', done => {
      const data = {
        category: 'PUT test pipeline',
      };

      const result = pipeline.put(data);
      result
        .then(pipeline => {
          expect(pipeline.data.title).to.equal(data.title);
        })
        .then(done, done);
    });
  });

  describe('PipelineList', () => {
    let pipelineList;

    beforeEach(() => {
      pipelineList = pipelineListRes.clone();
    });

    it('can fetch the list of plugins from the REST API', done => {
      const result = pipelineList.getPlugins();
      result
        .then(pluginList => {
          expect(pluginList).to.be.an.instanceof(PluginList);
          expect(pluginList.isEmpty).to.be.false;
        })
        .then(done, done);
    });
  });
});
