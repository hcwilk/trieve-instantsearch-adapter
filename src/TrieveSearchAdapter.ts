
import { TrieveClient } from "./client/TrieveClient";


export class TrieveSearchAdapter {
    private client: TrieveClient;
    constructor() {
        console.log('TrieveSearchAdapter constructor');

        this.client = new TrieveClient('serverUrl', 'apiKey');
    }


    public async search(organizationId:string){
        return await this.client.getDataset(organizationId);
    }

}


