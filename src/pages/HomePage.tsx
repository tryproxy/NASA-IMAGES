import { useCallback, useEffect, useState } from 'react';
import { SearchField } from '../components/SearchField';
import { SearchResults } from '../components/SearchResults';
import { INITIAL_QUERY, LOCAL_STORAGE_KEY } from '../constants';
import { nasaClient, type SearchClient } from '../api/nasaClient';
import { Loader } from '../components/Loader';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { Button } from '../components/Button';

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

  const navigate = useNavigate();

  const { page = '1', detailsId } = useParams();
  const currentPage = parseInt(page);

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

    if (currentPage !== 1) {
      navigate('/');
    }
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
      options: { page: currentPage },
    });

    return () =>
      document.removeEventListener('visibilitychange', handleTabsSync);
  }, [handleTabsSync, currentPage]);

  return (
    <div
      data-testid="app-container"
      className="flex h-full w-full flex-col items-center gap-4 bg-black font-mono text-amber-50"
    >
      <SearchField
        onRemoveDropdownResult={handleRemoveDropdownResult}
        onSearch={handleSearch}
        searchQueries={inputHistory}
      />
      {isLoading && <Loader />}
      {error ? (
        <NotFoundPage />
      ) : (
        <div className="flex w-full flex-1">
          <div className="flex flex-1 flex-col items-center gap-4">
            <SearchResults
              isSuccessful={!isLoading && error == null}
              searchResults={searchResults}
            />
            {searchResults.length > 1 && (
              <div className="flex gap-4 p-4">
                {currentPage > 1 && (
                  <Button
                    content="Previous"
                    onClick={() => navigate(`/${Math.max(1, currentPage - 1)}`)}
                  />
                )}
                {currentPage < searchResults.length - 1 && (
                  <Button
                    content="Next"
                    onClick={() => navigate(`/${currentPage + 1}`)}
                  />
                )}
              </div>
            )}
          </div>
          {detailsId && (
            <div className="max-h-screen w-[420px] overflow-auto border-l border-amber-50/20 p-4">
              <Outlet />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
