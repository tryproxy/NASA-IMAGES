'use client';

import Link from 'next/link';
import { useState } from 'react';

export function AppNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <button
        data-testid="burger"
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
          <Link href="/" className="text-xl font-bold hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-xl hover:underline">
            About
          </Link>
        </nav>
      )}
    </div>
  );
}
