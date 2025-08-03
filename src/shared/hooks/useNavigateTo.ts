import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../model/routes';

export const useNavigateTo = () => {
  const navigate = useNavigate();
  const goToPage = (page: number | string, detailsId?: string) =>
    navigate(
      detailsId
        ? ROUTES.DETAILS.href({ page, detailsId })
        : ROUTES.PAGE.href({ page })
    );
  return { goToPage, navigate };
};
