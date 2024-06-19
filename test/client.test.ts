import {TrieveClient} from '../src/client/TrieveClient';

const config:{
    serverUrl: string;
    apiKey: string;
    organizationId: string;
}
= {
    serverUrl: process.env.TRIEVE_URL!,
    apiKey: process.env.TRIEVE_API_KEY!,
    organizationId: process.env.TRIEVE_ORG_ID!
};

const client = new TrieveClient(config);

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

