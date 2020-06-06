import Request from './request';
import RequestException from './exception';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Request', () => {
  let req;
  const chrisStoreUrl = 'http://localhost:8010/api/v1/';
  const auth = {
    username: 'cubeadmin',
    password: 'cubeadmin1234',
  };
  const contentType = 'application/vnd.collection+json';

  beforeEach(() => {
    req = new Request(auth, contentType);
  });

  it('can make authenticated GET request', done => {
    const result = req.get(chrisStoreUrl);

    result
      .then(response => {
        expect(response.data.collection.links).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can report unsuccessfull authenticated GET request', done => {
    const badUrl = chrisStoreUrl + '1test/';
    const result = req.get(badUrl);

    result
      .catch(error => {
        expect(error.response.status).to.equal(404);
        expect(error.message).to.be.a('string');
        expect(error.request).to.be.an.instanceof(XMLHttpRequest);
        expect(error).to.be.an.instanceof(RequestException);
      })
      .then(done, done);
  });

  it('can report unsuccessfull unauthenticated GET request', done => {
    const req = new Request(undefined, contentType);
    const result = req.get(chrisStoreUrl + 'users/1/');

    result
      .catch(error => {
        expect(error).to.be.an.instanceof(RequestException);
        expect(error.message).to.be.a('string');
        expect(error.request).to.be.an.instanceof(XMLHttpRequest);
        expect(error.response.status).to.equal(401);
        expect(error.response.data).to.be.a('string');
      })
      .then(done, done);
  });

  /*it('can make authenticated DELETE request', done => {
    const result = req.delete(chrisStoreUrl + '1/');

    result
      .then(response => {
          window.console.log('delete response: ', response);
      })
      .then(done, done);
  });*/
});
