export function ModalAssetImage({
  imageSrc,
  _imageAlt,
  imageTitle,
}: {
  imageSrc: string;
  _imageAlt: string;
  imageTitle: string;
}) {
  return (
    <div className="flex max-w-[80vw] cursor-default flex-col items-center justify-center">
      <div className="relative flex h-[80vh] w-[80vw] max-w-full items-center justify-center">
        <img
          className="animate-fade-in pointer-events-none absolute z-0 h-[80vh] w-full scale-[1.1] opacity-0 blur-[100px]"
          src={imageSrc}
          alt=""
          aria-hidden
        />
        <img
          className="z-10 h-[80vh] w-full object-contain"
          src={imageSrc}
          alt={imageTitle}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <p
        className="z-10 flex items-center p-4 text-sm text-amber-50"
        onClick={(e) => e.stopPropagation()}
      >
        {imageTitle}
      </p>
    </div>
  );
}
