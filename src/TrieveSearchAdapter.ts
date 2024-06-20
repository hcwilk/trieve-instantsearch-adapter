/* eslint-disable @typescript-eslint/no-explicit-any */


export default class TrieveSearchAdapter {
    apiUrl: string;
    apiKey: string;
    datasetId: string;
    searchClient: { search: (instantsearchRequests: any) => Promise<any>; };

    constructor(apiUrl: string, apiKey: string, datasetId: string){
        console.log("TrieveSearchAdapter constructor");
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.datasetId = datasetId;

        this.searchClient = {
            search: (instantsearchRequests) => this.search(instantsearchRequests),
        }
    }

    async search(instantsearchRequests: any) {

        console.log("searching for", instantsearchRequests);

        const query = instantsearchRequests[0].params.query;

        const body = {
            filters: null,
            get_collisions: false,
            highlight_results: false,
            page: 0,
            query: query,
            search_type: "hybrid"
        }

        console.log("searching for body", body);
        const response = await fetch(`${this.apiUrl}/api/chunk/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "TR-Dataset": this.datasetId,
                Authorization: this.apiKey,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        const trieveResults = data.score_chunks ?? [];

        console.log("trieveResults", trieveResults);

        const adaptedHits = trieveResults.map((hit: any) => {
            return {
                ...hit.metadata[0].metadata,
            };
        });

        console.log("adaptedHits", adaptedHits);

        const adaptedResults = [{
            facets: {},
            facets_status: {},
            hits: adaptedHits,
            hitsPerPage: 8,    
            nbHits: trieveResults.length,
            nbPages: 1,
            page: 0,
            processingTimeMS: 0,
            query: query,
            renderingContent: {}
        }]



        console.log("adaptedResults", adaptedResults);




        if (!response.ok) {
            console.error("Failed to fetch search results", response.status, await response.text());
            return { results: [] };
        }

        console.log("Received search results", adaptedResults);
        return {
            results: adaptedResults ?? []
        };
    }
}
