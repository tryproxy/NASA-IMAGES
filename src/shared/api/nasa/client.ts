import type {
  NasaApiAssetResponse,
  NasaApiSearchResponse,
  NasaItem,
  NasaAssetResult,
  NasaSearchResult,
  NasaApiClient,
  NasaApiClentSearchParams,
} from './types';
import type { HttpClient } from '../http';
import { NASA_ENDPOINTS } from './endpoints';

class NasaClient implements NasaApiClient {
  private api: HttpClient;
  constructor(api: HttpClient) {
    this.api = api;
  }

  async search({
    query,
    options = {},
  }: NasaApiClentSearchParams): Promise<NasaSearchResult> {
    const { mediaType = 'image', pageSize = 10, ...params } = options;
    const searchParams = {
      q: query.trim(),
      page_size: pageSize,
      media_type: mediaType,
      ...params,
    };

    const data = await this.api.get<NasaApiSearchResponse>(
      NASA_ENDPOINTS.SEARCH,
      searchParams
    );

    const items = data.collection.items
      .map((item) => {
        const metadata = item.data?.[0];
        const preview = item.links.find((link) => link.rel === 'preview')?.href;
        if (!metadata || !preview) return null;

        return {
          nasa_id: metadata.nasa_id,
          title: metadata.title,
          description: metadata.description,
          thumbnailUrl: preview,
          media_type: metadata.media_type,
        };
      })
      .filter((item): item is NasaItem => item != null);

    const totalHits = data.collection.metadata?.total_hits ?? 0;
    return { totalHits, items };
  }

  async getAsset(id: string): Promise<NasaAssetResult> {
    const data = await this.api.get<NasaApiAssetResponse>(
      NASA_ENDPOINTS.ASSET(id)
    );

    const urls = data.collection.items.map((item) => item.href);

    return {
      large: urls.find((url: string) => url.includes('~large')),
      original: urls.find((url: string) => url.includes('~orig')),
      medium: urls.find((url: string) => url.includes('~medium')),
      small: urls.find((url: string) => url.includes('~small')),
      thumbnail: urls.find((url: string) => url.includes('~thumb')),
      metadata: urls.find((url: string) => url.includes('.json')),
    };
  }
}

export default NasaClient;
