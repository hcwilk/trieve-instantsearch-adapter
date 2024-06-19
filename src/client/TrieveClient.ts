/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export class TrieveClient {
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
            'TR-Organization': this.config.organizationId
        };
        console.log('TrieveClient constructor');
    }

    public async getDataset(): Promise<any> {
        try {
            const response = await axios.get(`${this.config.serverUrl}/api/dataset/organization/${this.config.organizationId}`, {
                headers: this.headers
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching dataset:', error);
            throw error;
        }
    }
}
