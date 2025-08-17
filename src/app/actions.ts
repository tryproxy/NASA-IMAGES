'use server';

import { generateCsvString } from '@/features/pinned/lib/generateCsvString';
import { NasaItem } from '@/shared/api/nasa/types';

export async function exportCsvAction(
  items: Record<string, NasaItem>
): Promise<string> {
  return generateCsvString(items);
}
