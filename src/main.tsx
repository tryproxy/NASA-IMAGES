import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App.tsx';
import { ErrorBoundry } from './components/ErrorBoundry.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundry>
      <App />
    </ErrorBoundry>
  </StrictMode>
);
