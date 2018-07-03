import StoreClient from './client';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('StoreClient', () => {
  const username = 'cube';
  const password = 'cube1234';
  const store_url = 'http://localhost:8010/api/v1/';
  const client = new StoreClient(store_url, username, password);

  it('can retrieve a plugin given its name', function(done) {
    const resp = client.getPlugin('simplefsapp');

    resp
      .then(plugin => {
        //window.console.log('plugin: ', plugin);
        expect(plugin.name).to.equal('simplefsapp');
        expect(plugin.parameters[0].name).to.equal('dir');
      })
      .then(done, done);
  });

  it('can retrieve plugins given search params', function(done) {
    const searchParams = { type: 'fs' };
    const resp1 = client.getPlugins(searchParams);

    this.timeout(10000); // mocha test timeout, don't work with arrow functions

    resp1
      .then(fsPlugins => {
        const resp2 = client.getPlugins();

        expect(fsPlugins).to.have.lengthOf.at.least(1);

        resp2.then(allPlugins => {
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

  it('can create a new user', function(done) {
    const username = 'jbernal2';
    const password = 'jbernalpass';
    const email = 'jbernal2@babymri.org';

    const resp = client.createUser(username, password, email);

    resp
      .then(user => {
        //window.console.log(user.items[0].data);
        expect(user.items).to.have.lengthOf(1);
      })
      .then(done, done);
  });

  it('can retrieve a user auth token', function(done) {
    const resp = StoreClient.getAuthToken(username, password);

    resp
      .then(token => {
        window.console.log('token: ', token);
        //expect(user.items).to.have.lengthOf(1);
      })
      .then(done, done);
  });
});
