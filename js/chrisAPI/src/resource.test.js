import { expect } from 'chai';
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
    const itemUrl = chrisUrl + '1/';
    let itemRes;

    beforeEach(() => {
      collection = {
        href: itemUrl,
        items: [{ data: [{ name: 'id', value: 1 }] }],
        links: [],
      };
      itemRes = new ItemResource(itemUrl, auth);
      itemRes.collection = collection;
    });

    it('can clone itself', () => {
      const itemResClone = itemRes.clone();
      expect(itemResClone).to.be.an.instanceof(ItemResource);
      expect(itemResClone.collection).to.deep.equal(itemRes.collection);
      expect(itemResClone.collection === itemRes.collection).to.be.false;
    });

    it('can check whether or not it is empty (has no data)', () => {
      expect(itemRes.isEmpty).to.be.false;
    });

    it('can retrieve its data', () => {
      expect(itemRes.data).to.deep.equal({ id: 1 });
    });

    it('can retrieve the array of supported PUT data parameters or null', () => {
      expect(itemRes.getPUTParameters()).to.be.a('null');
      itemRes.collection.template = Collection.makeTemplate({ descriptor1: '', descriptor2: '' });
      expect(itemRes.getPUTParameters()).to.deep.equal(['descriptor1', 'descriptor2']);
    });

    it('can fetch an Item Resource from the REST API', done => {
      const result = itemRes.get();
      result
        .then(itemResObj => {
          expect(itemResObj).to.be.an.instanceof(ItemResource);
          expect(itemResObj.data).to.have.property('id');
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
        total: 100,
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

    it('can retrieve an array of search parameters or null', () => {
      listRes.collection = null;
      expect(listRes.getSearchParameters()).to.be.a('null');
      listRes.collection = collection;
      expect(listRes.getSearchParameters()).to.deep.equal(['limit', 'offset']);
      listRes.collection.queries = [{ data: [{ name: 'id', value: '' }] }];
      expect(listRes.getSearchParameters()).to.deep.equal(['id', 'limit', 'offset']);
    });

    it('can retrieve the array of supported POST data parameters or null', () => {
      expect(listRes.getPOSTParameters()).to.be.a('null');
      listRes.collection.template = Collection.makeTemplate({ descriptor1: '', descriptor2: '' });
      expect(listRes.getPOSTParameters()).to.deep.equal(['descriptor1', 'descriptor2']);
    });

    it('can fetch a List Resource from the REST API', done => {
      const result = listRes.get();
      result
        .then(listResObj => {
          expect(listResObj).to.be.an.instanceof(ListResource);
          expect(listResObj.data).to.have.lengthOf.at.least(1);
        })
        .then(done, done);
    });

    it('can fetch a List Resource from the REST API based on search parameters', done => {
      const result = listRes.get(); // fetch the queryUrl as part of the response
      result
        .then(() => {
          const searchParams = { limit: 1, name: 'pl-dircopy' };
          const searchResult = listRes.get(searchParams);

          return searchResult
            .then(listResObj => {
              expect(listResObj).to.be.an.instanceof(ListResource);
              expect(listResObj.data).to.have.lengthOf.at.least(1);
              expect(listResObj.searchParams).to.deep.equal(searchParams);
            })
            .then(() => {});
        })
        .then(done, done);
    });

    it('can provide the total number of items across pages in the paginated REST API', () => {
      expect(listRes.totalCount).to.be.equal(100);
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
  });
});
