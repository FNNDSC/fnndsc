import Request from './request';
import RequestException from './exception';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Request', () => {
  let req;
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = {
    username: 'cube',
    password: 'cube1234',
  };
  const contentType = 'application/vnd.collection+json';

  beforeEach(() => {
    req = new Request(auth, contentType);
  });

  it('can make authenticated GET request', done => {
    const result = req.get(chrisUrl);

    result
      .then(response => {
        expect(response.data.collection.links).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });

  it('can report unsuccessfull authenticated GET request', done => {
    const badUrl = chrisUrl + '1test/';
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
    const result = req.get(chrisUrl);

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

  it('can make authenticated multipart POST request and DELETE request', done => {
    const url = chrisUrl + 'uploadedfiles/';
    const data = {
      upload_path: auth.username + '/uploads/test' + Date.now() + '.txt',
    };
    const fileContent = 'This is a test file';
    const fileData = JSON.stringify(fileContent);
    const uploadFile = new Blob([fileData], { type: 'application/json' });
    const uploadFileObj = { fname: uploadFile };

    const result = req.post(url, data, uploadFileObj);

    result
      .then(response => {
        const path = response.data.collection.items[0].data.filter(descriptor => {
          return descriptor.name === 'fname';
        })[0].value;

        expect(path).to.equal(data.upload_path);

        // now delete the file
        const url = response.data.collection.items[0].href;
        return req.delete(url).then(() => {}); // pass rejection or fulfilment down the promise chain
      })
      .then(done, done);
  });

  /*it('can make authenticated DELETE request', done => {
    const result = req.delete(chrisUrl + '1/');

    result
      .then(response => {
          window.console.log('delete response: ', response);
      })
      .then(done, done);
  });*/
});
