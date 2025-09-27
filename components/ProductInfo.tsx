import { TProduct } from '@/utils/types';
import React from 'react';

type Props = {
  data?: TProduct;
  error?: Error;
  loading: boolean;
};

const ProductInfo = ({ data, error, loading }: Props) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  return <div>ProductInfo: {JSON.stringify(data)}</div>;
};

export default ProductInfo;
