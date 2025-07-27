import { useNavigate, useParams } from 'react-router-dom';
import { ModalAsset } from './ModalAsset';

export function DetailsPanel() {
  const navigate = useNavigate();
  const { detailsId } = useParams();

  return (
    <div className="flex flex-col gap-4 p-4">
      <ModalAsset
        mode={'panel'}
        assetId={detailsId || ''}
        assetSrc=""
        assetTitle=""
        assetDescription=""
        assetType="image"
        onClose={() => navigate(`/`)}
      />
    </div>
  );
}
