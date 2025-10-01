import React, { ComponentType, JSX } from 'react';
import Loading from '../Loading';

type TLoadingProps = {
  loading?: boolean;
  loadingMessage?: string;
};

type TWithLoadingHoc = <T extends object>(
  Component: ComponentType<T>,
) => ComponentType<T & TLoadingProps>;

const withLoading: TWithLoadingHoc = <T extends object>(
  Component: ComponentType<T>,
) => {
  const Wrapper = ({
    loading,
    loadingMessage: message,
    ...restProps
  }: T & TLoadingProps): JSX.Element => {
    if (loading) {
      return (
        <Loading loading={loading} message={message ?? 'Loading...'}>
          <Loading.Spinner />
          <Loading.Message />
        </Loading>
      );
    }

    return <Component {...(restProps as T)} />;
  };

  // Agregar displayName para debugging
  Wrapper.displayName = `withLoading(${
    Component.displayName || Component.name || 'Component'
  })`;

  return Wrapper;
};

export default withLoading;
