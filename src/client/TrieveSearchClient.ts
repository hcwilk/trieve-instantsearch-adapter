/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export class TrieveSearchClient {
    private headers: any;

    constructor(
        private readonly config: {
            serverUrl: string;
            apiKey: string;
            organizationId: string;
        }
    ) {
        this.headers = {
            'Authorization': this.config.apiKey,
        };
        console.log('TrieveClient constructor');
    }

    public async getDatasets(): Promise<any> {
        try {
            const response = await axios.get(`${this.config.serverUrl}/api/dataset/organization/${this.config.organizationId}`, {
                headers: 
                {...this.headers,
                'TR-Organization': this.config.organizationId}
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching dataset:', error);
            throw error;
        }
    }

    public async getMe(): Promise<any> {
        try {
            const response = await axios.get(`${this.config.serverUrl}/api/auth/me`, {
                headers: this.headers
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching me:', error);
            throw error;
        }
    }

    public async searchChunks(
        datasetId: string,
        curPage: number,
        searchQuery: string,
        searchType: string,
        curBatchTag: string,
        abortSignal: AbortSignal
    ): Promise<any> {
        const url = `${this.config.serverUrl}/chunk/search`;
        const headers = {
            ...this.headers,
            "Content-Type": "application/json",
            "TR-Dataset": datasetId
        };
        const body = {
            page: curPage,
            query: searchQuery,
            search_type: searchType,
            filters: curBatchTag === "all batches" ? null : {
                must: [
                    {
                        field: "tag_set",
                        match: curBatchTag === "all batches" ? [] : [curBatchTag.toUpperCase()]
                    }
                ]
            },
            highlight_results: false,
            get_collisions: false
        };
        try {
            const response = await axios.post(url, body, {
                headers: headers,
                signal: abortSignal
            });
            return response.data;
        } catch (error) {
            console.error('Error performing search:', error);
            throw error;
        }
    }
}
