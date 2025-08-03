import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppLayout } from '../app/layout/AppLayout';
import { Providers } from '../app/providers';

describe('AppLayout', () => {
  it('renders header links', () => {
    render(
      <Providers>
        <MemoryRouter>
          <AppLayout />
        </MemoryRouter>
      </Providers>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
