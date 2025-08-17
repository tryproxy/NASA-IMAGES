import { nasaClient } from '@/shared/api/nasa';
import type { NasaAssetResult } from '@/shared/api/nasa/types';

export const QUERIES = {
  getAsset: {
    query: ({ id }: { id: string }) => ({
      queryKey: ['asset', id],
      queryFn: async ({
        signal,
      }: {
        signal?: AbortSignal;
      }): Promise<NasaAssetResult> => nasaClient.getAsset(id, { signal }),
    }),
  },
} as const;
