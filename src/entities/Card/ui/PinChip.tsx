'use client';
export function PinChip({
  isSelected,
  content,
  className,
  onClick,
}: {
  isSelected: boolean;
  content: string;
  className?: string;
  onClick?: () => void;
}) {
  const base = `absolute top-0 right-0 m-1 cursor-pointer items-center justify-center rounded-full bg-[var(--color-overlay)] px-2 py-1 font-medium text-[var(--color-primary)] hover:bg-[var(--color-bg)]`;
  const visibility = isSelected
    ? 'flex bg-[var(--color-overlay)]'
    : 'hidden group-hover:flex';
  return (
    <span
      className={`${base} ${visibility} ${className || ''}`}
      onClick={onClick}
    >
      {content}
    </span>
  );
}
