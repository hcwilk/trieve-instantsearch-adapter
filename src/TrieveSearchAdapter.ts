
import { TrieveClient } from "./client/TrieveClient";


export class TrieveSearchAdapter {
    private client: TrieveClient;
    constructor() {
        console.log('TrieveSearchAdapter constructor');

        const config:{
            serverUrl: string;
            apiKey: string;
            organizationId: string;
        } = 
        {
            serverUrl: process.env.TRIEVE_URL!,
            apiKey: process.env.TRIEVE_API_KEY!,
            organizationId: process.env.TRIEVE_ORG_ID!
        };

        this.client = new TrieveClient(config);
    }


    public async search(){
        return await this.client.getDatasets();
    }

}


