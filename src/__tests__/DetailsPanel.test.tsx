import { describe, it, expect, vi } from 'vitest';
import type { router } from '../app/router';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DetailsPanel } from '../components/DetailsPanel';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof router>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: () => ({ detailsId: 'dummyAsset_id' }),
  };
});

describe('DetailsPanel', () => {
  it('renders panel correctly ', async () => {
    render(
      <MemoryRouter initialEntries={['/1/dummyAsset_id']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<DetailsPanel />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('modal-asset')).toBeInTheDocument();
  });
});
