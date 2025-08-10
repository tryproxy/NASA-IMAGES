export function CardSkeleton() {
  return (
    <div>
      <div className="skeleton aspect-square w-full rounded" />
      <div className="mt-2 h-4">
        <p className="skeleton h-4 w-3/4 rounded font-medium"></p>
      </div>
    </div>
  );
}
