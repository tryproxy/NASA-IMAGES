export function Loader() {
  return (
    <div className="absolute top-15 flex gap-2">
      <p className="flex">Fetching [images.nasa.gov]</p>
      <span className="loader left-0 inline-flex h-3 w-3"></span>
    </div>
  );
}
