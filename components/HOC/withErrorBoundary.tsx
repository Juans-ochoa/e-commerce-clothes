import { ComponentType } from 'react';
import ErrorBoundaryApp, { TConfigError } from '../ErrorBoundaryApp';

type TWithErrorBoundaryFc = (
  config: TConfigError,
) => <T extends object>(
  WrappedComponent: ComponentType<T>,
) => React.ComponentType<T>;

const withErrorBoundary: TWithErrorBoundaryFc =
  (config) =>
  <T extends object>(WrappedComponent: ComponentType<T>) => {
    return (props: T) => {
      return (
        <ErrorBoundaryApp {...config}>
          <WrappedComponent {...props} />
        </ErrorBoundaryApp>
      );
    };
  };

export default withErrorBoundary;
