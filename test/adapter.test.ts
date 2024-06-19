import {TrieveSearchAdapter} from '../src/TrieveSearchAdapter';

const adapter = new TrieveSearchAdapter();


test('search', async () => {
    const result = await adapter.search();
    console.log(result);
    expect(result).toBeDefined();
});
