import React from 'react';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';
import { LOCAL_STORAGE_KEY } from '../constannts';
import { nasaClient } from '../api/nasaClient';

type Props = Record<string, never>;
type NasaItem = {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  mediaType?: string;
};
type State = {
  input: string;
  inputHistory: string[];
  searchResults: NasaItem[];
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      inputHistory: [],
      searchResults: [],
    };
  }

  componentDidMount(): void {
    document.addEventListener('visibilitychange', this.handleTabsSync);
    this.loadHistory();
  }

  componentWillUnmount(): void {
    document.removeEventListener('visibilitychange', this.handleTabsSync);
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

  handleSearch = async (searchInput: string) => {
    this.saveHistory(searchInput);
    try {
      const res = await nasaClient.search(searchInput);
      this.setState({ searchResults: res });
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  };

  handleTabsSync = () =>
    document.visibilityState === 'visible' && this.loadHistory();

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
      <div className="flex h-screen w-screen grow flex-col items-center gap-40 bg-black p-4 font-mono text-amber-50">
        <SearchField
          onRemoveDropdownResult={this.handleRemoveDropdownResult}
          onSearch={this.handleSearch}
          searchQueries={this.state.inputHistory}
        />
        <SearchResults
          searchQueries={this.state.inputHistory}
          searchResults={this.state.searchResults}
        />
      </div>
    );
  }
}

export default App;
