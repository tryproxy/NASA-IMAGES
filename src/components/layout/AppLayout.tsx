import { Link, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex gap-4 bg-gray-900 p-4 text-amber-50">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
