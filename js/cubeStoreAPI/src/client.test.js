import StoreClient from './client';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('StoreClient', () => {
  const username = 'cube';
  const password = 'cube1234';
  const store_url = 'http://localhost:8010/api/v1/';
  const client = new StoreClient(store_url, username, password);

  const plugin_repr = {
    name: 'simplefsapp',
    creation_date: '2018-06-29T16:02:12.915896Z',
    modification_date: '2018-06-29T16:02:12.915940Z',
    dock_image: 'fnndsc/pl-simplefsapp',
    public_repo: 'https://github.com/FNNDSC',
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

  it('can retrieve a plugin given its name', function(done) {
    const resp = client.getPlugin('simplefsapp');

    resp
      .then(plugin => {
        //window.console.log('plugin: ', plugin);
        expect(plugin).to.deep.equal(plugin_repr);
      })
      .then(done, done);
  });

  it('can retrieve plugins given search params', function(done) {
    const searchParams = { type: 'fs' };
    const resp = client.getPlugins(searchParams);

    this.timeout(10000); // mocha test timeout, don't work with arrow functions

    resp
      .then(plugins => {
        expect(plugins.length).to.equal(3);
      })
      .then(done, done);
  });
});
