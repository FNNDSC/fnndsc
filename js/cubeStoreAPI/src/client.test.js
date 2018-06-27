import StoreClient from './client';
//import Collection from './cjson';
import { expect } from 'chai';
//import Request from './request';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('StoreClient', () => {
  const username = 'cube';
  const password = 'cube1234';
  const store_url = 'http://localhost:8010/api/v1/';
  const client = new StoreClient(store_url, username, password);

  it('can retrieve plugins given search params', done => {
    const searchParams = { type: 'fs' };
    const resp = client.getPlugins(searchParams);

    resp
      .then(plugins => {
        window.console.log('plugins: ', plugins);
        window.console.log('plugins length: ', plugins.length);
      })
      .catch(error => {
        window.console.log('Store error: ', error);
      })
      .then(done, done);
  });
});
