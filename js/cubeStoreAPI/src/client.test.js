import StoreClient from './client';
import Collection from './cjson';
import { expect } from 'chai';
import Request from './request';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('StoreClient', () => {
  const username = 'cube';
  const password = 'cube1234';
  const store_url = 'http://localhost:8010/api/v1/';
  const req = new Request({ username: username, password: password });
  const client = new StoreClient(store_url, username, password);

  it('can retrieve an array of paginated collections', done => {
    const result = req.get(store_url);

    result
      .then(function(response) {
        return client.getPaginatedCollections(response.collection);
      })
      .then(function(collections) {
        window.console.log('collections: ', collections);
        window.console.log('collections length: ', collections.length);
      })
      .catch(function(error) {
        window.console.log('Store error: ', error);
      })
      .then(done, done);
  });
});
