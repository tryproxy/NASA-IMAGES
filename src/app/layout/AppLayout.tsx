import { Link, Outlet } from 'react-router-dom';
import { ROUTES } from '../../shared/model/routes';
import { ThemeToggler } from '../../components/ThemeToggler';

export function AppLayout() {
  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex flex-row justify-center gap-2 bg-[var(--color-bg)] p-4 text-[var(--color-fg)]">
        <div className="flex text-center">
          <Link
            to={ROUTES.HOME.href()}
            className="text-xl font-bold hover:underline"
          >
            Home
          </Link>
        </div>
        <ThemeToggler />
        <div className="flex">
          <Link to={ROUTES.ABOUT.href()} className="text-xl hover:underline">
            About
          </Link>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
