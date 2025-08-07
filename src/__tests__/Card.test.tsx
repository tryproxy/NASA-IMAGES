import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { NasaItem } from '../shared/api/nasa/types';
import { Card } from '../entities/Card/ui/Card';

const dummyItem: NasaItem = {
  nasa_id: '0123',
  title: 'Title',
  description: 'Description',
  thumbnailUrl: 'https://test.com/thumb.jpg',
  media_type: 'image',
};

describe('Card', () => {
  it('renders card image with attributes', () => {
    render(
      <MemoryRouter>
        <Card item={dummyItem} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      dummyItem.thumbnailUrl
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'title',
      dummyItem.description
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', dummyItem.title);
  });

  it('renders card with provided title', () => {
    render(
      <MemoryRouter>
        <Card item={dummyItem} />
      </MemoryRouter>
    );
    expect(screen.getByText(dummyItem.title)).toBeInTheDocument();
  });
});
