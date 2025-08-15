import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppHeader } from './AppHeader';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <AppHeader />
        <main className="flex-1">{children}</main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
