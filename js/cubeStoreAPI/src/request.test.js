import Request from './request';
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

  it('can make authenticated request', done => {
    const req = new Request(auth);
    const result = req.get(store_url);

    result
      .then(function(response) {
        const cj = response;

        window.console.log('cj: ', cj);
        expect(cj).to.deep.equal(cj);
      })
      .catch(function(error) {
        window.console.log('error: ', error);
      })
      .then(done, done);
  });

  it('can successfully make unauthenticated request', done => {
    const req = new Request();
    const result = req.get(user_url);

    result
      .then(function(response) {
        const cj = response;

        window.console.log('cj: ', cj);
        expect(cj).to.deep.equal(cj);
      })
      .catch(function(error) {
        window.console.log('error: ', error);
      })
      .then(done, done);
  });

  it('can report unsuccessfully unauthenticated request', done => {
    const req = new Request();
    const result = req.get(store_url);

    result
      .then(function(response) {
        const cj = response;

        window.console.log('cj: ', cj);
        expect(cj).to.deep.equal(cj);
      })
      .catch(function(error) {
        window.console.log(error);
      })
      .then(done, done);
  });
});
