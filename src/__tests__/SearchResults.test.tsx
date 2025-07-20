import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import dummyThumbnail from '../assets/nasa_fallback.jpg';
import { SearchResults } from '../components/SearchResults';

const getDummyItem = (id: string, thumbnail: string | undefined) => ({
  nasa_id: id,
  title: `Title-${id}`,
  description: `Description${id}`,
  thumbnailUrl: thumbnail,
});

describe('SearchResults', () => {
  it('shows "no results" message for successful search with empty response', () => {
    render(<SearchResults isSuccessful={true} searchResults={[]} />);
    expect(screen.getByText(/no results found/i));
  });

  it('does not show "no results" message for unsuccessful search with empty response', () => {
    render(<SearchResults isSuccessful={false} searchResults={[]} />);
    expect(screen.queryByText(/no results found/i)).not.toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    render(
      <SearchResults
        searchResults={[
          getDummyItem('1', dummyThumbnail),
          getDummyItem('2', dummyThumbnail),
        ]}
      />
    );

    expect(screen.getByText('Title-1'));
    expect(screen.getByText('Title-2'));
  });

  it('renders items without provided thumbnail', () => {
    render(
      <SearchResults
        searchResults={[
          getDummyItem('1', dummyThumbnail),
          getDummyItem('2', undefined),
        ]}
      />
    );

    expect(screen.getByText('Title-1'));
    expect(screen.queryByText('Title-2')).not.toBeInTheDocument();
  });
});
