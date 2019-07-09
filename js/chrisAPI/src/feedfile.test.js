import { expect } from 'chai';
import Collection from './cj';
import Request from './request';
import { FeedFile } from './feedfile';
import { FeedList, Feed } from './feed';
import { PluginInstance } from './plugininstance';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let feedFileListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          // get the files for feed with id 1
          const feedItemURl = feedListRes.collection.items.filter(item => {
            const data = Collection.getItemDescriptors(item);
            return data.id === 1;
          })[0].href;
          let feed = new Feed(feedItemURl, auth);
          feed = yield feed.get();
          feedFileListRes = yield feed.getFiles();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(feedFileListRes);
      });
    });
  });

  describe('FeedFile', () => {
    let feedFile;

    beforeEach(() => {
      let url = feedFileListRes.collection.items[0].href;
      feedFile = new FeedFile(url, auth);
      return feedFile.get();
    });

    it('can fetch the associated file blob from the REST API', done => {
      const result = feedFile.getFileBlob();
      result
        .then(fileBlob => {
          return new Promise(function(resolve, reject) {
            const reader = new FileReader();

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
        .then(text => {
          expect(text).to.be.a('string');
        })
        .then(done, done);
    });

    it('can fetch the plugin instance that created this file from the REST API', done => {
      const result = feedFile.getPluginInstance();
      result
        .then(plgInst => {
          expect(plgInst).to.be.an.instanceof(PluginInstance);
          expect(plgInst.isEmpty).to.be.false;
        })
        .then(done, done);
    });
  });

  describe('FeedFileList', () => {
    let feedFileList;

    beforeEach(() => {
      feedFileList = feedFileListRes.clone();
    });

    it('can fetch the associated feed from the REST API', done => {
      const result = feedFileList.getFeed();
      result
        .then(feed => {
          expect(feed).to.be.an.instanceof(Feed);
          expect(feed.isEmpty).to.be.false;
        })
        .then(done, done);
    });
  });
});
