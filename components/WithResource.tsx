import { TResponse } from '@/utils/types';
import { ComponentType, useEffect, useState } from 'react';
import WithFeedback from './WithFeedback';

type TProps<T extends Record<string, unknown>> = {
  Component: ComponentType<T>;
  callback: () => Promise<TResponse<T>>;
};

type TWithResource = <T extends Record<string, unknown>>(
  props: TProps<T>,
) => ComponentType<{}>;

const WithResource: TWithResource = <T extends Record<string, unknown>>({
  callback,
  Component,
}: TProps<T>) => {
  return (props: {}) => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(''); // Limpiar errores previos
        setData(undefined); // Limpiar data previa

        try {
          const { data, success, error } = await callback();

          if (success && data) {
            setData(data);
            setError(''); // Asegurar que no hay error
          } else if (!success && error) {
            setError(error.message);
            setData(undefined); // Asegurar que no hay data
          } else {
            setError('No se pudieron obtener los datos');
          }
        } catch (error) {
          setError('Error al intentar obtener los datos!');
          setData(undefined);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    const ComponentWithFeedback = WithFeedback<T, {}>({
      feedback: {
        data,
        loading,
        error,
      },
      ComponentFeedback: Component,
    }) as ComponentType<{}>;

    return <ComponentWithFeedback {...props} />;
  };
};

export default WithResource;
