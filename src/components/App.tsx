import React from 'react';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';
import { LOCAL_STORAGE_KEY } from '../constannts';
import { nasaClient, type SearchClient } from '../api/nasaClient';
import { Loader } from './Loader';
import { ErrorButton } from './ErrorButton';

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
  shouldThrow: boolean;
  errorMessage: null | string;
};

const INITIAL_QUERY = 'saturn rings';

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      inputHistory: [],
      searchResults: [],
      isLoading: false,
      shouldThrow: false,
      errorMessage: null,
    };
  }

  componentDidMount(): void {
    document.addEventListener('visibilitychange', this.handleTabsSync);
    this.loadHistory();
    this.setState({ isLoading: true }, () =>
      this.searchWithClient({
        query:
          JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')[0] ||
          INITIAL_QUERY,
        apiClient: nasaClient,
        options: { page: 1 },
      })
    );
  }

  componentWillUnmount(): void {
    document.removeEventListener('visibilitychange', this.handleTabsSync);
  }

  loadHistory = () => {
    const searchHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (searchHistory) {
      try {
        const parsedSearchHistory = JSON.parse(searchHistory) as string[];
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
    options,
    apiClient,
  }: {
    query: string;
    options: { page: number };
    apiClient: SearchClient;
  }) => {
    try {
      const res = await apiClient.search({ query, options });
      this.setState({ searchResults: res, errorMessage: null });
    } catch (e) {
      if (e instanceof Error) {
        this.setState({ errorMessage: e.message });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = async (searchQuery: string) => {
    this.saveHistory(searchQuery);
    this.setState({ isLoading: true });
    this.searchWithClient({
      query: searchQuery,
      apiClient: nasaClient,
      options: { page: 1 },
    });
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
    if (this.state.shouldThrow) {
      throw new Error('Error thrown');
    }

    return (
      <div className="flex min-h-screen min-w-screen grow flex-col items-center gap-4 overflow-x-hidden bg-black font-mono text-amber-50">
        <SearchField
          onRemoveDropdownResult={this.handleRemoveDropdownResult}
          onSearch={this.handleSearch}
          searchQueries={this.state.inputHistory}
        />
        {this.state.isLoading && <Loader />}
        {this.state.errorMessage ? (
          <div className="text-red-500">{this.state.errorMessage}</div>
        ) : (
          <SearchResults
            isSuccessful={!this.state.isLoading && !this.state.errorMessage}
            searchQueries={this.state.inputHistory}
            searchResults={this.state.searchResults}
          />
        )}
        <ErrorButton
          text="Throw Error"
          onClick={() => this.setState({ shouldThrow: true })}
        />
      </div>
    );
  }
}

export default App;
