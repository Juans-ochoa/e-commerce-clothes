import { ComponentType, useEffect, useState } from 'react';

type TWithFetch = <T extends Record<string, unknown>>(
  url: string,
) => (Component: ComponentType<T>) => ComponentType<T>;

const withFetch: TWithFetch = (url) => {
  return <T extends Record<string, unknown>>(Component: ComponentType<T>) => {
    const WrapperComponent = (props: T) => {
      return <Component {...props} />;
    };

    return WrapperComponent;
  };
};

export default withFetch;
