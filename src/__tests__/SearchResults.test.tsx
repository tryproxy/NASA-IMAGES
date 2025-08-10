import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import dummyThumbnail from '../assets/nasa_fallback.jpg';
import { MemoryRouter } from 'react-router-dom';
import { SearchResults } from '../features/search/ui/SearchResults';

const getDummyItem = (id: string, thumbnail: string | undefined) => ({
  nasa_id: id,
  title: `Title-${id}`,
  description: `Description${id}`,
  thumbnailUrl: thumbnail ?? '',
  media_type: 'image' as const,
});

describe('SearchResults', () => {
  it('shows "no results" message for successful search with empty response', () => {
    render(<SearchResults isSuccessful={true} searchResults={[]} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('does not show "no results" message for unsuccessful search with empty response', () => {
    render(<SearchResults isSuccessful={false} searchResults={[]} />);
    expect(screen.queryByText(/no results found/i)).not.toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    render(
      <MemoryRouter>
        <SearchResults
          searchResults={[
            getDummyItem('1', dummyThumbnail),
            getDummyItem('2', dummyThumbnail),
          ]}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Title-1')).toBeInTheDocument();
    expect(screen.getByText('Title-2')).toBeInTheDocument();
  });

  it('renders items without provided thumbnail', () => {
    render(
      <MemoryRouter>
        <SearchResults
          searchResults={[
            getDummyItem('1', dummyThumbnail),
            getDummyItem('2', undefined),
          ]}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Title-1')).toBeInTheDocument();
    expect(screen.queryByText('Title-2')).not.toBeInTheDocument();
  });
});
