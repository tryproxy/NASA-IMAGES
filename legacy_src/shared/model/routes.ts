import 'react-router-dom';

export const ROUTES = {
  HOME: {
    path: '',
    href: () => '/',
  },
  ABOUT: {
    path: 'about',
    href: () => '/about',
  },
  PAGE: {
    path: ':page',
    href: ({ page }: { page: string | number }) => `/${page}`,
  },
  DETAILS: {
    path: ':detailsId',
    href: ({ page, detailsId }: { page: string | number; detailsId: string }) =>
      `/${page}/${detailsId}`,
  },
} as const;

export type PathParams = {
  [ROUTES.PAGE.path]: {
    page: string;
  };
  [ROUTES.DETAILS.path]: {
    page: string;
    detailsId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
