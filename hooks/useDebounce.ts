import { useEffect, useState } from 'react';

type Params = {
  time?: number;
  query: string;
};

const useDebounce = ({ time = 300, query }: Params) => {
  const [value, setValue] = useState<string>(query);

  useEffect(() => {
    const idTimeout = setTimeout(() => setValue(query), time);

    return () => {
      clearTimeout(idTimeout);
    };
  }, [query]);

  return value;
};

export default useDebounce;
