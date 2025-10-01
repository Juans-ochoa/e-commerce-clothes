'use client';

import {
  createContext,
  HTMLAttributes,
  JSX,
  PropsWithChildren,
  useContext,
} from 'react';

type TProps = {
  loading: boolean;
  message: string;
};

const LoadingContext = createContext<TProps>({
  loading: false,
  message: '',
});

const Loading = ({
  loading,
  message = '',
  children,
}: TProps & PropsWithChildren): JSX.Element => {
  return (
    <LoadingContext.Provider value={{ loading, message }}>
      {children}
    </LoadingContext.Provider>
  );
};

const Message = (
  props: HTMLAttributes<HTMLParagraphElement>,
): JSX.Element | null => {
  const { message, loading } = useContext(LoadingContext);
  if (!loading && message === '') return null;
  return (
    <p className="text-md text-blue-600 font-semibold" {...props}>
      {message}
    </p>
  );
};

const Spinner = (
  props: HTMLAttributes<HTMLSpanElement>,
): JSX.Element | null => {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <span
      className="w-10 h-10 border-4 border-t-blue-800 border-gray-300 rounded-full animate-spin"
      {...props}
    />
  );
};

Loading.Spinner = Spinner;
Loading.Message = Message;

export default Loading;
