import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SearchField } from '../features/search/ui/SearchField';

const dummyProps = {
  searchQueries: [],
  onSearch: vi.fn(),
  onRemoveDropdownResult: vi.fn(),
};

describe('SearchField', () => {
  it('renders search field with a search button', () => {
    render(<SearchField {...dummyProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates input and starts the search', async () => {
    const onSearchMock = vi.fn();
    render(<SearchField {...dummyProps} onSearch={onSearchMock} />);

    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'saturn');
    await userEvent.click(searchBtn);

    expect(onSearchMock).toHaveBeenCalledWith('saturn');
  });

  it('starts search on Enter key pressed', async () => {
    const onSearchMock = vi.fn();
    render(<SearchField {...dummyProps} onSearch={onSearchMock} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'saturn{Enter}');

    expect(onSearchMock).toHaveBeenCalledWith('saturn');
  });

  it('opens dropdown on click on input area', async () => {
    render(
      <SearchField {...dummyProps} searchQueries={['earth', 'mars', 'venus']} />
    );

    const input = screen.getByRole('textbox');
    await userEvent.click(input);

    expect(screen.getByText('earth')).toBeInTheDocument();
    expect(screen.getByText('mars')).toBeInTheDocument();
    expect(screen.getByText('venus')).toBeInTheDocument();
  });
});
