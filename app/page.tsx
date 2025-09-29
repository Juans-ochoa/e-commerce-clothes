'use client';

import FilterWithDebounce from '@/components/FilterWithDebounce';
import injection from '@/components/HOC/injection';
import requirement, { TRequiredProps } from '@/components/HOC/requirement';
import withErrorBoundary from '@/components/HOC/withErrorBoundary';
import VirtualListOne from '@/components/VirtualListOne';

type ProductInfoProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  title: string;
};

type TUserProps = {
  id: string;
  title: string;
};

const UserInfo = (data: TUserProps & TRequiredProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        {data.id} & {data.title}
      </h2>
      <p className="text-gray-600 mb-4">Role: {data.userRole}</p>
    </div>
  );
};

const UserPermission = requirement(UserInfo);

const ProductInfo = (data: ProductInfoProps) => {
  if (data.id === '1') {
    throw new Error(`Error procesando producto: ${data.name}`);
  }

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

const ProductWithErrorBoundary = withErrorBoundary({
  fallback: ({ error, resetError, hasRetry }) => (
    <div className="bg-red-100 p-4 rounded-lg shadow-md mt-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-2 text-red-800">Error</h2>
      <p className="text-red-600 mb-4">{error.message}</p>
      {hasRetry && (
        <button
          onClick={resetError}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  ),
  onError: (error, errorInfo) => {
    console.error('Logging error to service:', { error, errorInfo });
  },
  enableRetry: true,
})(ProductInfo); // withErrorBoundary({})(ProductInfo);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-600">Listado de productos</h1>
      <FilterWithDebounce />
      <ProductWithErrorBoundary
        description="This description will cause an error"
        id="1"
        name="Producto 1"
        price={12.0} // 👈 Esto causará error en .toFixed(2)
        inStock={true}
        title="Producto 1"
      />
      <UserPermission
        id="1"
        title="This user has a permission"
        isAuthenticated
        userRole="admin"
      />
      <ProductInfoWithInjection id="2" title="Producto 1" />
      <VirtualListOne
        itemCount={10000}
        viewportHeight={800}
        rowHeight={50}
        nodePadding={5}
      />
    </main>
  );
}
