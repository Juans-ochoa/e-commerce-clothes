import React, { ComponentType, ReactElement } from 'react';

type TComponents<T = Record<string, unknown>> = {
  component: ComponentType<T>;
  loading: ComponentType;
  error: ComponentType<{ message: string }>;
  noData: ComponentType;
};

type TParams<T = Record<string, unknown>> = {
  data?: T;
  error?: string;
  loading: boolean;
};

interface TWithFullFeedbackFc {
  <T extends Record<string, unknown>>(components: TComponents<T>): (
    params: TParams<T>,
  ) => ReactElement;
}

const withFullFeedback: TWithFullFeedbackFc =
  <T extends Record<string, unknown>>({
    component: Component,
    error: Error,
    loading: Loading,
    noData: NoData,
  }: TComponents<T>) =>
  ({ data, error, loading }: TParams<T>): ReactElement => {
    if (loading) return <Loading />;
    if (error) return <Error message={error} />;
    if (
      !loading &&
      !error &&
      (!data || (typeof data === 'object' && Object.keys(data).length === 0))
    )
      return <NoData />;

    return <Component {...(data as T)} />;
  };

export default withFullFeedback;
