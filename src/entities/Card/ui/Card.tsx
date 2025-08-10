import type { NasaItem } from '@/shared/api/nasa/types';
import { useNavigateTo } from '@/shared/hooks/useNavigateTo';
import { useParams } from 'react-router-dom';
import fallbackImage from '../assets/nasa_fallback.jpg';
import { PinChip } from './PinChip';

export function Card({
  item,
  isSelected = false,
  onPinClick,
}: {
  item: NasaItem;
  isSelected?: boolean;
  onPinClick?: () => void;
}) {
  const { goToPage } = useNavigateTo();
  const { page = '1' } = useParams();

  const handleClick = () => goToPage(page, item.nasa_id);

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
        isSelected={isSelected}
        content={isSelected ? 'SAVED' : 'SAVE'}
        onClick={onPinClick}
      />
      <div className="mt-2 h-4">
        <p className="mt-2 truncate text-sm font-medium">{item.title}</p>
      </div>
    </div>
  );
}
