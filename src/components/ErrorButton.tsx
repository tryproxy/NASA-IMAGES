export function ErrorButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className="fixed right-4 bottom-4 h-10 w-50 cursor-pointer rounded-sm bg-gray-200/40 px-1 py-1 text-center font-bold text-gray-900 hover:bg-gray-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
