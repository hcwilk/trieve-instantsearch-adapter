
export class TrieveClient {
    constructor(
        private readonly serverUrl: string,
        private readonly apiKey: string
    ) {
        console.log('TrieveClient constructor');
    }

    public async getDataset(organizationId:string): Promise<string> {
        console.log('getDataset of TrieveClient', organizationId);
        return 'dataset';
    }

}