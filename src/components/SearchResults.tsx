import { Card } from './Card';
import { searchTips } from '../constants';
import type { NasaItem } from '../shared/api/nasa/types';

export function SearchResults({
  searchResults,
  isSuccessful,
}: {
  searchResults: NasaItem[];
  isSuccessful?: boolean;
}) {
  return (
    <div className="w-full max-w-screen-xl rounded-sm border-[var(--color-border)] p-2">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-4">
        {searchResults.length > 0 &&
          searchResults.map((item) => (
            <div key={item.nasa_id} className="w-full text-[var(--color-fg)]">
              {item.thumbnailUrl && <Card item={item} />}
            </div>
          ))}
      </div>
      {isSuccessful && searchResults.length === 0 && (
        <div className="flex max-w-full flex-col items-center">
          <p className="max-w-full font-bold text-[var(--color-fg)]">
            No results found
          </p>
          <p className="max-w-full font-bold text-[var(--color-fg)]">
            {searchTips[1]}
          </p>
        </div>
      )}
    </div>
  );
}
