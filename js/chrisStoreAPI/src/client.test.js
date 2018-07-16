import StoreClient from './client';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('StoreClient', () => {
  const username = 'cubeadmin';
  const password = 'cubeadmin1234';
  const storeUrl = 'http://localhost:8010/api/v1/';
  const authUrl = storeUrl + 'auth-token/';
  const usersUrl = storeUrl + 'users/';
  const auth = { username: username, password: password };
  //const auth = {token: "aad06988fef07626ed5cc205828cea21f9c501dd"};
  const client = new StoreClient(storeUrl, auth);

  it('can retrieve a plugin given its name', function(done) {
    const resp = client.getPlugin('simplefsapp');

    resp
      .then(plugin => {
        expect(plugin.name).to.equal('simplefsapp');
        expect(plugin.parameters[0].name).to.equal('dir');
      })
      .then(done, done);
  });

  it('can retrieve plugins given search params', function(done) {
    const searchParams = { type: 'fs' };

    this.timeout(10000); // mocha test timeout, don't work with arrow functions

    const result1 = client.getPlugins(searchParams, onePageResp1 => {
      expect(onePageResp1).to.have.property('currentLink');
      expect(onePageResp1).to.have.property('plugins');
    });
    result1
      .then(fsPlugins => {
        expect(fsPlugins).to.have.lengthOf.at.least(1);

        const result2 = client.getPlugins(null, onePageResp2 => {
          expect(onePageResp2).to.have.property('currentLink');
          expect(onePageResp2).to.have.property('plugins');
        });
        result2.then(allPlugins => {
          expect(allPlugins).to.have.lengthOf.above(fsPlugins.length);
        });
      })
      .then(done, done);
  });

  it('can retrieve currently authenticated user info', function(done) {
    const resp = client.getUser();

    resp
      .then(user => {
        //window.console.log(user.items[0].data);
        expect(user.items).to.have.lengthOf(1);
      })
      .then(done, done);
  });

  it('can update currently authenticated user info (email and or password)', function(done) {
    const info = { email: 'cubeadmin1@babymri.org', password: password };
    const resp = client.updateUser(info);

    resp
      .then(user => {
        expect(user.items).to.have.lengthOf(1);
      })
      .then(done, done);
  });

  it('can create a new user', function(done) {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '@babymri.org';

    const resp = StoreClient.createUser(usersUrl, username, password, email);

    resp
      .then(user => {
        //window.console.log(user.items[0].data);
        expect(user.items).to.have.lengthOf(1);
      })
      .then(done, done);
  });

  it('can retrieve a user auth token', function(done) {
    const resp = StoreClient.getAuthToken(authUrl, username, password);

    resp
      .then(token => {
        expect(token).to.be.a('string');
      })
      .then(done, done);
  });
});
