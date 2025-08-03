import { useCallback, useEffect, useState } from 'react';
import fallbackImg from '../assets/nasa_fallback.jpg';
import { nasaClient } from '../shared/api/nasa';
import { ModalAssetImage } from './ModalAssetImage';
import { ModalAssetVideo } from './ModalAssetVideo';

export function ModalAsset({
  assetId,
  assetSrc,
  assetTitle,
  assetType,
  mode = 'panel',
  onClose,
}: {
  assetId: string;
  assetSrc: string;
  assetTitle: string;
  assetType: 'image' | 'video';
  assetDescription: string;
  mode?: 'modal' | 'panel';
  onClose: () => void;
}) {
  const [assetUrl, setAssetUrl] = useState<string>(assetSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchOriginalAsset = useCallback(async (): Promise<string> => {
    const asset = await nasaClient.getAsset(assetId);
    return (
      asset.large ||
      asset.medium ||
      asset.small ||
      assetSrc ||
      asset.original ||
      fallbackImg
    );
  }, [assetId, assetSrc]);

  useEffect(() => {
    const fetchAsset = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        setAssetUrl(await fetchOriginalAsset());
      } catch (e) {
        if (e instanceof Error) {
          console.error('Failed to fetch asset:', e.message);
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAsset();
  }, [fetchOriginalAsset]);

  const assetContainerClass =
    mode === 'modal'
      ? 'fixed inset-0 flex cursor-pointer items-center justify-center bg-black/90 backdrop-blur-md'
      : 'w-full h-full flex flex-col border-[var(--color-border)]';

  return (
    <div
      data-testid="modal-asset"
      className={assetContainerClass}
      onClick={onClose}
    >
      {isLoading && (
        <div className="flex justify-center">
          <span className="loader text-cente flex h-[60vh] w-full items-center justify-center"></span>
        </div>
      )}
      {!isLoading && isError && (
        <div className="flex h-[60vh] w-full items-center justify-center text-center text-[var(--color-danger)]">
          Could not load this NASA asset. Check if the ID is correct.
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <div className="popup-fade-in flex max-h-[90vh] max-w-[90vw] cursor-pointer items-center">
            {assetType === 'image' ? (
              <ModalAssetImage imageSrc={assetUrl} imageTitle={assetTitle} />
            ) : (
              <ModalAssetVideo videoSrc={assetUrl} videoTitle={assetTitle} />
            )}
          </div>
          <button className="cursor-pointer" onClick={onClose}>
            ✖ Close
          </button>
        </>
      )}
    </div>
  );
}
