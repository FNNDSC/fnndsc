import { expect } from 'chai';
import Collection from './cj';
import Request from './request';
import { FeedList, Feed } from './feed';
import { Plugin } from './plugin';
import { PluginInstance } from './plugininstance';
import { 
  FileBrowserFolderFileList, 
  FileBrowserFolderLinkFileList, 
  FileBrowserFolder, 
  FileBrowserFolderLinkFile,
  FolderGroupPermission,
  FolderUserPermission,
  FileGroupPermission,
  FileUserPermission,
  LinkFileGroupPermission,
  LinkFileUserPermission
} from './filebrowser';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('File browser resources', function () {
  this.timeout(10000);

  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let fileBrowserFolderListRes;
  let output_folder;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();

          const pluginListRes = yield feedListRes.getPlugins({ limit: 20 });
          // get the plugin with name 'pl-dircopy'
          const plgUrl = pluginListRes.collection.items.filter(item => {
            const data = Collection.getItemDescriptors(item);
            return data.name === 'pl-dircopy';
          })[0].href;
          let plugin = new Plugin(plgUrl, auth);
          plugin = yield plugin.get();

          const pluginInstanceListRes = yield plugin.getPluginInstances();
          const plgInstUrl = pluginInstanceListRes.collection.items.filter(item => {
            const data = Collection.getItemDescriptors(item);
            return data.id === 1;
          })[0].href;
          let pluginInst = new PluginInstance(plgInstUrl, auth);
          pluginInst = yield pluginInst.get();
          output_folder = yield pluginInst.getOutputFolder()

          fileBrowserFolderListRes = yield feedListRes.getFileBrowserFolders();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(fileBrowserFolderListRes);
      });
    });
  });

  describe('FileBrowserFolder', () => {
    let uploads_folder;
    let folder;

    beforeEach(() => {
      return new Promise(function(resolve, reject) {
        Request.runAsyncTask(function*() {
          try {
            const path = 'home/cube/uploads/' +  Date.now()
            fileBrowserFolderListRes = yield fileBrowserFolderListRes.post({ path:  path });
            folder = fileBrowserFolderListRes.getItems()[0];
            fileBrowserFolderListRes = yield fileBrowserFolderListRes.get({ path: 'home/cube/uploads'});
            uploads_folder = fileBrowserFolderListRes.getItems()[0];
          } catch (ex) {
            reject(ex);
            return;
          }
          resolve(folder);
        });
      });
    });

    it('can fetch the link files inside the output folder from the REST API', done => {
      const result = output_folder.getLinkFiles();
      result
        .then(linkFileList => {
          expect(linkFileList).to.be.an.instanceof(FileBrowserFolderLinkFileList);
          expect(linkFileList.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the files inside the user uploads folder from the REST API', done => {
      const result = uploads_folder.getFiles();
      result
        .then(fileList => {
          expect(fileList).to.be.an.instanceof(FileBrowserFolderFileList);
          expect(fileList.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can become public through the REST API', done => {
      const result = folder.makePublic();
      result
        .then(folder => {
          expect(folder.data.public).to.be.true;
        })
        .then(done, done);
    });

    it('can become unpublic through the REST API', done => {
      const result = folder.makeUnpublic();
      result
        .then(folder => {
          expect(folder.data.public).to.be.false;
        })
        .then(done, done);
    });   

    it('can grant a group permission through the REST API', done => {
      let permission;
      const result = folder.addGroupPermission('all_users', 'r');
      result
        .then(grp_permission => {
          expect(grp_permission).to.be.an.instanceof(FolderGroupPermission);
          expect(grp_permission.data.group_name).to.equal('all_users');
        })
        .then( () => folder.getGroupPermission('all_users') )
        .then(grp_permission => {
          expect(grp_permission).to.be.an.instanceof(FolderGroupPermission);
          expect(grp_permission.data.group_name).to.equal('all_users');
        })
        .then(done, done);
    });

    it('can grant a user permission through the REST API', done => {
      const result = folder.addUserPermission('chris', 'r');
      result
        .then(user_permission => {
          expect(user_permission).to.be.an.instanceof(FolderUserPermission);
          expect(user_permission.data.user_username).to.equal('chris');
        })
        .then( () => folder.getUserPermission('chris') )
        .then(user_permission => {
          expect(user_permission).to.be.an.instanceof(FolderUserPermission);
          expect(user_permission.data.user_username).to.equal('chris');
        })
        .then(done, done);
    });  

  });

  describe('FileBrowserFolderLinkFile', () => {
    let linkFile;

    beforeEach(() => {
      return new Promise(function(resolve, reject) {
        Request.runAsyncTask(function*() {
          try {
            const linkFileList = yield output_folder.getLinkFiles();
            const url = linkFileList.collection.items[0].href;
            linkFile = new FileBrowserFolderLinkFile(url, auth);
            linkFile = yield linkFile.get();
          } catch (ex) {
            reject(ex);
            return;
          }
          resolve(linkFile);
        });
      });
    });

    it('can fetch the linked resource (file or folder) from the REST API', done => {
      const result = linkFile.getLinkedResource();
      result
        .then(res => {
          expect(res).to.be.an.instanceof(FileBrowserFolder);
          expect(res.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the associated file blob from the REST API', done => {
      const result = linkFile.getFileBlob();
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
          expect(text).to.equal('home/cube/uploads');
        })
        .then(done, done);
    });

    it('can become public through the REST API', done => {
      const result = linkFile.makePublic();
      result
        .then(lf => {
          expect(lf.data.public).to.be.true;
        })
        .then(done, done);
    });

    it('can become unpublic through the REST API', done => {
      const result = linkFile.makeUnpublic();
      result
        .then(lf => {
          expect(lf.data.public).to.be.false;
        })
        .then(done, done);
    });   
    
  });

  describe('FileBrowserFolderFile', () => {
    let file;

    beforeEach(() => {
      return new Promise(function(resolve, reject) {
        Request.runAsyncTask(function*() {
          try {
            fileBrowserFolderListRes = yield fileBrowserFolderListRes.get({ path: 'home/cube/uploads'});
            const folder = fileBrowserFolderListRes.getItems()[0];
            const fileList= yield folder.getFiles();
            file = fileList.getItems()[0];
          } catch (ex) {
            reject(ex);
            return;
          }
          resolve(file);
        });
      });
    });

    it('can fetch the associated file blob from the REST API', done => {
      const result = file.getFileBlob();
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
          expect(text).to.equal('Welcome to ChRIS!');
        })
        .then(done, done);
    });

    it('can become public through the REST API', done => {
      const result = file.makePublic();
      result
        .then(file => {
          expect(file.data.public).to.be.true;
        })
        .then(done, done);
    });

    it('can become unpublic through the REST API', done => {
      const result = file.makeUnpublic();
      result
        .then(file => {
          expect(file.data.public).to.be.false;
        })
        .then(done, done);
    });    

  });
});
