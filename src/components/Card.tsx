import { useState } from 'react';
import { ModalAsset } from './ModalAsset';
import { type NasaItem } from '../api/nasaClient';
import fallbackImage from '../assets/nasa_fallback.jpg';

export function Card({ item }: { item: NasaItem }) {
  const [isZoomedModelOpen, setIsZoomedModelOpen] = useState<boolean>(false);

  const handleModalClose = () => setIsZoomedModelOpen(false);
  return (
    <div>
      <img
        className="aspect-square w-full cursor-pointer rounded object-cover"
        src={item.thumbnailUrl}
        alt={item.title}
        title={item.description}
        onClick={() => setIsZoomedModelOpen(true)}
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />

      <p className="mt-2 truncate text-sm font-medium">{item.title}</p>
      {isZoomedModelOpen && (
        <ModalAsset
          assetId={item.nasa_id}
          assetSrc={item.thumbnailUrl || ''}
          assetTitle={item.title}
          assetDescription={item.description}
          assetType={item.media_type || ''}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
