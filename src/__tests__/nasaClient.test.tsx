import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nasaClient } from '../api/nasaClient';

describe('nasaClient.search', () => {
  beforeEach(() => vi.resetAllMocks());

  it('calls corretc API endpoint', async () => {
    globalThis.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ collection: { items: [] } }),
      });
    }) as unknown as typeof fetch;

    await nasaClient.search({
      query: 'mars rover',
      options: { page: 2 },
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://images-api.nasa.gov/search?q=mars+rover&page=2&page_size=10&media_type=image'
      )
    );
  });
});
