import { render, screen, waitFor } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
} from 'vitest';
import TestApp from '../pages/HomePage';
import { MemoryRouter } from 'react-router-dom';
import { nasaClient } from '../shared/api/nasa';
import {
  INITIAL_QUERY,
  LOCAL_STORAGE_KEY,
} from '../features/search/model/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const mockSearchResults = {
  nasa_id: 'saturn123',
  title: 'saturn rings',
  description: 'image of saturns rings',
  thumbnailUrl: 'https://test.com/saturn.jpg',
  media_type: 'image',
};

vi.mock('../shared/api/nasa', async () => ({
  nasaClient: {
    search: vi.fn(),
  },
}));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/1']}>
        <TestApp />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('App', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.clearAllMocks());

  it('renders the app body', () => {
    render(<App />);
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  it('does initial search with default term when localStorage is empty', async () => {
    const mockSearch = nasaClient.search as Mock;
    mockSearch.mockResolvedValue({
      totalHits: 1,
      items: [mockSearchResults],
    });

    render(<App />);

    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith(
        {
          query: INITIAL_QUERY,
          params: { page: 1 },
        },
        expect.anything()
      )
    );
  });

  it('shows the last search when it exists', async () => {
    const mockSearch = nasaClient.search as Mock;
    const lastSavedSearch = ['jupiter'];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lastSavedSearch));
    mockSearch.mockResolvedValue({
      totalHits: 1,
      items: [mockSearchResults],
    });

    render(<App />);

    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith(
        { query: lastSavedSearch[0], params: { page: 1 } },
        expect.anything()
      )
    );
  });

  // it('shows loader when search is in progress', async () => {
  //   const mockSearch = nasaClient.search as Mock;
  //   mockSearch.mockImplementation(
  //     () =>
  //       new Promise((result) =>
  //         setTimeout(
  //           () =>
  //             result({
  //               totalHits: 1,
  //               items: [],
  //             }),
  //           1000
  //         )
  //       )
  //   );

  //   render(<App />);

  //   expect(screen.findByTestId('loader')).toBeInTheDocument();
  // });

  // it('shows error message when search reuqest fails', async () => {
  //   const mockSearch = nasaClient.search as Mock;
  //   mockSearch.mockRejectedValue(new Error('Failed to fetch'));

  //   render(<App />);

  //   expect(screen.findByText(/404 not found/i)).toBeInTheDocument();
  // });
});
