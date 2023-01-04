import { expect } from 'chai';
import Request from './request';
import { FeedList } from './feed';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'chris';
  const password = 'chris1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let pluginAdminListRes;

  before(() => {
    return new Promise(function(resolve, reject) {
      Request.runAsyncTask(function*() {
        let feedListRes = new FeedList(chrisUrl, auth);
        try {
          feedListRes = yield feedListRes.get();
          pluginAdminListRes = yield feedListRes.getPluginAdmins();
        } catch (ex) {
          reject(ex);
          return;
        }
        resolve(pluginAdminListRes);
      });
    });
  });

  describe('PluginAdminList', () => {
    let pluginAdminList;

    beforeEach(() => {
      pluginAdminList = pluginAdminListRes.clone();
    });

    it('can create a new plugin admin item resource through a REST API POST request', done => {
      const data = {
        compute_names: 'host',
      };
      const name = 'pl-simplefsapp' + Date.now();
      const fileContent = {"name": name , "version": "2.1.0", "dock_image": "fnndsc/pl-simpledsapp",
      "public_repo": "https://github.com/FNNDSC/pl-simpledsapp", "type": "ds",
      "parameters": [{"name": "prefix", "type": "str", "optional": true, "flag": "--prefix", "short_flag": "-p", "action": "store",
      "help": "prefix for file names", "default": "", "ui_exposed": true}, {"name": "b_ignoreInputDir",
      "type": "bool", "optional": true, "flag": "--ignoreInputDir", "short_flag": "--ignoreInputDir",
      "action": "store_true", "help": "if set, ignore the input dir completely", "default": false, "ui_exposed": true},
      {"name": "sleepLength", "type": "str", "optional": true, "flag": "--sleepLength", "short_flag": "--sleepLength",
       "action": "store", "help": "time to sleep before performing plugin action", "default": "0", "ui_exposed": true},
       {"name": "dummyInt", "type": "int", "optional": true, "flag": "--dummyInt", "short_flag": "--dummyInt",
       "action": "store", "help": "dummy integer parameter", "default": 1, "ui_exposed": true}, {"name": "dummyFloat",
       "type": "float", "optional": true, "flag": "--dummyFloat", "short_flag": "--dummyFloat", "action": "store",
       "help": "dummy float parameter", "default": 1.1, "ui_exposed": true}], "icon": "", "authors": "FNNDSC <dev@babyMRI.org>",
       "title": "Simple chris ds app", "category": "copy", "description": "A simple ChRIS ds app demo",
       "documentation": "http://wiki", "license": "MIT",  "selfpath": "/usr/local/bin", "selfexec": "simpledsapp",
       "execshell": "/usr/local/bin/python", "max_number_of_workers": 1, "min_number_of_workers": 1,
        "max_memory_limit": "", "min_memory_limit": "", "max_cpu_limit": "", "min_cpu_limit": "", "max_gpu_limit": 0, "min_gpu_limit": 0};
      const fileData = JSON.stringify(fileContent);
      const uploadFile = new Blob([fileData], { type: 'application/json' });
      const uploadFileObj = { fname: uploadFile };

      const result = pluginAdminList.post(data, uploadFileObj);

      result
        .then(pluginAdminList => {
          expect(pluginAdminList.data[0].name).to.equal(name);
        })
        .then(done, done);
    });
  });
});
