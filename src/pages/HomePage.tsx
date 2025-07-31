import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { SearchField } from '../components/SearchField';
import { SearchResults } from '../components/SearchResults';
import { INITIAL_QUERY, LOCAL_STORAGE_KEY } from '../constants';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { nasaClient } from '../shared/api/nasa';
import type { NasaApiClient } from '../shared/api/nasa/types';
import { NotFoundPage } from './NotFoundPage';

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
  const { history, loadHistory, removeEntry, saveHistory } = useSearchHistory();

  const navigate = useNavigate();

  const { page = '1', detailsId } = useParams();
  const currentPage = parseInt(page);

  const handleTabsSync = useCallback(
    () => document.visibilityState === 'visible' && loadHistory(),
    [loadHistory]
  );

  const searchWithClient = async ({
    query,
    options,
    apiClient,
  }: {
    query: string;
    options: { page: number };
    apiClient: NasaApiClient;
  }) => {
    try {
      const res = await apiClient.search({ query, options });
      setSearchResults(res.items);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
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
  }, [handleTabsSync, currentPage, loadHistory]);

  return (
    <div
      data-testid="app-container"
      className="flex h-full w-full flex-col items-center gap-4 bg-black font-mono text-amber-50"
    >
      <SearchField
        onRemoveDropdownResult={removeEntry}
        onSearch={handleSearch}
        searchQueries={history}
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
