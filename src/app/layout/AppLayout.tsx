import { Outlet } from 'react-router-dom';
import { AppHeader } from '../../components/AppHeader';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function AppLayout() {
  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <AppHeader />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}
