import { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { SearchField } from '../components/SearchField';
import { SearchResults } from '../components/SearchResults';
import { INITIAL_QUERY, LOCAL_STORAGE_KEY } from '../constants';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { nasaClient } from '../shared/api/nasa';
import type { NasaApiClient } from '../shared/api/nasa/types';
import { NotFoundPage } from './NotFoundPage';
import { useNavigateTo } from '../shared/hooks/useNavigateTo';
import { Pagination } from '../components/Pagination';

type NasaItem = {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  media_type: 'image' | 'video';
};

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<NasaItem[]>([]);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
  const { history, loadHistory, removeEntry, saveHistory } = useSearchHistory();

  const { goToPage } = useNavigateTo();

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
      const { items, hasNextPage, hasPrevPage, totalHits } =
        await apiClient.search({
          query,
          options,
        });
      setSearchResults(items);
      setHasNextPage(hasNextPage);
      setHasPrevPage(hasPrevPage);
      setTotalHits(totalHits);
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
      goToPage(1, detailsId);
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
    <div className="flex h-full w-full bg-black font-mono text-amber-50">
      <div className="flex flex-1 flex-col items-center">
        <SearchField
          onRemoveDropdownResult={removeEntry}
          onSearch={handleSearch}
          searchQueries={history}
        />

        <div className="w-full max-w-screen-xl flex-1 overflow-x-hidden overflow-y-auto rounded-xl p-2">
          <div className="flex-1 overflow-y-hidden rounded-sm border border-amber-50/20 p-2">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <NotFoundPage />
            ) : (
              <SearchResults isSuccessful searchResults={searchResults} />
            )}
          </div>

          <div className="shrink-0">
            {totalHits > 0 && (
              <Pagination
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                onPrev={() => goToPage(currentPage - 1, detailsId)}
                onNext={() => goToPage(currentPage + 1, detailsId)}
              />
            )}
          </div>
        </div>
      </div>

      {detailsId && (
        <div className="w-[420px] max-w-full shrink-0 border-l border-amber-50/20 p-4 sm:w-[520px] lg:w-[620px]">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default App;
