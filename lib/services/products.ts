import { FilterSearchparams, TProducts } from '@/utils/types';

type fetchProducts = (filter: FilterSearchparams) => Promise<TProducts>;

const fetchGetProducts: fetchProducts = async (filter) => {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
};

export { fetchGetProducts };
