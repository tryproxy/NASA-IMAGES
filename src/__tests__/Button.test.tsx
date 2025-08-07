import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../shared/ui/kit/Button';

describe('Button', () => {
  it('is a button with a text', () => {
    render(<Button content="DefaultText" onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'DefaultText' })
    ).toBeInTheDocument();
  });

  it('calls onClick on button click', async () => {
    const handleButtonClick = vi.fn();
    render(<Button content="text" onClick={handleButtonClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'text' }));

    expect(handleButtonClick).toHaveBeenCalled();
  });
});
