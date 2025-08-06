import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/model/routes';
import { ThemeToggler } from './ThemeToggler';

export function AppHeader() {
  return (
    <header className="flex flex-row justify-between gap-2 bg-[var(--color-bg)] p-4 text-[var(--color-fg)]">
      <div className="flex gap-4 text-center">
        <div className="flex text-center">
          <Link
            to={ROUTES.HOME.href()}
            className="text-xl font-bold hover:underline"
          >
            Home
          </Link>
        </div>
        <div className="flex">
          <Link to={ROUTES.ABOUT.href()} className="text-xl hover:underline">
            About
          </Link>
        </div>
      </div>
      <ThemeToggler />
    </header>
  );
}
