import React from 'react';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';
import { LOCAL_STORAGE_KEY } from '../constannts';

type Props = Record<string, never>;
type State = { input: string; inputHistory: string[] };

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      inputHistory: [],
    };
  }

  componentDidMount(): void {
    this.loadHistory();
  }

  loadHistory = () => {
    const searchHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (searchHistory) {
      try {
        const parsedSearchHistory = JSON.parse(searchHistory) as string[];
        console.log(parsedSearchHistory, 'SEARCH HISTORY');
        this.setState({ inputHistory: parsedSearchHistory });
      } catch (e) {
        if (e instanceof Error) {
          throw e.message;
        }
      }
    }
  };

  saveHistory = (query: string) => {
    if (query.trim().length === 0) return;
    this.setState(
      (prev) => ({
        inputHistory: [
          query.trim(),
          ...prev.inputHistory.filter((entry) => entry !== query.trim()),
        ],
      }),
      () =>
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(this.state.inputHistory)
        )
    );
  };

  handleSearch = (searchInput: string) => {
    this.saveHistory(searchInput);
    // this.setState({ input: '' });
  };

  handleRemoveDropdownResult = (index: number | string) => {
    this.setState(
      {
        inputHistory: this.state.inputHistory.filter((_, idx) => idx !== index),
      },
      () =>
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(this.state.inputHistory)
        )
    );
  };

  render() {
    return (
      <div className="flex h-screen w-screen flex-col items-center gap-4 bg-black p-4 font-mono text-amber-50">
        <SearchField
          onRemoveDropdownResult={this.handleRemoveDropdownResult}
          onSearch={this.handleSearch}
          searchResults={this.state.inputHistory}
        />
        <SearchResults searchResults={this.state.inputHistory} />
      </div>
    );
  }
}

export default App;
