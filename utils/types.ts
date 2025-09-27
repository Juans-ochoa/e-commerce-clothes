export type TProduct = {
  id: string | number;
  title: string;
  price: number;
  description?: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type TProducts = TProduct[];

export type FilterSearchparams = {
  query: string;
  category: string;
};

export type TResponse<TData> = {
  data?: TData;
  error?: Error;
  success: boolean;
};
