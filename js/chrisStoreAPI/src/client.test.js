import StoreClient from './client';
import { expect } from 'chai';
import RequestException from './exception';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('StoreClient', () => {
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
  const username = 'cubeadmin';
  const password = 'cubeadmin1234';
  const storeUrl = 'http://localhost:8010/api/v1/';
  const authUrl = storeUrl + 'auth-token/';
  const usersUrl = storeUrl + 'users/';
  const auth = { username: username, password: password };
  //const auth = {token: "aad06988fef07626ed5cc205828cea21f9c501dd"};
  const client = new StoreClient(storeUrl, auth);

  it('can retrieve plugins given search params', function(done) {
    const searchParams = { type: 'fs' };

    this.timeout(10000); // mocha test timeout, don't work with arrow functions

    const result = client.getPlugins(searchParams);
    result
      .then(plugins => {
        expect(plugins).to.have.property('hasNextPage');
        expect(plugins).to.have.property('hasPreviousPage');
        expect(plugins.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can retrieve a plugin given its id', function(done) {
    const resp = client.getPlugin(1);
    resp
      .then(plugin => {
        expect(plugin.data.id).to.equal(1);
      })
      .then(done, done);
  });

  it('can not retrieve a plugin given its id when id does not exist in the store', function(done) {
    const resp = client.getPlugin(-1);
    resp
      .catch(error => {
        expect(error).to.be.an.instanceof(RequestException);
      })
      .then(done, done);
  });

  it('can retrieve the first page of a plugin parameters given the plugin id', function(done) {
    const resp = client.getPluginParameters(1, { offset: 0 });
    resp
      .then(parameters => {
        expect(parameters).to.have.property('hasNextPage');
        expect(parameters).to.have.property('hasPreviousPage');
        expect(parameters.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can add a new plugin to the store and then delete it', done => {
    const testPlgName = 'simplefsapp' + Date.now();
    const testPlgDockImg = 'fnndsc/pl-simplefsapp';
    const testPlgPublicRepo = 'http://github.com';

    const fileData = JSON.stringify(testPluginRepresentation);
    const dfile = new Blob([fileData], { type: 'application/json' });

    const result = client.addPlugin(testPlgName, testPlgDockImg, dfile, testPlgPublicRepo);
    result
      .then(response => {
        const plgName = response.data['name'];
        expect(plgName).to.equal(testPlgName);
        return client.removePlugin(response.data['id']); // pass rejection or fulfilment through the promise chain
      })
      .then(done, done);
  });

  it('can modify an existing plugin in the store', done => {
    const testPlgId = 1;
    const testPlgNewOwner = 'chris';
    const testPlgPublicRepo = 'https://github.com/FNNDSC11';

    const result = client.modifyPlugin(
      testPlgId,
      testPlgPublicRepo,
      testPlgNewOwner
    );
    result
      .then(response => {
        const plgPublicRepo = response.data['public_repo'];
        expect(plgPublicRepo).to.equal(testPlgPublicRepo);

        // restore plugin to its original public repo
        const res = client.modifyPlugin(
          testPlgId,
          'https://github.com/FNNDSC'
        );
        res.then(resp => {
          const plgPublicRepo = resp.data['public_repo'];
          expect(plgPublicRepo).to.equal('https://github.com/FNNDSC');
        });
      })
      .then(done, done);
  });

  it('can not modify an existing plugin in the store when sending wrong descriptor values', function(done) {
    const testPlgId = 1;
    const testPlgPublicRepo = 'github.com/FNNDSC11'; // wrong value

    const resp = client.modifyPlugin(testPlgId, testPlgPublicRepo);
    resp
      .catch(error => {
        expect(error).to.be.an.instanceof(RequestException);
        // console.log('error.message: ', error.message);
        expect(error.response.data).to.have.property('public_repo');
        expect(error.response.data).to.deep.equal(JSON.parse(error.message));
        expect(error.response.status).to.equal(400);
        expect(error.request).to.be.an.instanceof(XMLHttpRequest);
      })
      .then(done, done);
  });

  /* it('can delete plugin to the store', done => {
    const testPlgId = 28;

    const result = client.removePlugin(testPlgId);

    result
      .then(() => {
        window.console.log("Removed plugin with id: ", testPlgId);

        return client.getPlugin(testPlgId);
      })
      .then(done, done);
  });*/

  it('can retrieve pipelines given search params', function(done) {
    const searchParams = { limit: 5 };

    this.timeout(10000); // mocha test timeout, don't work with arrow functions

    const result = client.getPipelines(searchParams);
    result
      .then(pipelines => {
        expect(pipelines).to.have.property('hasNextPage');
        expect(pipelines).to.have.property('hasPreviousPage');
        expect(pipelines.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can retrieve a pipeline given its id', function(done) {
    const resp = client.getPipeline(1);
    resp
      .then(pipeline => {
        expect(pipeline.data.id).to.equal(1);
      })
      .then(done, done);
  });

  it('can retrieve the first page of a pipeline default parameters given the pipeline id', function(done) {
    const resp = client.getPipelineDefaultParameters(1, { offset: 0 });
    resp
      .then(parameters => {
        expect(parameters).to.have.property('hasNextPage');
        expect(parameters).to.have.property('hasPreviousPage');
        expect(parameters.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can retrieve the first page of a pipeline pipings given the pipeline id', function(done) {
    const resp = client.getPipelinePipings(1, { offset: 0 });
    resp
      .then(pipings => {
        expect(pipings).to.have.property('hasNextPage');
        expect(pipings).to.have.property('hasPreviousPage');
        expect(pipings.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can retrieve the first page of a pipeline plugins given the pipeline id', function(done) {
    const resp = client.getPipelinePlugins(1, { offset: 0 });
    resp
      .then(plugins => {
        //console.log('plugins.data: ', plugins.data);
        expect(plugins).to.have.property('hasNextPage');
        expect(plugins).to.have.property('hasPreviousPage');
        expect(plugins.data).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can modify an existing pipeline in the store', done => {
    const testPipelineId = 1;
    const data = {authors: 'admin@babymri.org'};

    const result = client.modifyPipeline(testPipelineId, data);
    result
      .then(response => {
        const pipelineAuthors = response.data['authors'];
        expect(pipelineAuthors).to.equal('admin@babymri.org');
      })
      .then(done, done);
  });

   /*it('can delete pipeline from the the store', done => {
    const testPipelineId = 2;

    const result = client.removePipeline(testPipelineId);

    result
      .then(() => {
        window.console.log("Removed pipeline with id: ", testPipelineId);

        return client.getPipeline(testPipelineId);
      })
      .then(done, done);
  });*/

  it('can retrieve currently authenticated user info', function(done) {
    const resp = client.getUser();

    resp
      .then(user => {
        //window.console.log(user.items[0].data);
        expect(user.data.username).to.equal(username);
      })
      .then(done, done);
  });

  it('can update currently authenticated user info (email and or password)', function(done) {
    const info = { email: 'cubeadmin1@babymri.org', password: password };
    const resp = client.updateUser(info);

    resp
      .then(user => {
        expect(user.data.email).to.equal('cubeadmin1@babymri.org');
      })
      .then(done, done);
  });

  it('can create a new user', function(done) {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '@babymri.org';

    const resp = StoreClient.createUser(usersUrl, username, password, email);

    resp
      .then(user => {
        expect(user.data.username).to.equal(username);
        expect(user.data.email).to.equal(email);
      })
      .then(done, done);
  });

  it('can retrieve a user auth token', function(done) {
    const resp = StoreClient.getAuthToken(authUrl, username, password);

    resp
      .then(token => {
        expect(token).to.be.a('string');
      })
      .then(done, done);
  });
});
