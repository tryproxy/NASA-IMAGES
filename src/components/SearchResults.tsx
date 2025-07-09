import React from 'react';
import { Card } from './Card';
import { searchTips } from '../constannts';

type NasaItem = {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  mediaType?: string;
};
type Props = {
  searchResults: NasaItem[];
  searchQueries: string[];
};

type State = {
  isZoomedModelOpen: boolean;
};

export class SearchResults extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isZoomedModelOpen: false,
    };
  }
  render() {
    return (
      <div className="min-w-2/3 rounded-sm border-dashed border-gray-300 p-4">
        <div className="min-w-2/3 rounded-sm border-dashed border-gray-300 p-4">
          <div className="grid grid-cols-5 gap-4">
            {this.props.searchResults.length > 0 &&
              this.props.searchResults.map((item) => (
                <div key={item.nasa_id} className="text-amber-51">
                  {item.thumbnailUrl && <Card item={item} />}
                </div>
              ))}
          </div>
          {this.props.searchResults.length === 0 && (
            <div className="flex max-w-full flex-col items-center">
              <p className="max-w-full font-bold text-amber-50">
                No results found
              </p>
              <p className="max-w-full font-bold text-amber-50">
                {searchTips[1]}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
