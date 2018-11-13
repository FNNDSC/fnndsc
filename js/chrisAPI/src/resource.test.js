import { expect } from 'chai';
import sinon from 'sinon';
import { ItemResource, ListResource } from './resource';
import Collection from './cj';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Resource', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let collection;

  describe('ItemResource', () => {
    let itemRes;

    beforeEach(() => {
      collection = {
        href: chrisUrl,
        items: [{ data: [{ name: 'id', value: 1 }] }],
        links: [],
      };
      itemRes = new ItemResource(chrisUrl, auth);
      itemRes.collection = collection;
    });

    it('can clone itself', () => {
      const itemResClone = itemRes.clone();
      expect(itemResClone).to.be.an.instanceof(ItemResource);
      expect(itemResClone.collection).to.deep.equal(itemRes.collection);
      expect(itemResClone.collection === itemRes.collection).to.be.false;
    });

    it('can check whether or not it is empty (has no data)', () => {
      expect(itemRes.isEmpty).to.be.true;
      itemRes.item = itemRes.collection.items[0];
      expect(itemRes.isEmpty).to.be.false;
    });

    it('can retrieve its data', () => {
      itemRes.item = itemRes.collection.items[0];
      expect(itemRes.data).to.deep.equal({ id: 1 });
    });

    it('can retrieve the array of supported PUT data parameters or null', () => {
      expect(itemRes.getPUTDataParameters()).to.be.a('null');
      itemRes.collection.template = Collection.makeTemplate({ descriptor1: '', descriptor2: '' });
      expect(itemRes.getPUTDataParameters()).to.deep.equal(['descriptor1', 'descriptor2']);
    });

    it('can fetch an Item Resource from the REST API', done => {
      const result = itemRes.get();
      result
        .then(itemResObj => {
          expect(itemResObj).to.be.an.instanceof(ItemResource);
          expect(itemResObj.item).to.deep.equal(itemRes.collection.items[0]);
        })
        .then(done, done);
    });
  });

  describe('ListResource', () => {
    let listRes;

    beforeEach(() => {
      collection = {
        href: chrisUrl,
        items: [{ data: [{ name: 'id', value: 1 }] }],
        links: [],
      };
      listRes = new ListResource(chrisUrl, auth);
      listRes.collection = collection;
    });

    it('can clone itself', () => {
      const listResClone = listRes.clone();
      expect(listResClone).to.be.an.instanceof(ListResource);
      expect(listResClone.collection).to.deep.equal(listRes.collection);
      expect(listResClone.collection === listRes.collection).to.be.false;
    });

    it('can check if it is empty (has no data)', () => {
      listRes.collection = null;
      expect(listRes.isEmpty).to.be.true;
      listRes.collection = {
        href: chrisUrl,
        items: [],
      };
      expect(listRes.isEmpty).to.be.true;
      listRes.collection.items = collection.items;
      expect(listRes.isEmpty).to.be.false;
    });

    it('can retrieve an array of item resource objects', () => {
      const itemResArray = listRes.getItems();
      expect(itemResArray[0]).to.be.an.instanceof(ItemResource);
      expect(itemResArray[0].data).to.deep.equal({ id: 1 });
    });

    it('can retrieve an array of search parameters or null', () => {
      listRes.collection = null;
      expect(listRes.getSearchParameters()).to.be.a('null');
      listRes.collection = collection;
      expect(listRes.getSearchParameters()).to.deep.equal(['limit', 'offset']);
      listRes.collection.queries = [{ data: [{ name: 'id', value: '' }] }];
      expect(listRes.getSearchParameters()).to.deep.equal(['id', 'limit', 'offset']);
    });

    it('can retrieve the array of supported POST data parameters or null', () => {
      expect(listRes.getPOSTDataParameters()).to.be.a('null');
      listRes.collection.template = Collection.makeTemplate({ descriptor1: '', descriptor2: '' });
      expect(listRes.getPOSTDataParameters()).to.deep.equal(['descriptor1', 'descriptor2']);
    });

    it('can fetch a List Resource from the REST API', done => {
      const result = listRes.get();
      result
        .then(listResObj => {
          expect(listResObj).to.be.an.instanceof(ListResource);
          expect(listResObj.getItems()).to.have.lengthOf.at.least(1);
        })
        .then(done, done);
    });

    it('can fetch a List Resource from the REST API based on search parameters', done => {
      const result = listRes.get(); // fetch the queryUrl as part of the response
      result
        .then(() => {
          const searchParams = { limit: 1, name: 'simplefsapp' };
          const searchResult = listRes.getSearch(searchParams);

          return searchResult
            .then(listResObj => {
              expect(listResObj).to.be.an.instanceof(ListResource);
              expect(listResObj.getItems()).to.have.lengthOf.at.least(1);
              expect(listResObj.searchParams).to.deep.equal(searchParams);
            })
            .then(() => {});
        })
        .then(done, done);
    });

    it('can check whether or not there is a next page in the paginated REST API', () => {
      expect(listRes.hasNextPage).to.be.false;
      // Real REST API will never return link relation "next" pointing to the
      // current collection document. Here this is just for testing porposes
      listRes.collection.links = [{ rel: 'next', href: chrisUrl }];
      expect(listRes.hasNextPage).to.be.true;
    });

    it('can check whether or not there is a previous page in the paginated REST API', () => {
      expect(listRes.hasPreviousPage).to.be.false;
      // Real REST API will never return link relation "previous" pointing to the
      // current collection document. Here this is just for testing porposes
      listRes.collection.links = [{ rel: 'previous', href: chrisUrl }];
      expect(listRes.hasPreviousPage).to.be.true;
    });

    it('can update this List Resource by fetching next page from the REST API', done => {
      // Real REST API will never return link relation "next" pointing to the
      // current collection document. Here this is just for testing porposes
      listRes.collection.links = [{ rel: 'next', href: chrisUrl + '?offset=0&limit=1' }];
      let spy = sinon.spy(listRes, 'get');
      const result = listRes.getNextPage();
      expect(spy.calledOnce).to.be.true;
      result
        .then(listResObj => {
          expect(listResObj === listRes).to.be.true;
          expect(listResObj.collection === collection).to.be.false;
        })
        .then(done, done);
    });

    it('can update this List Resource by fetching next page from the REST API even when there are search params', done => {
      // Real REST API will never return link relation "next" pointing to the
      // current collection document. Here this is just for testing porposes
      listRes.collection.links = [
        { rel: 'next', href: chrisUrl + 'search/?offset=0&limit=1&name=simplefsapp' },
      ];
      listRes.queryUrl = chrisUrl + 'search/';
      let spy = sinon.spy(listRes, 'getSearch');
      const result = listRes.getNextPage();
      expect(spy.calledOnce).to.be.true;
      result
        .then(listResObj => {
          expect(listResObj === listRes).to.be.true;
          expect(listResObj.collection === collection).to.be.false;
        })
        .then(done, done);
    });

    it('can update this List Resource by fetching previous page from the REST API', done => {
      // Real REST API will never return link relation "previous" pointing to the
      // current collection document. Here this is just for testing porposes
      listRes.collection.links = [{ rel: 'previous', href: chrisUrl }];
      let spy = sinon.spy(listRes, 'get');
      const result = listRes.getPreviousPage();
      expect(spy.calledOnce).to.be.true;
      result
        .then(listResObj => {
          expect(listResObj === listRes).to.be.true;
          expect(listResObj.collection === collection).to.be.false;
        })
        .then(done, done);
    });
  });
});
