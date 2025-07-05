import React from 'react';

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

export class SearchResults extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="min-w-2/3 rounded-[2px] border border-dashed border-gray-300 p-4">
        <ul className="text-amber-50">
          {this.props.searchResults.map((query, idx) => (
            <li className="text-amber-50" key={query.nasa_id}>
              {idx} {query.description}
            </li>
          ))}
        </ul>
        {/* <pre className="text-amber-50">
          {JSON.stringify(this.props.searchResults, null, 2)}
        </pre> */}
      </div>
    );
  }
}
