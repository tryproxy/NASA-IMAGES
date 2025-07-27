import { Card } from './Card';
import { searchTips } from '../constants';

type NasaItem = {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  mediaType?: string;
};

export function SearchResults({
  searchResults,
  isSuccessful,
}: {
  searchResults: NasaItem[];
  isSuccessful?: boolean;
}) {
  return (
    <div className="w-full max-w-screen-xl rounded-sm border-amber-50/20 p-6">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6">
        {searchResults.length > 0 &&
          searchResults.map((item) => (
            <div key={item.nasa_id} className="text-amber-51">
              {item.thumbnailUrl && <Card item={item} />}
            </div>
          ))}
      </div>
      {isSuccessful && searchResults.length === 0 && (
        <div className="flex max-w-full flex-col items-center">
          <p className="max-w-full font-bold text-amber-50">No results found</p>
          <p className="max-w-full font-bold text-amber-50">{searchTips[1]}</p>
        </div>
      )}
    </div>
  );
}
