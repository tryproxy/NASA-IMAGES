'use client';

import { queryClient } from '@/shared/api/query-client';
import { ThemeProvider } from '@/shared/model/context/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
