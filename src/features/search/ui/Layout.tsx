import { NotFoundPage } from '@/pages/NotFoundPage';
import { useNavigateTo } from '@/shared/hooks/useNavigateTo';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../../components/Loader';
import { Pagination } from '../../../components/Pagination';
import { QUERIES } from '../api/queries';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { INITIAL_QUERY, LOCAL_STORAGE_KEY } from '../model/constants';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';

export function SearchLayout() {
  const { history, loadHistory, removeEntry, saveHistory } = useSearchHistory();
  const { goToPage } = useNavigateTo();
  const { page = '1', detailsId } = useParams();
  const currentPage = parseInt(page);

  const [query, setQuery] = useState<string>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')[0] ||
      INITIAL_QUERY
  );

  const { data, isLoading, isError } = useQuery(
    QUERIES.SEARCH.query({ query, params: { page: currentPage } })
  );

  const {
    items = [],
    hasNextPage = true,
    hasPrevPage = true,
    totalHits = 0,
  } = data ?? {};

  const handleTabsSync = useCallback(
    () => document.visibilityState === 'visible' && loadHistory(),
    [loadHistory]
  );

  const handleSearch = async (searchQuery: string) => {
    saveHistory(searchQuery);
    setQuery(searchQuery);

    if (currentPage !== 1) {
      goToPage(1, detailsId);
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleTabsSync);
    loadHistory();

    return () => {
      document.removeEventListener('visibilitychange', handleTabsSync);
    };
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
          ) : isError ? (
            <NotFoundPage />
          ) : (
            <SearchResults isSuccessful searchResults={items} />
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
