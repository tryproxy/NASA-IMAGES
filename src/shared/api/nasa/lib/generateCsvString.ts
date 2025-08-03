import type { NasaItem } from '../types';

export const generateCsvString = (items: Record<string, NasaItem>) => {
  const header = ['NASA ID', 'Media Type', 'Title', 'Description'];
  const body = Object.values(items).map(
    ({ nasa_id, title, description, media_type }) => [
      nasa_id,
      media_type,
      title,
      description,
    ]
  );
  return [header, ...body].map((row) => row.join(',')).join('\n');
};
