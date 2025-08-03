export function PinChip({
  isSaved,
  content,
  className,
  onClick,
}: {
  isSaved: boolean;
  content: string;
  className?: string;
  onClick?: () => void;
}) {
  const base = `absolute top-0 right-0 m-1 cursor-pointer items-center justify-center rounded-full bg-[var(--color-overlay)] px-2 py-1 font-medium text-white hover:bg-[var(--color-bg)]`;
  const visibility = isSaved ? 'flex ' : 'hidden group-hover:flex';
  return (
    <span
      className={`${base} ${visibility} ${className || ''}`}
      onClick={onClick}
    >
      {content}
    </span>
  );
}
