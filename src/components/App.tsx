import { useCallback, useEffect, useState } from 'react';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';
import { INITIAL_QUERY, LOCAL_STORAGE_KEY } from '../constants';
import { nasaClient, type SearchClient } from '../api/nasaClient';
import { Loader } from './Loader';

type NasaItem = {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  mediaType?: string;
};

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<NasaItem[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  const handleTabsSync = useCallback(
    () => document.visibilityState === 'visible' && loadHistory(),
    []
  );

  const loadHistory = () => {
    const searchHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (searchHistory) {
      try {
        const parsedSearchHistory = JSON.parse(searchHistory) as string[];
        setInputHistory(parsedSearchHistory);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
          throw e;
        }
      }
    }
  };

  const saveHistory = (query: string) => {
    if (query.trim().length === 0) return;

    setInputHistory((prev) => {
      const updatedInputHistory = [
        query.trim(),
        ...prev.filter((entry) => entry !== query.trim()),
      ];

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedInputHistory)
      );

      return updatedInputHistory;
    });
  };

  const searchWithClient = async ({
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
      setSearchResults(res);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    saveHistory(searchQuery);
    setIsLoading(true);
    searchWithClient({
      query: searchQuery,
      apiClient: nasaClient,
      options: { page: 1 },
    });
  };

  const handleRemoveDropdownResult = (index: number | string) => {
    setInputHistory((prev) => {
      const updatedDropdownResult = prev.filter((_, idx) => idx !== index);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedDropdownResult)
      );
      return updatedDropdownResult;
    });
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleTabsSync);
    loadHistory();
    setIsLoading(true);
    searchWithClient({
      query:
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')[0] ||
        INITIAL_QUERY,
      apiClient: nasaClient,
      options: { page: 1 },
    });

    return () =>
      document.removeEventListener('visibilitychange', handleTabsSync);
  }, [handleTabsSync]);

  return (
    <div
      data-testid="app-container"
      className="flex min-h-screen w-full flex-col items-center gap-4 bg-black font-mono text-amber-50"
    >
      <SearchField
        onRemoveDropdownResult={handleRemoveDropdownResult}
        onSearch={handleSearch}
        searchQueries={inputHistory}
      />
      {isLoading && <Loader />}
      {error ? (
        <div data-testid="error-message" className="text-red-500">
          {error}
        </div>
      ) : (
        <SearchResults
          isSuccessful={!isLoading && error == null}
          searchResults={searchResults}
        />
      )}
    </div>
  );
}

export default App;
