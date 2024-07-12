import { expect } from 'chai';
import Request from './request';
import { FeedList } from './feed';
import { GroupList, Group, GroupUser } from './group';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Group resources', () => {
  const username = 'chris';
  const password = 'chris1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let groupListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          groupListRes = yield feedListRes.getGroups();
          groupListRes = yield groupListRes.post({ name: 'group' + Date.now()});
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(groupListRes);
      });
    });
  });

  describe('Group', () => {
    let group;

    beforeEach(() => {
      const url = groupListRes.collection.items[0].href;
      group = new Group(url, auth);
      return group.get();
    });

    it('can add a new user through the REST API', done => {
      const result =  group.adminAddUser('cube');
      result
        .then(grp_user => {
          // window.console.log('grp_user.data', grp_user.data);
          expect(grp_user).to.be.an.instanceof(GroupUser);
        })
        .then(done, done);
    });
  });

});
