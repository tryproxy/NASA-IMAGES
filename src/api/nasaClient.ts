export type NasaItem = {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  media_type?: string;
};

export type NasaRawData = {
  data: NasaItem[];
  links: { href: string; rel: string }[];
};

export type NasaSearchResponse = {
  collection: {
    items: NasaRawData[];
  };
};

export type NasaAssetResponse = {
  collection: {
    items: NasaAsset[];
    href: string;
    verstion: string;
  };
};

export type NasaAsset = {
  original?: string;
  large?: string;
  medium?: string;
  small?: string;
  thumb?: string;
  metadata?: string;
};

export type Link = {
  href: string;
};

type SearchClientArgs = {
  query: string;
  options: { page: number };
};

export interface SearchClient {
  search: (args: SearchClientArgs) => Promise<NasaItem[]>;
}

class NasaClient implements SearchClient {
  private readonly BASE_URL = 'https://images-api.nasa.gov';
  private readonly ENDPOINT = {
    SEARCH: '/search',
    ASSET_ID: '/asset/',
  } as const;

  async search({
    query,
    options: { page = 1 },
  }: {
    query: string;
    options: { page: number };
  }): Promise<NasaItem[]> {
    try {
      const url = new URL(this.ENDPOINT.SEARCH, this.BASE_URL);
      url.searchParams.set('q', query.trim());
      url.searchParams.set('page', page.toString());
      url.searchParams.set('page_size', '10');
      url.searchParams.set('media_type', 'image');

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as NasaSearchResponse;

      const results = data.collection.items.map((item) => ({
        nasa_id: item.data[0].nasa_id,
        title: item.data[0].title,
        description: item.data[0].description,
        thumbnailUrl: item.links.filter((link) => link.rel === 'preview')[0]
          .href,
        media_type: item.data[0].media_type,
      }));
      return results;
    } catch (error) {
      console.error('Error fetching NASA data', error);
      throw error;
    }
  }

  async getAsset(id: string): Promise<NasaAsset> {
    const url = new URL(`${this.ENDPOINT.ASSET_ID}${id}`, this.BASE_URL);
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    const urls = data.collection.items.map(
      (item: { href: string }) => item.href
    );
    return {
      large: urls.find((url: string) => url.includes('large')),
      medium: urls.find((url: string) => url.includes('medium')),
      small: urls.find((url: string) => url.includes('small')),
      original: urls.find((url: string) => url.includes('orig')),
    };
  }
}

export const nasaClient = new NasaClient();
