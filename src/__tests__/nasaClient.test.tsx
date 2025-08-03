import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nasaClient } from '../shared/api/nasa';
// import { nasaClient } from '../api/nasaClient';

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
        'https://images-api.nasa.gov/search?q=mars+rover&page_size=10&media_type=image&page=2'
      ),
      { method: 'GET' }
    );
  });
});

describe('nasaClient.getAsset', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('parses asset URLs by type', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            collection: {
              items: [
                { href: 'https://test.com/image~orig.jpg' },
                { href: 'https://test.com/image~large.jpg' },
                { href: 'https://test.com/image~medium.jpg' },
                { href: 'https://test.com/image~small.jpg' },
                { href: 'https://test.com/image~thumb.jpg' },
              ],
            },
          }),
      })
    ) as unknown as typeof fetch;

    const result = await nasaClient.getAsset('dummy_id');

    expect(result.original).toContain('~orig.jpg');
    expect(result.large).toContain('~large.jpg');
    expect(result.medium).toContain('~medium.jpg');
    expect(result.small).toContain('~small.jpg');
  });

  it('throws if fetch fails', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    ) as unknown as typeof fetch;

    await expect(nasaClient.getAsset('throwerDummy_id')).rejects.toThrow(
      'The requested resource does not exist.'
    );
  });
});
