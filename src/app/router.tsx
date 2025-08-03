import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AboutPage } from '../pages/AboutPage';
import { AppLayout } from './layout/AppLayout';
import { DetailsPanel } from '../components/DetailsPanel';
import { ROUTES } from '../shared/model/routes';
import { Providers } from './providers';

export const router = createBrowserRouter(
  [
    {
      element: (
        <Providers>
          <AppLayout />
        </Providers>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: ROUTES.PAGE.path,
          element: <HomePage />,
          children: [
            {
              path: ROUTES.DETAILS.path,
              element: <DetailsPanel />,
            },
          ],
        },
        {
          path: ROUTES.ABOUT.path,
          element: <AboutPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: '/',
  }
);
