'use client';
import { useNavigateTo } from '@/shared/hooks/useNavigateTo';
import { ModalAsset } from './ModalAsset';
import { NasaAssetResult } from '@/shared/api/nasa/types';

export function DetailsPanel({
  currentPage,
  detailsId,
  initialData,
  query,
}: {
  currentPage: number;
  detailsId: string;
  initialData: NasaAssetResult;
  query: string;
}) {
  const { goToPage } = useNavigateTo();
  if (!detailsId) return null;
  return (
    <div data-testid="modal-asset" className="flex flex-col gap-4 p-4">
      <ModalAsset
        item={initialData}
        mode={'panel'}
        assetId={detailsId || ''}
        assetSrc=""
        assetTitle=""
        assetDescription=""
        assetType="image"
        onClose={() => goToPage(currentPage, undefined, query)}
      />
    </div>
  );
}
