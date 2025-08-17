import { DetailsPanel } from '@/features/details/ui/DetailsPanel';
import { INITIAL_QUERY } from '@/features/search/model/constants';
import { SearchLayout } from '@/features/search/ui/Layout';
import { nasaClient } from '@/shared/api/nasa';
import { notFound } from 'next/navigation';

export default async function DetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: string; detailsId: string }>;
  searchParams: Promise<{ query: string }>;
}) {
  const { page, detailsId } = await params;
  const { query } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const initialQuery = query?.trim() || 'Jupiter';
  const data = await nasaClient.search({
    query: initialQuery,
    params: { page: currentPage },
  });

  const asset = await nasaClient.getAsset(detailsId);
  if (!asset) {
    notFound();
  }

  return (
    <div className="flex h-full w-full">
      <SearchLayout
        currentPage={currentPage}
        detailsId={detailsId}
        initialQuery={initialQuery}
        initialData={data}
      />
      <div className="w-[420px] max-w-full shrink-0 border-l border-[var(--color-border)] p-4 sm:w-[520px] lg:w-[620px]">
        <DetailsPanel
          query={INITIAL_QUERY}
          currentPage={currentPage}
          detailsId={detailsId}
          initialData={asset}
        />
      </div>
    </div>
  );
}
