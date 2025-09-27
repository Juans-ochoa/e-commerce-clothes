import { FilterSearchparams, TProduct, TProducts } from '@/utils/types';
import { fetchApi } from '../utils';

type fetchProducts = (filter: FilterSearchparams) => Promise<TProducts>;

const BASE_ULR: string = 'https://fakestoreapi.com/products';

const fetchGetProducts: fetchProducts = async (filter) => {
  const res = await fetch(BASE_ULR, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
};

const getProductById = async (
  id: string | number,
): Promise<TProduct | Error> => {
  const { data, success, error } = await fetchApi<TProduct>(
    BASE_ULR + `/${id}`,
  );

  if (!success && !data)
    return new Error(error?.message || 'Error fetching product');

  return data as TProduct;
};

export { fetchGetProducts, getProductById };
