import { getAuthor, updateAuthor } from './index';
import { expect } from 'chai';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Plugin author', () => {
  it('should return author information', async () => {
    var result = await getAuthor('nicolas');
    expect(result).to.deep.equal({ name: 'nicolas' });
  });

  it('should update author information', async () => {
    var result = await updateAuthor('nicolas', { name: 'jorge' });
    expect(result).to.deep.equal({ name: 'nicolas' });
  });
});
