'use client';

import Image from 'next/image';
import { cn } from '../lib/cn';
import { Button } from './Button';

import { useThemeContext } from '../model/context/useThemeContext';

export function ThemeToggler({
  className,
}: {
  className?: string;
  content?: 'light' | 'dark';
}) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="">
      <Button
        className={cn(
          'link rounded border-transparent bg-[var(--color-bg)] p-2 px-3 py-1 text-[var(--color-fg)] hover:bg-transparent hover:text-[var(--color-primary)]',
          className
        )}
        onClick={toggleTheme}
      >
        {theme === 'light' ? (
          <Image
            src="/icons/theme_sun.svg"
            alt="Ligth theme"
            className="h-6 w-6"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/icons/theme_saturn.svg"
            alt="Dark theme"
            className="h-6 w-6"
            width={24}
            height={24}
          />
        )}
      </Button>
    </div>
  );
}
