export const Button = ({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="cursor-pointer rounded bg-amber-50 px-4 py-2 text-black hover:bg-white"
      onClick={onClick}
    >
      {content}
    </button>
  );
};
