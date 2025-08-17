import type { NasaItem } from '@/shared/api/nasa/types';

export const generateCsvString = (items: Record<string, NasaItem>) => {
  const header = ['NASA_ID', 'Media_Type', 'Description'];
  const body = Object.values(items).map(({ nasa_id, title, media_type }) => [
    nasa_id,
    media_type,
    title,
  ]);
  return [header, ...body].map((row) => row.join(',')).join('\n');
};
