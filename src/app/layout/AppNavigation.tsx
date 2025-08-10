import { ROUTES } from '@/shared/model/routes';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function AppNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <button
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth={isOpen ? '3' : '2'}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {isOpen && (
        <nav className="flex gap-4">
          <Link
            to={ROUTES.HOME.href()}
            className="text-xl font-bold hover:underline"
          >
            Home
          </Link>
          <Link to={ROUTES.ABOUT.href()} className="text-xl hover:underline">
            About
          </Link>
        </nav>
      )}
    </div>
  );
}
