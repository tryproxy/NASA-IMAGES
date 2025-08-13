import { scan } from 'react-scan';

scan({
  enabled: true,
  trackUnnecessaryRenders: true,
  log: true,
  showToolbar: true,
  dangerouslyForceRunInProduction: true,
});
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundry } from '../components/ErrorBoundry.tsx';
import './index.css';
import { router } from './router.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundry>
      <RouterProvider router={router} />
    </ErrorBoundry>
  </StrictMode>
);
