import {TrieveSearchClient} from '../src/client/TrieveSearchClient';


const config:{
    serverUrl: string;
    apiKey: string;
    organizationId: string;
}
= {
    serverUrl: process.env.TRIEVE_URL!,
    apiKey: process.env.TRIEVE_ADMIN_KEY!,
    organizationId: process.env.TRIEVE_ORG_ID!
};

const client = new TrieveSearchClient(config);

test('getDatasets', async () => {
    const result = await client.getDatasets();
    console.log(result);
    expect(result).toBeDefined();
});
test('getMe', async () => {
    const result = await client.getMe();
    console.log(result);
    expect(result).toBeDefined();
});

