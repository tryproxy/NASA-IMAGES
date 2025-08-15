import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { ThemeToggler } from '@/shared/ui-kit/ThemeToggler';
import { useThemeContext } from '@/shared/model/context/useThemeContext';

export function AppLayout() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <AppHeader>
          <ThemeToggler content={theme} onClick={toggleTheme} />
        </AppHeader>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
