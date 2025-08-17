import { INITIAL_QUERY } from '@/features/search/model/constants';
import { SearchLayout } from '@/features/search/ui/Layout';
import { nasaClient } from '@/shared/api/nasa';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ query: string }>;
}) {
  const { page } = await params;
  const { query } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const initialQuery = query || INITIAL_QUERY;

  const data = await nasaClient.search({
    query: initialQuery,
    params: { page: currentPage },
  });
  return (
    <SearchLayout
      currentPage={currentPage}
      initialData={data}
      initialQuery={initialQuery}
    />
  );
}
