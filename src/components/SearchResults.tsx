import React from 'react';

type Props = {
  searchResults: string[];
};

export class SearchResults extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="min-w-full rounded-md border border-dashed border-gray-300 p-4">
        <ul>
          {this.props.searchResults.map((result, idx) => (
            <li key={idx}>{result}</li>
          ))}
        </ul>
        <pre>{JSON.stringify(this.props.searchResults, null, 2)}</pre>
      </div>
    );
  }
}
