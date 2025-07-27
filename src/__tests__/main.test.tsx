import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../app/router';

describe('main entry point', () => {
  it('renders the app without crashing', () => {
    render(<RouterProvider router={router} />);
  });
});
