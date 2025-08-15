import { AppNavigation } from './AppNavigation';
import { ThemeToggler } from '../../shared/ui-kit/ThemeToggler';

export function AppHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="flex flex-row items-center justify-between gap-2 bg-[var(--color-bg)] p-4 text-[var(--color-fg)]">
      <AppNavigation />
      <ThemeToggler />
      {children}
    </header>
  );
}
