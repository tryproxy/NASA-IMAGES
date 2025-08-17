import fallbackImg from '../assets/nasa_fallback.jpg';
import { ModalAssetImage } from './ModalAssetImage';
import { ModalAssetVideo } from './ModalAssetVideo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERIES } from '../api/queries';
import { Loader } from '@/shared/ui-kit/Loader';
import { RefreshButton } from '@/features/search/ui/RefreshButton';

export function ModalAsset({
  assetId,
  assetSrc,
  assetTitle,
  assetType,
  mode = 'panel',
  onClose,
}: {
  assetId: string;
  assetSrc: string;
  assetTitle: string;
  assetType: 'image' | 'video';
  assetDescription: string;
  mode?: 'modal' | 'panel';
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const { data, isSuccess, isError, isPending, dataUpdatedAt, isRefetching } =
    useQuery(QUERIES.getAsset.query({ id: assetId }));

  const { large, medium, small, original } = data ?? {};
  const assetUrl =
    large || medium || small || original || assetSrc || fallbackImg;

  const assetContainerClass =
    mode === 'modal'
      ? 'fixed inset-0 flex cursor-pointer items-center justify-center bg-black/90 backdrop-blur-md'
      : 'w-full h-full flex flex-col border-[var(--color-border)]';

  const handleRefresh = () => {
    qc.invalidateQueries({
      queryKey: QUERIES.getAsset.query({ id: assetId }).queryKey,
      refetchType: 'all',
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <RefreshButton
        dataUpdatedAt={dataUpdatedAt}
        isRefetching={isRefetching}
        onClick={handleRefresh}
      />
      <div
        data-testid="modal-asset relative"
        className={assetContainerClass}
        onClick={onClose}
      >
        {isPending && (
          <Loader className="inset-0 flex h-[50vh] items-center justify-center" />
        )}
        {isError && (
          <div className="flex h-[60vh] w-full items-center justify-center text-center text-[var(--color-danger)]">
            Could not load this NASA asset. Check if the ID is correct.
          </div>
        )}
        {isSuccess && (
          <>
            <div className="popup-fade-in flex max-h-[90vh] max-w-[90vw] cursor-pointer items-center">
              {assetType === 'image' ? (
                <ModalAssetImage imageSrc={assetUrl} imageTitle={assetTitle} />
              ) : (
                <ModalAssetVideo videoSrc={assetUrl} videoTitle={assetTitle} />
              )}
            </div>
            <div>
              <button className="cursor-pointer" onClick={onClose}>
                ✖ Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
