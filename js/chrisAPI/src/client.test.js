import Client from './client';
import { expect } from 'chai';
import { FeedList } from './feed';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Client', () => {
  
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const authUrl = chrisUrl + 'auth-token/';
  const usersUrl = chrisUrl + 'users/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  const client = new Client(chrisUrl, auth);

  it('can create a new user', function(done) {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '@babymri.org';

    const resp = Client.createUser(usersUrl, username, password, email);
    resp
      .then(user => {
        // window.console.log('data', user.data);
        expect(user.data.username).to.equal(username);
      })
      .then(done, done);
  });

  it('can retrieve a user auth token', function(done) {
    const resp = Client.getAuthToken(authUrl, username, password);
    resp
      .then(token => {
        expect(token).to.be.a('string');
      })
      .then(done, done);
  });

  it('can retrieve the list of feeds', function(done) {
    const resp = client.getFeeds();
    resp
      .then(feedsObj => {
        //window.console.log('items', feedsObj.getItems());
        expect(feedsObj).to.be.an.instanceof(FeedList);
        expect(feedsObj.getItems()).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });
});
