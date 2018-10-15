import { expect } from 'chai';
import { ItemResource, ListResource} from './resource';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource test suite', () => {

  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let itemRes;

  describe('ItemResource', () => {

    beforeEach(() => {
      itemRes = new ItemResource(chrisUrl, auth);
    });

    it('can clone itself', () => {

      itemRes.collection = {
        "href": chrisUrl,
        "items": [{ "data": [{"name": "id", "value": 1}]}]
      };
      const itemResClone = itemRes.clone();
      expect(itemResClone).to.be.an.instanceof(ItemResource);
      expect(itemResClone.collection).to.deep.equal(itemRes.collection);
      expect(itemResClone.collection === itemRes.collection).to.be.false;
    });

  });

});
