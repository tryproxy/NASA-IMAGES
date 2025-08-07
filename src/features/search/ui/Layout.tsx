import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../../components/Loader';
import { Pagination } from '../../../components/Pagination';
import { NotFoundPage } from '../../../pages/NotFoundPage';
import { nasaClient } from '../../../shared/api/nasa';
import type { NasaApiClient, NasaItem } from '../../../shared/api/nasa/types';
import { useNavigateTo } from '../../../shared/hooks/useNavigateTo';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { INITIAL_QUERY, LOCAL_STORAGE_KEY } from '../model/constants';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';

export function SearchLayout() {
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
    <div className="flex flex-1 flex-col items-center">
      <SearchField
        onRemoveDropdownResult={removeEntry}
        onSearch={handleSearch}
        searchQueries={history}
      />

      <div className="w-full max-w-screen-xl flex-1 overflow-x-hidden overflow-y-auto rounded-xl p-2">
        <div className="flex-1 overflow-y-hidden rounded-sm border border-[var(--color-border)] p-2">
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
  );
}
