import { nasaClient } from '@/shared/api/nasa';
import type { NasaSearchResult } from '@/shared/api/nasa/types';

export const QUERIES = {
  SEARCH: {
    query: ({
      query,
      params,
    }: {
      query: string;
      params: { page?: number };
    }) => ({
      queryKey: ['search', query, params.page],
      queryFn: async ({
        signal,
      }: {
        signal?: AbortSignal;
      }): Promise<NasaSearchResult> =>
        nasaClient.search({ query, params }, { signal }),
    }),
  },
} as const;
