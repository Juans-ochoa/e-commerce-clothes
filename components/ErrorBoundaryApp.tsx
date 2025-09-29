'use client';

import React, { ComponentType } from 'react';

export type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
  hasRetry: boolean;
};

export type TConfigError = {
  fallback?: ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  enableRetry?: boolean;
  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundaryApp extends React.Component<TConfigError, State> {
  constructor(props: TConfigError) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error({ error, errorInfo });
    this.props.onError?.(error, errorInfo); // 👈 Llamar callback si existe
  }

  render(): React.ReactNode {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback && this.state.error) {
      const FallbackComponent = this.props.fallback;

      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          hasRetry={this.props.enableRetry || false}
        />
      );
    }

    return (
      <div className="error-boundary">
        <h2>Something went wrong.</h2>
      </div>
    );
  }
}

export default ErrorBoundaryApp;
