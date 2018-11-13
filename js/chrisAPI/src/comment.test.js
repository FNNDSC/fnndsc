import { expect } from 'chai';
import Request from './request';
import { FeedList } from './feed';
import { Comment, CommentList } from './comment';
import { FeedFileList } from './feedfile';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let commentListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          commentListRes = yield feedListRes.getComments();
          commentListRes = yield commentListRes.post({
            title: 'Test comment',
            content: 'Test comment content',
          });
          commentListRes = yield commentListRes.get();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(commentListRes);
      });
    });
  });

  describe('Comment', () => {
    let commentItem;

    beforeEach(() => {
      // get the plugin instance with id 1
      commentItem = commentListRes
        .getItems()
        .filter(item => {
          return item.data.id === 1;
        })[0]
        .clone();
    });
  });

  describe('CommentList', () => {
    let commentList;

    beforeEach(() => {
      commentList = commentListRes.clone();
    });
  });
});
