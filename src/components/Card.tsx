import { useState } from 'react';
import { useParams } from 'react-router-dom';
import fallbackImage from '../assets/nasa_fallback.jpg';
import type { NasaItem } from '../shared/api/nasa/types';
import { useNavigateTo } from '../shared/hooks/useNavigateTo';
import { usePinnedItemsStore } from '../shared/model/usePinnedItemsStore';
import { ModalAsset } from './ModalAsset';
import { PinChip } from './PinChip';

export function Card({ item }: { item: NasaItem }) {
  const [isZoomedModelOpen, setIsZoomedModelOpen] = useState<boolean>(false);
  const { goToPage } = useNavigateTo();
  const { page = '1' } = useParams();
  const isSaved = usePinnedItemsStore((state) => state.has(item.nasa_id));
  const add = usePinnedItemsStore((state) => state.add);
  const remove = usePinnedItemsStore((state) => state.remove);

  const handleClick = () => goToPage(page, item.nasa_id);
  const handleModalClose = () => setIsZoomedModelOpen(false);
  const handlePin = () => {
    if (isSaved) remove(item.nasa_id);
    else add(item);
  };

  return (
    <div className="group relative">
      <img
        className="aspect-square w-full cursor-pointer rounded object-cover"
        src={item.thumbnailUrl}
        alt={item.title}
        title={item.description}
        onClick={handleClick}
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />
      <PinChip
        isSaved={isSaved}
        content={isSaved ? 'SAVED' : 'SAVE'}
        onClick={handlePin}
      />
      <p className="mt-2 truncate text-sm font-medium">{item.title}</p>
      {isZoomedModelOpen && (
        <ModalAsset
          assetDescription=""
          assetId={item.nasa_id}
          assetSrc={item.thumbnailUrl || ''}
          assetTitle={item.title}
          assetType={item.media_type || ''}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
