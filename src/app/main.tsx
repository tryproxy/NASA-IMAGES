import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundry } from '../components/ErrorBoundry.tsx';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundry>
      <RouterProvider router={router} />
    </ErrorBoundry>
  </StrictMode>
);
