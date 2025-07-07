import React from 'react';
import { Card } from './Card';

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
      <div className="min-w-2/3 rounded-sm border border-dashed border-gray-300 p-4">
        <div className="min-w-2/3 rounded-sm border border-dashed border-gray-300 p-4">
          <div className="grid grid-cols-5 gap-4">
            {this.props.searchResults.length > 0 ? (
              this.props.searchResults.map((item) => (
                <div key={item.nasa_id} className="text-amber-51">
                  {item.thumbnailUrl && <Card item={item} />}
                </div>
              ))
            ) : (
              <p className="text-amber-700">No results found</p>
            )}
          </div>
        </div>
        {/* <pre className="break-words whitespace-pre-wrap text-amber-50">
          {JSON.stringify(this.props.searchResults, null, 2)}
        </pre> */}
      </div>
    );
  }
}
