import { getUser } from './index';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Plugin author', () => {
  it('should return author information', done => {
    var result = getUser('nicolas');
    result
      .then(result => {
        expect(result).to.deep.equal({ name: 'nicolas' });
      })
      .then(done, done);
  });
});
