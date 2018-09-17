//import StoreClient from './client';
//import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

/*describe('StoreClient', () => {
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

  it('can retrieve a plugin given its name', function(done) {
    const resp = client.getPlugin('simplefsapp');
    resp
      .then(plugin => {
        expect(plugin.name).to.equal('simplefsapp');
        expect(plugin.parameters[0].name).to.equal('dir');
      })
      .then(done, done);
  });

  it('can retrieve plugins given search params', function(done) {
    const searchParams = { type: 'fs' };

    this.timeout(10000); // mocha test timeout, don't work with arrow functions

    const result1 = client.getPlugins(searchParams, onePageResp1 => {
      expect(onePageResp1).to.have.property('currentLink');
      expect(onePageResp1).to.have.property('plugins');
    });
    result1
      .then(fsPlugins => {
        expect(fsPlugins).to.have.lengthOf.at.least(1);

        const result2 = client.getPlugins(null, onePageResp2 => {
          expect(onePageResp2).to.have.property('currentLink');
          expect(onePageResp2).to.have.property('plugins');
        });
        result2.then(allPlugins => {
          expect(allPlugins).to.have.lengthOf.above(fsPlugins.length);
        });
      })
      .then(done, done);
  });

  it('can retrieve currently authenticated user plugins', function(done) {
    this.timeout(10000); // mocha test timeout, don't work with arrow functions

    const result = client.getAuthenticatedUserPlugins(onePageResp1 => {
      expect(onePageResp1).to.have.property('currentLink');
      expect(onePageResp1).to.have.property('plugins');
    });
    result
      .then(currentUserPlugins => {
        expect(currentUserPlugins).to.have.lengthOf.at.least(1);
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
        const plgName = response.items[0].data.filter(descriptor => {
          return descriptor.name === 'name';
        })[0].value;

        expect(plgName).to.equal(testPlgName);

        return client.removePlugin(testPlgName); // pass rejection or fulfilment through the promise chain
      })
      .then(done, done);
  });

  it('can modify an existing plugin in the store', done => {
    const testPlgName = 'simplefsapp';
    const testPlgNewName = 'simplefsapp' + Date.now();
    const testPlgNewOwner = 'chris';
    const testPlgDockImg = 'fnndsc/pl-simplefsapp';
    const testPlgPublicRepo = 'http://github.com';
    const testPlgDescription = testPluginRepresentation.description;

    testPluginRepresentation.description = 'A quite simple chris fs app demo';
    let fileData = JSON.stringify(testPluginRepresentation);
    let dfile = new Blob([fileData], { type: 'application/json' });

    const result = client.modifyPlugin(
      testPlgName,
      testPlgDockImg,
      dfile,
      testPlgPublicRepo,
      testPlgNewName,
      testPlgNewOwner
    );
    result
      .then(response => {
        const plgDescription = response.items[0].data.filter(descriptor => {
          return descriptor.name === 'description';
        })[0].value;

        const plgName = response.items[0].data.filter(descriptor => {
          return descriptor.name === 'name';
        })[0].value;

        expect(plgDescription).to.equal(testPluginRepresentation.description);
        expect(plgName).to.equal(testPlgNewName);

        // restore plugin to its original name and description
        testPluginRepresentation.description = testPlgDescription;
        fileData = JSON.stringify(testPluginRepresentation);
        dfile = new Blob([fileData], { type: 'application/json' });

        const res = client.modifyPlugin(
          testPlgNewName,
          testPlgDockImg,
          dfile,
          testPlgPublicRepo,
          testPlgName,
          testPlgNewOwner
        );
        res.then(resp => {
          const plgDescription = resp.items[0].data.filter(descriptor => {
            return descriptor.name === 'description';
          })[0].value;

          const plgName = resp.items[0].data.filter(descriptor => {
            return descriptor.name === 'name';
          })[0].value;

          expect(plgDescription).to.equal(testPlgDescription);
          expect(plgName).to.equal(testPlgName);
        });
      })
      .then(done, done);
  });

  /*it('can delete plugin to the store', done => {
    const testPlgName = 'pacsquery';

    const result = client.removePlugin(testPlgName);

    result
      .then(response => {
        //expect(response.items).to.have.lengthOf(1);
      })
      .then(done, done);
  });*/

/*  it('can retrieve currently authenticated user info', function(done) {
    const resp = client.getUser();

    resp
      .then(user => {
        //window.console.log(user.items[0].data);
        expect(user.items).to.have.lengthOf(1);
      })
      .then(done, done);
  });

  it('can update currently authenticated user info (email and or password)', function(done) {
    const info = { email: 'cubeadmin1@babymri.org', password: password };
    const resp = client.updateUser(info);

    resp
      .then(user => {
        expect(user.items).to.have.lengthOf(1);
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
        //window.console.log(user.items[0].data);
        expect(user.items).to.have.lengthOf(1);
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
});*/
