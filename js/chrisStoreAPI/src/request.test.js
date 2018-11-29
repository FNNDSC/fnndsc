import Request from './request';
import StoreRequestException from './exception';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Request', () => {
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

  let req;
  const storeUrl = 'http://localhost:8010/api/v1/';
  const auth = {
    username: 'cubeadmin',
    password: 'cubeadmin1234',
  };
  const contentType = 'application/vnd.collection+json';

  beforeEach(() => {
    req = new Request(auth, contentType);
  });

  it('can make authenticated GET request', done => {
    const result = req.get(storeUrl);

    result
      .then(response => {
        expect(response.data.collection.items).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can successfully make unauthenticated GET request', done => {
    const req = new Request(undefined, contentType);
    const result = req.get(storeUrl);

    result
      .then(response => {
        expect(response.data.collection).to.have.property('queries');
        expect(response.data.collection).to.have.property('href');
        expect(response.data.collection).to.have.property('links');
      })
      .then(done, done);
  });

  it('can report unsuccessfull unauthenticated GET request', done => {
    const req = new Request(undefined, contentType);
    const result = req.get(storeUrl + '1/');

    result
      .catch(error => {
        expect(error).to.be.an.instanceof(StoreRequestException);
      })
      .then(done, done);
  });

  it('can make authenticated multipart POST request and DELETE request', done => {
    const data = {
      name: auth.username + '/simplefsapp' + Date.now(),
      dock_image: 'fnndsc/pl-simplefsapp',
      public_repo: 'http://github.com',
    };
    const fileData = JSON.stringify(testPluginRepresentation);
    const dfile = new Blob([fileData], { type: 'application/json' });
    const dfileObj = { descriptor_file: dfile };

    const result = req.post(storeUrl + 'user-plugins/', data, dfileObj);

    result
      .then(response => {
        const name = response.data.collection.items[0].data.filter(descriptor => {
          return descriptor.name === 'name';
        })[0].value;

        expect(name).to.equal(data.name);

        /*  const fr = new FileReader();
        fr.onload = function() {
          window.console.log('dfile: ', JSON.parse(this.result));
        };
        fr.readAsText(dfile);*/

        // now delete the plugin
        const url = response.data.collection.items[0].href;
        return req.delete(url).then(() => {}); // pass rejection or fulfilment through the promise chain
      })
      .then(done, done);
  });

  /*it('can make authenticated DELETE request', done => {
    const result = req.delete(storeUrl + '1/');

    result
      .then(response => {
          window.console.log('delete response: ', response);
      })
      .then(done, done);
  });*/
});
