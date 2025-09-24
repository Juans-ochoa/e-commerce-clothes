'use client';

import useDebounce from '@/hooks/useDebounce';
import React, { useEffect, useState } from 'react';

const FilterWithDebounce = () => {
  const [query, setQuery] = useState<string>('');
  const queryWithDebounce = useDebounce({
    query,
    time: 600,
  });

  useEffect(() => {
    console.log(queryWithDebounce);
  }, [queryWithDebounce]);

  return (
    <div className="flex gap-1">
      <div className="p-6 border-1 border-orange-200">
        <input
          className="border-transparent text-orange-700 ring-offset-transparent outline-transparent focus:outline-0"
          type="search"
          placeholder="Find something please..."
          onChange={(e) => setQuery(e.target.value)}
          name="query"
          id="query"
        />
      </div>
    </div>
  );
};

export default FilterWithDebounce;
