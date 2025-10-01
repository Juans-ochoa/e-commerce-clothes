'use client';

import withLoading from './exercise-hoc/withLoading';

const Product = ({ name }: { name: string }) => {
  return <div className="text-blue-400">Product Page: {name}</div>;
};

const ProductWithLoading = withLoading(Product);

const TestWithLoading = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-fit p-4 bg-blue-100">
      <ProductWithLoading
        loading
        loadingMessage="Loading product..."
        name="Sample Product"
      />
      <ProductWithLoading loading name="Sample Product" />
    </div>
  );
};

export default TestWithLoading;
