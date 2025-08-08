import { Card } from '@/entities/Card/ui/Card';
import type { NasaItem } from '@/shared/api/nasa/types';
import { pinnedItemsStore } from '../model/pinnedItemsStore';

export function PinnableCard({ item }: { item: NasaItem }) {
  const isItemStored = pinnedItemsStore((state) => state.has(item.nasa_id));
  const add = pinnedItemsStore((state) => state.add);
  const remove = pinnedItemsStore((state) => state.remove);

  const handlePin = () => {
    if (isItemStored) remove(item.nasa_id);
    else add(item);
  };

  return <Card item={item} onPinClick={handlePin} isSelected={isItemStored} />;
}
