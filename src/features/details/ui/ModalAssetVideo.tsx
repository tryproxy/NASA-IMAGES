export function ModalAssetVideo({
  videoSrc,
  videoTitle,
}: {
  videoSrc: string;
  videoTitle: string;
}) {
  return (
    <div
      className="flex max-w-[80vw] cursor-default flex-col items-center justify-center gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      <video
        className="max-h-[80vh] max-w-full rounded-sm object-contain object-right"
        src={videoSrc}
        controls
        autoPlay
        muted
        onClick={(e) => e.stopPropagation()}
      ></video>
      <p className="mt-2 flex items-center text-sm text-amber-50">
        {videoTitle}
      </p>
    </div>
  );
}
