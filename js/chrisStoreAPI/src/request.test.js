import Request from './request';
import StoreRequestException from './exception';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Request', () => {
  let req;
  const storeUrl = 'http://localhost:8010/api/v1/';
  const usersUrl = storeUrl + 'users/';
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

  /*it('can make authenticated POST request', done => {
    const data = {
      name: 'simplefsap',
      dock_image: 'fnndsc/pl-simplefsapp',
      public_repo: 'http://github.com',
    };

    const fileData = JSON.stringify({ type: 'fs', parameters: [{ name: 'dir', type: 'path' }] });
    const dfile = new Blob([fileData], { type: 'application/json' });

    const result = req.post(storeUrl, data, dfile);

    result
      .then(response => {
        window.console.log('response: ', response);

        const fr = new FileReader();
        fr.onload = function() {
          window.console.log('dfile: ', JSON.parse(this.result));
        };
        fr.readAsText(dfile);
      })
      .then(done, done);
  });*/
});
