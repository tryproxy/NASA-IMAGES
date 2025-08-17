export function Loader({
  className = 'absolute top-30 flex gap-2"',
}: {
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <p className="flex">Fetching [images.nasa.gov]</p>
      <span className="loader left-0 inline-flex h-3 w-3"></span>
    </div>
  );
}
