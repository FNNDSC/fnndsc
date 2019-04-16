import Client from './client';
import { expect } from 'chai';
import { FeedList } from './feed';
import RequestException from './exception';

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

  it('can create a new user through the REST API', done => {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '@babymri.org';

    const result = Client.createUser(usersUrl, username, password, email);
    result
      .then(user => {
        // window.console.log('data', user.data);
        expect(user.data.username).to.equal(username);
      })
      .then(done, done);
  });

  it('can report an unsuccessful atempt to create a new user through the REST API', done => {
    const username = 'user' + Date.now();
    const password = username + 'pass';
    const email = username + '/babymri.org';

    const result = Client.createUser(usersUrl, username, password, email);
    result
      .catch(error => {
        expect(error).to.be.an.instanceof(RequestException);
        expect(error.message).to.be.a('string');
        expect(error.request).to.be.an.instanceof(XMLHttpRequest);
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('email');
      })
      .then(done, done);
  });

  it('can fetch a user auth token from the REST API', done => {
    const result = Client.getAuthToken(authUrl, username, password);
    result
      .then(token => {
        expect(token).to.be.a('string');
      })
      .then(done, done);
  });

  it('can fetch the list of feeds from the REST API', done => {
    const result = client.getFeeds();
    result
      .then(feedsObj => {
        //window.console.log('items', feedsObj.getItems());
        expect(feedsObj).to.be.an.instanceof(FeedList);
        expect(feedsObj.getItems()).to.have.lengthOf.at.least(1);
      })
      .then(done, done);
  });
});
