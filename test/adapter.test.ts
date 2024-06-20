import TrieveSearchAdapter from '../src/TrieveSearchAdapter';

const adapter = new TrieveSearchAdapter(process.env.TRIEVE_API_KEY!, "fbacc151-5342-4fe8-a762-d8b398d696c4")


test('search', async () => {

    const exampleBody = [
        {
 "indexName": "books",
      "params": {
        "facets": [],
        "highlightPostTag": "</ais-highlight>",
        "highlightPreTag": "<ais-highlight>",
        "hitsPerPage": 8,
        "page": 0,
        "query": "murder",
        "tagFilters": ""
        }
    }
    ]
    const result = await adapter.search(exampleBody);
    console.log(result);
    expect(result).toBeDefined();
});
