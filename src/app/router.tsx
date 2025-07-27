import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AboutPage } from '../pages/AboutPage';
import { AppLayout } from '../components/layout/AppLayout';
import { DetailsPanel } from '../components/DetailsPanel';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />

      <Route path=":page" element={<HomePage />}>
        <Route path=":detailsId" element={<DetailsPanel />} />
      </Route>

      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ),
  {
    basename: '/react-classes-app',
  }
);
