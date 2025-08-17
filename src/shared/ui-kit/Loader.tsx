'use client';

import { cn } from '../lib/cn';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-[var(--color-loader2)] border-r-[var(--color-loader)]"></div>
    </div>
  );
}
