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
      <div className="min-w-2/3 rounded-sm border border-dashed border-gray-300 p-4">
        <div className="min-w-2/3 rounded-sm border border-dashed border-gray-300 p-4">
          <div className="grid grid-cols-5 gap-4">
            {this.props.searchResults.map((item) => (
              <div key={item.nasa_id} className="text-amber-50">
                {item.thumbnailUrl && (
                  <img
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
                    }}
                    src={item.thumbnailUrl}
                    alt={item.title}
                    title={item.description}
                    className="aspect-square w-full rounded object-cover"
                  />
                )}
                <p className="mt-1 truncate text-sm font-medium">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* <pre className="break-words whitespace-pre-wrap text-amber-50">
          {JSON.stringify(this.props.searchResults, null, 2)}
        </pre> */}
      </div>
    );
  }
}
