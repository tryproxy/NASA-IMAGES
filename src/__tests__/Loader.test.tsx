import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from '../shared/ui-kit/LoaderLegacy';

describe('Loader', () => {
  it('renders a Loader indication', () => {
    render(<Loader />);
    expect(screen.getByText('Fetching [images.nasa.gov]')).toBeInTheDocument();
  });
});
