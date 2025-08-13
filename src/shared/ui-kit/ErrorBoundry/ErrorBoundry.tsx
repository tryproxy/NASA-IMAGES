import React from 'react';
import type { ErrorInfo } from 'react-dom/client';
import { ErrorButton } from './ErrorButton';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: string;
};

export class ErrorBoundry extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
    };
  }

  static getDerivedStateFromError = (_: Error): State => ({ hasError: true });

  componentDidCatch = (e: Error, info: ErrorInfo): void => {
    this.setState({ error: e.message });
    console.error('ErrorBoundry', e, info);
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return (
      <>
        {hasError ? (
          <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-900 font-mono text-2xl font-bold text-red-400">
            <p className="flex">Something went wrong</p>
            <p className="flex">Error details: {this.state.error}</p>
            <ErrorButton
              text="Reset"
              onClick={() => this.setState({ hasError: false })}
            />
          </div>
        ) : (
          children
        )}
      </>
    );
  }
}
