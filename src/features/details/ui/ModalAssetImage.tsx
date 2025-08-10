export function ModalAssetImage({
  imageSrc,
  imageTitle,
}: {
  imageSrc: string;
  imageTitle: string;
}) {
  return (
    <div className="flex max-w-[80vw] cursor-default flex-col items-center justify-center">
      <div className="relative flex max-h-[80vh] max-w-full items-center justify-center rounded-md">
        <img
          className="pointer-events-none absolute inset-0 -z-10 scale-110 object-cover opacity-50 blur-3xl"
          src={imageSrc}
          alt=""
          aria-hidden
        />
        <img
          className="z-10 max-h-[80vh] max-w-full object-contain"
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
