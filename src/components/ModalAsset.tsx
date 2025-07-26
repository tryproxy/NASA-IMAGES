import { useCallback, useEffect, useState } from 'react';
import { nasaClient } from '../api/nasaClient';
import fallbackImg from '../assets/nasa_fallback.jpg';
import { ModalAssetImage } from './ModalAssetImage';
import { ModalAssetVideo } from './ModalAssetVideo';

export function ModalAsset({
  assetId,
  assetSrc,
  assetTitle,
  onClose,
  _assetDescription,
  assetType,
}: {
  assetId: string;
  assetSrc: string;
  assetTitle: string;
  assetType: string;
  _assetDescription: string;
  onClose: () => void;
}) {
  const [assetUrl, setAssetUrl] = useState<string>(assetSrc);

  const fetchOriginalAsset = useCallback(async (): Promise<string> => {
    const asset = await nasaClient.getAsset(assetId);
    return (
      asset.original || asset.medium || asset.small || assetSrc || fallbackImg
    );
  }, [assetId, assetSrc]);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setAssetUrl(await fetchOriginalAsset());
      } catch (e) {
        if (e instanceof Error) {
          console.error('Failed to fetch asset:', e.message);
          throw e;
        }
      }
    };

    fetchAsset();
  }, [fetchOriginalAsset]);

  return (
    <div
      data-testid="modal-asset"
      className="fixed inset-0 flex cursor-pointer items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="popup-fade-in flex max-h-[90vh] max-w-[90vw] cursor-pointer items-center">
        {assetType === 'image' ? (
          <ModalAssetImage
            imageSrc={assetUrl}
            imageAlt={assetTitle}
            imageTitle={assetTitle}
          />
        ) : (
          <ModalAssetVideo videoSrc={assetUrl} videoTitle={assetTitle} />
        )}
      </div>
      <button
        className="absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
