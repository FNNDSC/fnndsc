import { expect } from 'chai';
import Request from './request';
import { FeedList } from './feed';
import { FileGroupPermission, FileUserPermission } from './filebrowser';
import { UserFile } from './userfile';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('User file resources', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let userFileListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          userFileListRes = yield feedListRes.getUserFiles();

          // create one user file item resource
          const data = {
            upload_path: 'home/' + username + '/uploads/test' + Date.now() + '.txt',
          };
          const fileContent = 'This is an uploaded test file';
          const fileData = JSON.stringify(fileContent);
          const uploadFile = new Blob([fileData], { type: 'application/json' });
          const uploadFileObj = { fname: uploadFile };
          userFileListRes = yield userFileListRes.post(data, uploadFileObj);
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(userFileListRes);
      });
    });
  });

  describe('UserFile', () => {
    let userFile;

    beforeEach(() => {
      // get the plugin instance with id 1
      const url = userFileListRes.collection.items[0].href;
      userFile = new UserFile(url, auth);
      return userFile.get();
    });

    it('can fetch the associated file blob from the REST API', done => {
      const result = userFile.getFileBlob();
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
          expect(text).to.equal('"This is an uploaded test file"');
        })
        .then(done, done);
    });

    it('can become public through the REST API', done => {
      const result = userFile.makePublic();
      result
        .then(userFile => {
          expect(userFile.data.public).to.be.true;
        })
        .then(done, done);
    });

    it('can become unpublic through the REST API', done => {
      const result = userFile.makeUnpublic();
      result
        .then(userFile => {
          expect(userFile.data.public).to.be.false;
        })
        .then(done, done);
    });   

    it('can grant a group permission through the REST API', done => {
      const result = userFile.addGroupPermission('all_users', 'r');
      result
        .then(grp_permission => {
          expect(grp_permission).to.be.an.instanceof(FileGroupPermission);
          expect(grp_permission.data.group_name).to.equal('all_users');
        })
        .then( () => userFile.getGroupPermission('all_users') )
        .then(grp_permission => {
          expect(grp_permission).to.be.an.instanceof(FileGroupPermission);
          expect(grp_permission.data.group_name).to.equal('all_users');
        })
        .then(done, done);
    });

    it('can grant a user permission through the REST API', done => {
      const result = userFile.addUserPermission('chris', 'r');
      result
        .then(user_permission => {
          expect(user_permission).to.be.an.instanceof(FileUserPermission);
          expect(user_permission.data.user_username).to.equal('chris');
        })
        .then( () => userFile.getUserPermission('chris') )
        .then(user_permission => {
          expect(user_permission).to.be.an.instanceof(FileUserPermission);
          expect(user_permission.data.user_username).to.equal('chris');
        })
        .then(done, done);
    }); 
  });

  describe('UserFileList', () => {
    let userFileList;

    beforeEach(() => {
      userFileList = userFileListRes.clone();
    });

    it('can create a new user file item resource through a REST API POST request', done => {
      const data = {
        upload_path: 'home/' + username + '/uploads/test' + Date.now() + '.txt',
      };
      const fileContent = 'This is a test file';
      const fileData = JSON.stringify(fileContent);
      const uploadFile = new Blob([fileData], { type: 'application/json' });
      const uploadFileObj = { fname: uploadFile };

      const result = userFileList.post(data, uploadFileObj);

      result
        .then(userFileList => {
          expect(userFileList.data[0].fname).to.equal(data.upload_path);
        })
        .then(done, done);
    });
  });
});
