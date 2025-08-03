// API Search
export interface NasaApiSearchResponse {
  collection: {
    version: string;
    href: string;
    items: NasaApiSearchItem[];
    metadata?: {
      total_hits: number;
    };
    links?: NasaApiCollectionLink[];
  };
}

export interface NasaApiCollectionLink {
  rel: 'next' | 'prev';
  prompt: 'Next' | 'Previous';
  href: string;
}

export interface NasaApiSearchItem {
  href: string;
  data: NasaApiItemMetadata[];
  links: NasaApiItemLink[];
}

export interface NasaApiItemMetadata {
  center: string;
  date_created: string;
  description: string;
  description_508?: string;
  keywords?: string[];
  media_type: 'image' | 'video';
  nasa_id: string;
  secondary_creator?: string;
  title: string;
  photographer?: string;
  location?: string;
}

export interface NasaApiItemLink {
  href: string;
  rel: 'preview' | 'canonical' | 'alternate' | 'captions';
  render?: 'image';
  width?: number;
  size?: number;
  height?: number;
}

/** Parsed Searched Item */
export type NasaItem = {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  media_type: 'image' | 'video';
};

export type NasaSearchResult = {
  items: NasaItem[];
  totalHits: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

// API Asset manifest
export interface NasaApiAssetResponse {
  collection: {
    version: string;
    href: string;
    items: NasaApiAsset[];
  };
}

export interface NasaApiAsset {
  href: string;
}

/** Parsed Asset manifest */
export type NasaAssetResult = {
  original?: string;
  large?: string;
  medium?: string;
  small?: string;
  thumbnail?: string;
  metadata?: string;
};

// Client wrapper
export type NasaApiClentSearchParams = {
  query: string;
  options?: { page?: number; mediaType?: string; pageSize?: number };
};

export interface NasaApiClient {
  search: (args: NasaApiClentSearchParams) => Promise<NasaSearchResult>;
  getAsset: (id: string) => Promise<NasaAssetResult>;
}
