import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorBoundry } from '../components/ErrorBoundry';

const ThrowerDummy = () => {
  throw new Error('Error Dummy Thrown');
};

const NoErrorDummy = () => <div>No errors</div>;

describe('ErrorBoundry', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children without errors', () => {
    render(
      <ErrorBoundry>
        <NoErrorDummy />
      </ErrorBoundry>
    );
    expect(screen.getByText('No errors'));
  });

  it('shows fallback UI component when Error happens', () => {
    render(
      <ErrorBoundry>
        <ThrowerDummy />
      </ErrorBoundry>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('logs error to console', () => {
    render(
      <ErrorBoundry>
        <ThrowerDummy />
      </ErrorBoundry>
    );
    expect(errorSpy).toHaveBeenCalled();
  });

  it('resets App back to normal, when reset btn is being clicked', async () => {
    render(
      <ErrorBoundry>
        <ThrowerDummy />
      </ErrorBoundry>
    );

    await userEvent.click(screen.getByText(/reset/i));
    render(
      <ErrorBoundry>
        <NoErrorDummy />
      </ErrorBoundry>
    );
    expect(screen.getByText('No errors'));
  });
});
