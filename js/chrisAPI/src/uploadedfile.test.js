import { expect } from 'chai';
import Request from './request';
import { FeedList } from './feed';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let uploadedFileListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request._runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          uploadedFileListRes = yield feedListRes.getUploadedFiles();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(uploadedFileListRes);
      });
    });
  });

  describe('UploadedFile', () => {
    let uploadedFile;

    beforeEach(() => {
      uploadedFile = uploadedFileListRes.getItems()[0].clone();
    });

    /*it('can fetch the associated file blob from the REST API', done => {

      const result = uploadedFile.getFileBlob();
      result
        .then(fileBlob => {
          return new Promise(function(resolve, reject) {
            const reader  = new FileReader();

            // fires after the blob has been read/loaded
            reader.addEventListener('loadend', ev => {
              if (ev.target.error) {
                reject(ev.target.error);
              } else {
                resolve(event.target.result);
              }
            });
           // start reading the file blob as text
           reader.readAsText(fileBlob);
          });
        })
        .then((text)=>{
          expect(text).to.be.a('string');
          expect(text).to.have.lengthOf.at.least(1);
        })
        .then(done, done);
    });*/
  });

  describe('ploadedFileList', () => {
    let uploadedFileList;

    beforeEach(() => {
      uploadedFileList = uploadedFileListRes.clone();
    });
  });
});
