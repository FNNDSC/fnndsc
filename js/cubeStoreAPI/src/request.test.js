import Request from './request';
import StoreRequestException from './exception';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Request', () => {
  let req;
  const storeUrl = 'http://localhost:8010/api/v1/';
  const usersUrl = storeUrl + 'users/';
  const auth = {
    username: 'cube',
    password: 'cube1234',
  };
  const contentType = 'application/vnd.collection+json';

  beforeEach(() => {
    req = new Request(auth, contentType);
  });

  it('can make authenticated GET request', done => {
    const result = req.get(storeUrl);

    result
      .then(response => {
        expect(response.collection.items).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can successfully make unauthenticated GET request', done => {
    const req = new Request(undefined, contentType);
    const result = req.get(usersUrl);

    result
      .then(response => {
        expect(response.collection).to.have.property('template');
        expect(response.collection).to.have.property('href');
        expect(response.collection).to.have.property('links');
      })
      .then(done, done);
  });

  it('can report unsuccessfull unauthenticated GET request', done => {
    const req = new Request(undefined, contentType);
    const result = req.get(storeUrl);

    result
      .catch(error => {
        expect(error).to.be.an.instanceof(StoreRequestException);
      })
      .then(done, done);
  });
});
