import { cn } from '@/shared/lib/cn';

export const Button = ({
  content,
  className = '',
  isDisabled = false,
  children,
  onClick,
}: {
  content?: string;
  className?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={isDisabled}
      className={cn(
        `cursor-pointer rounded bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-surface)] hover:bg-[var(--color-primary-hover)]`,
        className
      )}
      onClick={onClick}
    >
      {content}
      {children}
    </button>
  );
};
