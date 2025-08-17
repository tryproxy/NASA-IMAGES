export const NASA_ENDPOINTS = {
  SEARCH: '/search',
  ASSET: (nasa_id: string) => `/asset/${nasa_id}`,
  METADATA: (nasa_id: string) => `/asset/${nasa_id}`,
  CAPTIONS: (nasa_id: string) => `/asset/${nasa_id}`,
  ALBUM: (album_name: string) => `/album/${album_name}`,
};
