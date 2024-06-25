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

        let query = instantsearchRequests[0].params.query;
        const page = instantsearchRequests[0].params.page;

        // adding this here for the time being
        if (query === "") {
            query = "time";
        }

        // const hitsPerPage = instantsearchRequests[0].params.hitsPerPage;
        const body = {
            filters: null,
            get_collisions: false,
            highlight_results: false,
            page: page + 1,
            query: query,
            page_size: 8,
            search_type: "hybrid"
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

        console.log("Received search results", data);

        const trieveResults = data.score_chunks ?? [];

        const adaptedHits = trieveResults.map((hit: any) => {
            return {
                ...hit.metadata[0].metadata,
            };
        });

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
            nbPages: 7,
            page: page + 1,
            processingTimeMS: 0,
            query: query,
            renderingContent: {}
        }]


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
