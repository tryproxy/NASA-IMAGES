// GET https://images-api.nasa.gov/search?q={q}&page={page}
export type NasaItem = {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  mediaType?: string;
};

export type NasaRawData = {
  data: NasaItem[];
  links: { href: string }[];
};

export type NasaResponse = {
  collection: {
    items: NasaRawData[];
  };
};

class NasaClient {
  private readonly BASE_URL = 'https://images-api.nasa.gov';
  private readonly ENDPOINT = {
    SEARCH: '/search',
  } as const;

  async search(query: string, page = 1): Promise<NasaItem[]> {
    const url = new URL(this.ENDPOINT.SEARCH, this.BASE_URL);
    url.searchParams.set('q', query.trim());
    url.searchParams.set('page', page.toString());

    const response = await fetch(url.toString());
    const data = (await response.json()) as NasaResponse;

    return data.collection.items
      .map((item) => ({
        nasa_id: item.data[0].nasa_id,
        title: item.data[0].title,
        description: item.data[0].description,
        thumbnailUrl: item.links[0].href,
      }))
      .slice(0, 10);
  }
}

export const nasaClient = new NasaClient();
