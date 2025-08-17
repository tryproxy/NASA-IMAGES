'use client';
import { useRouter } from 'next/navigation';

export const useNavigateTo = () => {
  const router = useRouter();
  const goToPage = (
    page: number | string,
    detailsId?: string,
    query?: string
  ) => {
    const q = query ? `?query=${encodeURIComponent(query)}` : '';
    if (detailsId) {
      router.push(`/${page}/${detailsId}/${q}`);
    } else {
      router.push(`/${page}${q}`);
    }
  };

  return { goToPage, router };
};
