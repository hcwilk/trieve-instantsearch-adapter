/* eslint-disable @typescript-eslint/no-explicit-any */

export default class TrieveSearchAdapter {
    apiUrl: string;
    apiKey: string;
    datasetId: string;
    searchClient: { search: (instantsearchRequests: any) => Promise<any>; };

    constructor(apiKey: string, datasetId: string){
        this.apiUrl = 'https://api.trieve.ai';
        this.apiKey = apiKey;
        this.datasetId = datasetId;

        this.searchClient = {
            search: (instantsearchRequests) => this.search(instantsearchRequests),
        }

    }

    async search(instantsearchRequests: any) {

        console.log("instantsearchRequests", instantsearchRequests);

        const query = instantsearchRequests[0].params.query;

        const hitsPerPage = instantsearchRequests[0].params.hitsPerPage;
        const body = {
            filters: null,
            get_collisions: false,
            highlight_results: false,
            page: 0,
            query: query,
            page_size: hitsPerPage,
            search_type: "hybrid"
        }

        if (query === "") {
            return { results: [] };
        }

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

        if(adaptedHits.length === 0){
            console.log("No results found");
            return { results: [] };
        }

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
