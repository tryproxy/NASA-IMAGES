import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../components/Card';
import userEvent from '@testing-library/user-event';

const dummyItem = {
  nasa_id: '0123',
  title: 'Title',
  description: 'Description',
  thumbnailUrl: 'https://test.com/thumb.jpg',
  media_type: 'image',
};

describe('Card', () => {
  it('renders card image with attributes', () => {
    render(<Card item={dummyItem} />);

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
    render(<Card item={dummyItem} />);
    expect(screen.getByText(dummyItem.title)).toBeInTheDocument();
  });

  it('opens modal window when click on card with image', async () => {
    render(<Card item={dummyItem} />);
    await userEvent.click(screen.getByRole('img'));
    screen.getByTestId('modal-asset');
  });

  it('opens modal window when click on card with video', async () => {
    render(<Card item={{ ...dummyItem, media_type: 'video' }} />);
    await userEvent.click(screen.getByRole('img'));
    screen.getByTestId('modal-asset');
  });
});
