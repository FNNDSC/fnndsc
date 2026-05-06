import { expect } from 'chai';
import Request from './request';
import {
  Pipeline,
  PipelineList,
  PluginPiping,
  PipingDefaultParameter,
  PipelinePluginList,
  PipelinePluginPipingList,
  PipelinePipingDefaultParameterList,
  PipelineSourceFile,
  PipelineSourceFileList,
} from './pipeline';
import { FeedList } from './feed';
import { Plugin, PluginList } from './plugin';
import { PluginParameter } from './pluginparameter';
import { WorkflowList } from './workflow';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Pipeline resources', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let pipelineListRes;
  let dsappPluginId;

  before(() => {
    return new Promise(function (resolve, reject) {
      Request.runAsyncTask(function* () {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          pipelineListRes = yield feedListRes.getPipelines();
          // Look up pl-simpledsapp dynamically — its plugin id is not stable across deployments
          const plgList = yield feedListRes.getPlugins({ name_exact: 'pl-simpledsapp', limit: 1 });
          const plgs = plgList.getItems();
          if (!plgs.length) {
            throw new Error('pl-simpledsapp not registered on the test backend');
          }
          dsappPluginId = plgs[0].data.id;
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve();
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

    it('can fetch the list of pipeline default parameter values from the REST API', (done) => {
      const result = pipeline.getDefaultParameters();
      result
        .then((defaultParams) => {
          expect(defaultParams).to.be.an.instanceof(PipelinePipingDefaultParameterList);
          expect(defaultParams.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the associated plugins from the REST API', (done) => {
      const result = pipeline.getPlugins();
      result
        .then((plugins) => {
          expect(plugins).to.be.an.instanceof(PipelinePluginList);
          expect(plugins.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the list of plugin pipings composing the pipeline from the REST API', (done) => {
      pipeline
        .getPluginPipings()
        .then((pipings) => {
          expect(pipings).to.be.an.instanceof(PipelinePluginPipingList);
          expect(pipings.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the list of workflows associated to this pipeline from the REST API', (done) => {
      pipeline
        .getWorkflows()
        .then((workflows) => {
          // The pipeline may or may not have associated workflows depending on whether
          // other tests in the suite have created any — only the type is asserted.
          expect(workflows).to.be.an.instanceof(WorkflowList);
        })
        .then(done, done);
    });

    it('can modify this pipeline resource through a REST API PUT request', (done) => {
      const data = {
        category: 'PUT test pipeline',
      };

      const result = pipeline.put(data);
      result
        .then((pipeline) => {
          expect(pipeline.data.category).to.equal(data.category);
        })
        .then(done, done);
    });

    it('can delete a pipeline resource through a REST API DELETE request', (done) => {
      const listUrl = pipelineListRes.url;
      const pipelineList = new PipelineList(listUrl, auth);
      const data = {
        name: 'PipelineToDelete-' + Date.now(),
        plugin_tree: JSON.stringify([{ plugin_id: dsappPluginId, title: 'P1', previous: null }]),
      };

      pipelineList
        .post(data)
        .then((listRes) => {
          const created = listRes.getItems()[0];
          expect(created).to.be.an.instanceof(Pipeline);
          return created.delete().then(() => created.url);
        })
        .then((url) => {
          // confirm the resource is gone
          const probe = new Pipeline(url, auth);
          return probe.get().then(
            () => {
              throw new Error('expected GET on deleted pipeline to fail');
            },
            (err) => {
              expect(err.response.status).to.equal(404);
            }
          );
        })
        .then(done, done);
    });
  });

  describe('PipelineList', () => {
    let pipelineList;

    beforeEach(() => {
      pipelineList = pipelineListRes.clone();
    });

    it('can fetch the list of plugins from the REST API', (done) => {
      const result = pipelineList.getPlugins();
      result
        .then((pluginList) => {
          expect(pluginList).to.be.an.instanceof(PluginList);
          expect(pluginList.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can create a new pipeline through a REST API POST request', (done) => {
      const data = {
        name: 'PipelineListPost-' + Date.now(),
        plugin_tree: JSON.stringify([
          { plugin_id: dsappPluginId, title: 'PA', previous: null },
          { plugin_id: dsappPluginId, title: 'PB', previous: 'PA' },
        ]),
      };
      pipelineList
        .post(data)
        .then((listRes) => {
          const created = listRes.getItems()[0];
          expect(created).to.be.an.instanceof(Pipeline);
          expect(created.data.name).to.equal(data.name);
        })
        .then(done, done);
    });
  });

  describe('PluginPiping', () => {
    let pipingItems;

    before(() => {
      // CUBE allows piping modifications only on *locked* pipelines (an unlocked pipeline
      // is considered "released" — its pipings become read-only). The order of items in
      // pipelineListRes is not deterministic across runs, so explicitly pick a locked one
      // rather than blindly using items[0].
      const lockedItem = pipelineListRes.collection.items.find((item) => {
        const locked = item.data.find((d) => d.name === 'locked');
        return locked && locked.value === true;
      });
      expect(lockedItem, 'expected at least one locked pipeline in the list').to.exist;
      const pipeline = new Pipeline(lockedItem.href, auth);
      return pipeline
        .get()
        .then((p) => p.getPluginPipings({ limit: 50 }))
        .then((pipings) => {
          pipingItems = pipings.getItems();
          expect(pipingItems.length).to.be.at.least(
            2,
            'the chosen locked pipeline is expected to have at least 2 pipings — re-run pre_test.sh'
          );
        });
    });

    it('can fetch the corresponding plugin from the REST API', (done) => {
      pipingItems[0]
        .getPlugin()
        .then((plugin) => {
          expect(plugin).to.be.an.instanceof(Plugin);
          expect(plugin.data.id).to.equal(pipingItems[0].data.plugin_id);
        })
        .then(done, done);
    });

    it('can fetch the corresponding pipeline from the REST API', (done) => {
      pipingItems[0]
        .getPipeline()
        .then((p) => {
          expect(p).to.be.an.instanceof(Pipeline);
          expect(p.data.id).to.equal(pipingItems[0].data.pipeline_id);
        })
        .then(done, done);
    });

    it('resolves to null when getting the previous piping of a root piping', (done) => {
      // Root piping is the one whose data has no `previous_id` descriptor (== null catches
      // both the "missing" and "null" cases that the Collection+JSON serializer may emit).
      const root = pipingItems.find((p) => p.data.previous_id == null);
      expect(root, 'expected at least one root piping').to.exist;
      root
        .getPreviousPluginPiping()
        .then((prev) => {
          expect(prev).to.be.null;
        })
        .then(done, done);
    });

    it('can fetch the previous piping of a non-root piping from the REST API', (done) => {
      const child = pipingItems.find((p) => p.data.previous_id != null);
      expect(child, 'expected at least one non-root piping').to.exist;
      child
        .getPreviousPluginPiping()
        .then((prev) => {
          expect(prev).to.be.an.instanceof(PluginPiping);
          expect(prev.data.id).to.equal(child.data.previous_id);
        })
        .then(done, done);
    });

    it('can modify a plugin piping through a REST API PUT request', (done) => {
      const piping = pipingItems[0];
      const newCpu = piping.data.cpu_limit + 50;
      piping
        .put({ cpu_limit: newCpu })
        .then((updated) => {
          expect(updated).to.be.an.instanceof(PluginPiping);
          expect(updated.data.cpu_limit).to.equal(newCpu);
        })
        .then(done, done);
    });
  });

  describe('PipingDefaultParameter', () => {
    let defaultParamItems;

    before(() => {
      const url = pipelineListRes.collection.items[0].href;
      const pipeline = new Pipeline(url, auth);
      return pipeline
        .get()
        .then((p) => p.getDefaultParameters({ limit: 50 }))
        .then((defaultParams) => {
          defaultParamItems = defaultParams.getItems();
          expect(defaultParamItems.length).to.be.at.least(1);
        });
    });

    it('can fetch the corresponding plugin piping from the REST API', (done) => {
      const param = defaultParamItems[0];
      param
        .getPluginPiping()
        .then((piping) => {
          expect(piping).to.be.an.instanceof(PluginPiping);
          expect(piping.data.id).to.equal(param.data.plugin_piping_id);
        })
        .then(done, done);
    });

    it('can fetch the corresponding plugin parameter from the REST API', (done) => {
      const param = defaultParamItems[0];
      param
        .getPluginParameter()
        .then((plgParam) => {
          expect(plgParam).to.be.an.instanceof(PluginParameter);
          expect(plgParam.data.name).to.equal(param.data.param_name);
        })
        .then(done, done);
    });
  });

  describe('PipelineSourceFile', () => {
    let sourceFile;

    before(() => {
      return new Promise((resolve, reject) => {
        Request.runAsyncTask(function* () {
          try {
            let feedListRes = new FeedList(chrisUrl, auth);
            feedListRes = yield feedListRes.get();
            const sourceFilesUrl = feedListRes.collection.links.find(
              (l) => l.rel === 'pipelinesourcefiles'
            ).href;
            const list = new PipelineSourceFileList(sourceFilesUrl, auth);
            const fetched = yield list.get({ limit: 1 });
            const items = fetched.getItems();
            if (!items.length) {
              throw new Error('no pipeline source files found — re-run pre_test.sh to seed one');
            }
            sourceFile = items[0];
          } catch (ex) {
            reject(ex);
            return;
          }
          resolve();
        });
      });
    });

    it('can fetch the file blob from the REST API', (done) => {
      sourceFile
        .getFileBlob()
        .then((blob) => {
          expect(blob).to.exist;
          expect(blob.size).to.be.greaterThan(0);
        })
        .then(done, done);
    });

    it('can fetch its parent folder from the REST API', (done) => {
      // FileBrowserFolder is required only for the instanceof check; importing it lazily
      // would inflate the dependency graph for every test, so just resolve and check shape.
      sourceFile
        .getParentFolder()
        .then((folder) => {
          expect(folder).to.exist;
          expect(folder.isEmpty).to.be.false;
          expect(folder.data.path).to.be.a('string');
        })
        .then(done, done);
    });
  });
});
