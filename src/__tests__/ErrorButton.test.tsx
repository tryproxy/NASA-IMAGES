import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ErrorButton } from '../shared/ui-kit/ErrorBoundry/ErrorButton';

describe('ErrorButton', () => {
  it('is a Button with a text', () => {
    render(<ErrorButton text="DefaultErrorButtonText" onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'DefaultErrorButtonText' })
    ).toBeInTheDocument();
  });

  it('calls onClick on button click', async () => {
    const handleButtonClick = vi.fn();
    render(<ErrorButton text="..." onClick={handleButtonClick} />);

    await userEvent.click(screen.getByRole('button', { name: '...' }));

    expect(handleButtonClick).toHaveBeenCalled();
  });
});
