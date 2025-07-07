import React from 'react';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';
import { LOCAL_STORAGE_KEY } from '../constannts';
import { nasaClient, type SearchClient } from '../api/nasaClient';

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
  isLoading: boolean;
};

const INITIAL_QUERY = 'moon landing site';

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      inputHistory: [],
      searchResults: [],
      isLoading: false,
    };
  }

  componentDidMount(): void {
    document.addEventListener('visibilitychange', this.handleTabsSync);
    this.loadHistory();
    this.searchWithClient({
      query:
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '')[0] ||
        INITIAL_QUERY,
      apiClient: nasaClient,
    });
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

  searchWithClient = async ({
    query,
    apiClient,
  }: {
    query: string;
    apiClient: SearchClient;
  }) => {
    try {
      const res = await apiClient.search(query);
      this.setState({ searchResults: res });
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = async (searchQuery: string) => {
    this.saveHistory(searchQuery);
    this.setState({ isLoading: true });
    this.searchWithClient({ query: searchQuery, apiClient: nasaClient });
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
      <div className="flex min-h-screen min-w-screen grow flex-col items-center gap-4 overflow-x-hidden bg-black font-mono text-amber-50">
        <SearchField
          onRemoveDropdownResult={this.handleRemoveDropdownResult}
          onSearch={this.handleSearch}
          searchQueries={this.state.inputHistory}
        />
        {this.state.isLoading ? (
          <div className="flex gap-2">
            <p className="flex">Fetching [images.nasa.gov]</p>
            <span className="loader left-0 inline-flex h-3 w-3"></span>
          </div>
        ) : (
          <SearchResults
            searchQueries={this.state.inputHistory}
            searchResults={this.state.searchResults}
          />
        )}
      </div>
    );
  }
}

export default App;
