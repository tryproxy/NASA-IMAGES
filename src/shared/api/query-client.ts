import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
      refetchOnWindowFocus: true,
      // refetchOnMount: false,
      gcTime: 5000,
    },
  },
});
