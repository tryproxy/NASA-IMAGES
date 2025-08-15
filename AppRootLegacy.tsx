'use client';

import { scan } from 'react-scan';

scan({
  enabled: true,
  trackUnnecessaryRenders: true,
  log: true,
  showToolbar: true,
  dangerouslyForceRunInProduction: true,
});

import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './src/app/router';

export default function AppRoot() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
