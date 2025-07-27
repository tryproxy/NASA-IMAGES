import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';

describe('AboutPage', () => {
  it('renders About page content', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/author/i)).toBeInTheDocument();
  });
});
