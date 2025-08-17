'use client';
import { CardSkeleton } from '@/entities/Card/ui/CardSkeleton';
import { NasaSearchResult } from '@/shared/api/nasa/types';
import { useNavigateTo } from '@/shared/hooks/useNavigateTo';
import { Pagination } from '@/shared/ui-kit/Pagination';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { RefreshButton } from './RefreshButton';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { INITIAL_QUERY } from '../model/constants';
import { QUERIES } from '../api/queries';

export function SearchLayout({
  currentPage,
  detailsId,
  initialData,
  initialQuery,
}: {
  currentPage: number;
  detailsId?: string;
  initialQuery?: string;
  initialData?: NasaSearchResult;
}) {
  const { history, loadHistory, removeEntry, saveHistory } = useSearchHistory();
  const { goToPage } = useNavigateTo();
  const qc = useQueryClient();
  const [query, setQuery] = useState<string>(initialQuery || INITIAL_QUERY);
  const {
    data,
    isError,
    isFetching,
    isPending,
    isSuccess,
    isRefetching,
    dataUpdatedAt,
  } = useQuery({
    ...QUERIES.SEARCH.query({ query, params: { page: currentPage } }),
    initialData: query === initialQuery ? initialData : undefined,
    placeholderData: keepPreviousData,
  });

  const handleRefresh = () => {
    qc.invalidateQueries({
      queryKey: QUERIES.SEARCH.query({ query, params: { page: currentPage } })
        .queryKey,
      refetchType: 'all',
    });
  };

  const {
    items = [],
    hasNextPage = true,
    hasPrevPage = true,
    totalHits = 1,
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
      <RefreshButton
        dataUpdatedAt={dataUpdatedAt}
        isRefetching={isRefetching}
        onClick={handleRefresh}
      />
      <SearchField
        onRemoveDropdownResult={removeEntry}
        onSearch={handleSearch}
        searchQueries={history}
      />

      <div className="w-full max-w-screen-xl flex-1 overflow-x-hidden overflow-y-auto rounded-xl p-2">
        <div className="flex-1 overflow-y-hidden rounded-sm border border-[var(--color-border)] p-2">
          {!data && isFetching ? (
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-4">
              {Array.from({ length: 10 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex h-[50vh] items-center justify-center text-[var(--color-danger)]">
              Could not load search results. Try again later.
            </div>
          ) : (
            <>
              <SearchResults
                isFetching={isFetching}
                isPending={isPending}
                isRefetching={isRefetching}
                isSuccessful={isSuccess}
                searchResults={items}
              />
              <div>
                <div>{data?.totalHits}</div>
              </div>
            </>
          )}
        </div>

        <div className="shrink-0">
          {totalHits > 0 && (
            <Pagination
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onPrev={() => goToPage(currentPage - 1, detailsId, query)}
              onNext={() => goToPage(currentPage + 1, detailsId, query)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
