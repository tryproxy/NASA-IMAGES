import { Button } from '@/shared/ui-kit/Button';
import { cn } from '../lib/cn';
// import SunIcon from '../assets/theme_sun.svg?react';
// import SaturnIcon from '../assets/theme_saturn.svg?react';

export function ThemeToggler({
  className,
  content,
  onClick,
}: {
  className?: string;
  content?: 'light' | 'dark';
  onClick?: () => void;
}) {
  return (
    <div className="">
      <Button
        className={cn(
          'link rounded border-transparent bg-[var(--color-bg)] p-2 px-3 py-1 text-[var(--color-fg)] hover:bg-transparent hover:text-[var(--color-primary)]',
          className
        )}
        onClick={onClick}
      >
        {content === 'light' ? (
          // <SunIcon className="h-6 w-6" />
          <p>SUN</p>
        ) : (
          // <SaturnIcon className="h-6 w-6" />
          <p>SATURN</p>
        )}
      </Button>
    </div>
  );
}
