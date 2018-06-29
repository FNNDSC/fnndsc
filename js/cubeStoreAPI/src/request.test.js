import Request from './request';
import StoreRequestException from './exception';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Request', () => {
  let req;
  const store_url = 'http://localhost:8010/api/v1/';
  const user_url = store_url + 'users/';
  const auth = {
    username: 'cube',
    password: 'cube1234',
  };
  const contentType = 'application/vnd.collection+json';

  beforeEach(function() {
    req = new Request(auth, contentType);
  });

  it('can make authenticated request', done => {
    const result = req.get(store_url);

    result
      .then(function(response) {
        expect(response.collection.items.length).to.equal(7);
      })
      .then(done, done);
  });

  it('can successfully make unauthenticated request to users url', done => {
    const result = req.get(user_url);

    result
      .then(function(response) {
        expect(response.collection).to.have.property('template');
        expect(response.collection).to.have.property('href');
        expect(response.collection).to.have.property('links');
      })
      .then(done, done);
  });

  it('can report unsuccessfully unauthenticated request', done => {
    const req = new Request(undefined, contentType);
    const result = req.get(store_url);

    result
      .catch(function(error) {
        expect(error).to.be.an.instanceof(StoreRequestException);
      })
      .then(done, done);
  });
});
