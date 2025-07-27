import { useState } from 'react';
import { ModalAsset } from './ModalAsset';
import { type NasaItem } from '../api/nasaClient';
import fallbackImage from '../assets/nasa_fallback.jpg';
import { useNavigate, useParams } from 'react-router-dom';

export function Card({ item }: { item: NasaItem }) {
  const [isZoomedModelOpen, setIsZoomedModelOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { page = '1' } = useParams();

  const handleClick = () => navigate(`/${page}/${item.nasa_id}`);
  const handleModalClose = () => setIsZoomedModelOpen(false);

  return (
    <div>
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
