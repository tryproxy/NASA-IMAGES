export const Button = ({
  content,
  className,
  onClick,
}: {
  content: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`cursor-pointer rounded bg-amber-50 px-4 py-2 text-black hover:bg-white ${className ?? ''}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
