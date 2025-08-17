import { useNavigateTo } from '@/shared/hooks/useNavigateTo';
import { useParams } from 'react-router-dom';
import { ModalAsset } from './ModalAsset';

export function DetailsPanel() {
  const { goToPage } = useNavigateTo();
  const { page = 1, detailsId } = useParams();
  if (!detailsId) return null;
  return (
    <div data-testid="modal-asset" className="flex flex-col gap-4 p-4">
      <ModalAsset
        mode={'panel'}
        assetId={detailsId || ''}
        assetSrc=""
        assetTitle=""
        assetDescription=""
        assetType="image"
        onClose={() => goToPage(page)}
      />
    </div>
  );
}
