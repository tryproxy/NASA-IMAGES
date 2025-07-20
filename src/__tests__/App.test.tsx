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
import App from '../components/App';
import { nasaClient } from '../api/nasaClient';
import { INITIAL_QUERY, LOCAL_STORAGE_KEY } from '../constants';

const mockSearchResults = {
  nasa_id: 'saturn123',
  title: 'saturn rings',
  description: 'image of saturns rings',
  thumbnailUrl: 'https://test.com/saturn.jpg',
  media_type: 'image',
};

vi.mock('../api/nasaClient', async () => ({
  nasaClient: {
    search: vi.fn(),
  },
}));

describe('App', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.clearAllMocks());

  it('renders the app body', () => {
    render(<App />);
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  it('does initial search with default term when localStorage is empty', async () => {
    const mockSearch = nasaClient.search as Mock;
    mockSearch.mockResolvedValue([mockSearchResults]);

    render(<App />);

    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith({
        query: INITIAL_QUERY,
        options: { page: 1 },
      })
    );
  });

  it('shows the last search when it exists', async () => {
    const mockSearch = nasaClient.search as Mock;
    const lastSavedSearch = ['jupiter'];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lastSavedSearch));
    mockSearch.mockResolvedValue([mockSearchResults]);

    render(<App />);

    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith({
        query: lastSavedSearch[0],
        options: { page: 1 },
      })
    );
  });

  it('shows loader when search is in progress', async () => {
    const mockSearch = nasaClient.search as Mock;
    mockSearch.mockImplementation(
      () => new Promise((result) => setTimeout(() => result([]), 1000))
    );

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText(/fetching/i)).toBeInTheDocument()
    );
  });

  it('shows error message when search reuqest fails', async () => {
    const mockSearch = nasaClient.search as Mock;
    mockSearch.mockRejectedValue(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => expect(screen.getByText(/failed to fetch/i)));
    await waitFor(() =>
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    );
  });
});
