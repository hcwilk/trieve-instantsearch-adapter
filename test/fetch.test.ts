import { fetch } from "./fetch";

describe('fetchData function', () => {
  test('fetches data successfully from an API', async () => {
    const result = await fetch();
    expect(result).toHaveProperty('id', 1);
  });
});
