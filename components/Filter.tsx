'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import Button from './Button';
import { FilterSearchparams } from '@/utils/types';

const Filter = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterSearchparams>({
    query: '',
    category: '',
  });

  const [isPending, startTransition] = useTransition();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (filter.query) params.append('query', filter.query);
      if (filter.category) params.append('category', filter.category);

      const queryString = params.toString();
      router.push(`products/?${queryString}`);
    });
  };

  return (
    <div className="w-full max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md my-2 flex justify-center">
      <div className="w-full max-w-2xl flex gap-1 items-center text-blue-900 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-search"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
        <input
          type="search"
          placeholder="Buscar productos..."
          className="w-full h-fit outline-transparent bg-transparent border-0"
          value={filter.query}
          onChange={handleInputChange}
          name="query"
        />
      </div>
      <div className="ml-4 w-full max-w-xs py-1">
        <select
          name="category"
          id="category"
          value={filter.category}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 outline-transparent bg-transparent w-full h-fit text-blue-900 "
        >
          <option value="">Todas las categorías</option>
          <option value="ropa">Ropa</option>
          <option value="calzado">Calzado</option>
          <option value="accesorios">Accesorios</option>
        </select>
      </div>
      <div className="ml-4 w-fit py-1">
        <Button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 h-10"
          onClick={handleFilter}
        >
          <span className="text-white font-semibold">Filtrar</span>
        </Button>
      </div>
    </div>
  );
};

export default Filter;
