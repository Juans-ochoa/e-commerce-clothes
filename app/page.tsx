'use client';

import FilterWithDebounce from '@/components/FilterWithDebounce';
import injection from '@/components/HOC/injection';
import VirtualListOne from '@/components/VirtualListOne';

type ProductInfoProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  title: string;
};

const ProductInfo = (data: ProductInfoProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        {data.name} & {data.title}
      </h2>
      <p className="text-gray-600 mb-4">{data.description}</p>
      <p className="text-lg font-semibold text-gray-800">
        Precio: ${data.price?.toFixed(2)}
      </p>
      <p
        className={`mt-2 font-medium ${
          data.inStock ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {data.inStock ? 'En stock' : 'Agotado'}
      </p>
    </div>
  );
};

const ProductInfoWithInjection = injection(ProductInfo);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-600">Listado de productos</h1>
      <FilterWithDebounce />
      <ProductInfoWithInjection id="1" title="Producto 1" />
      <VirtualListOne
        itemCount={10000}
        viewportHeight={800}
        rowHeight={50}
        nodePadding={5}
      />
    </main>
  );
}
