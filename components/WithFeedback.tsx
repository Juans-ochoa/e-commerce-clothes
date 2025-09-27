import { ComponentType, JSX } from 'react';

type TPropsData<TData> = {
  data?: TData;
  error?: string;
  loading: boolean;
};

type TProps<TData, TComponent extends Record<string, unknown>> = {
  feedback: TPropsData<TData>;
  ComponentFeedback: ComponentType<TComponent & TData>;
};

type TWithFeedbackFn = <TData, TComponent extends Record<string, unknown>>(
  props: TProps<TData, TComponent>,
) => JSX.Element | ComponentType<TComponent>;

const WithFeedback: TWithFeedbackFn = <
  TData,
  TComponent extends Record<string, unknown>,
>({
  ComponentFeedback,
  feedback,
}: TProps<TData, TComponent>) => {
  const { loading, error, data } = feedback;

  return (props: TComponent) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error to fetch data, reason: {error}</p>;
    if (!loading && !error && !data) return <p>Data not found!</p>;

    const finalProps = { ...props, ...{ ...data } } as TComponent & TData;

    return <ComponentFeedback {...finalProps} />;
  };
};

export default WithFeedback;
