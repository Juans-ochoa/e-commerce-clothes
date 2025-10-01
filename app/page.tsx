'use client';

import FilterWithDebounce from '@/components/FilterWithDebounce';
import injection from '@/components/HOC/injection';
import requirement, { TRequiredProps } from '@/components/HOC/requirement';
import withErrorBoundary from '@/components/HOC/withErrorBoundary';
import VirtualListOne from '@/components/VirtualListOne';
import VirtualizedProductList from '@/components/ProductListExample';
import VirtualizedSimpleList from '@/components/SimpleVirtualizedList';
import { generateSampleProducts } from '@/lib/sample-data';
import { useState } from 'react';

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
  // Generar datos de ejemplo (5000 productos)
  const [products] = useState(() => generateSampleProducts(5000));
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Generar datos simples para el segundo ejemplo
  const [simpleItems] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      text: `Este es el elemento número ${i + 1} en la lista virtualizada`,
      color: `bg-${
        ['blue', 'green', 'yellow', 'purple', 'pink', 'indigo'][i % 6]
      }-100`,
    })),
  );

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    console.log('Producto seleccionado:', product);
  };

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
      {/* Ejemplo Simple del HOC */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🎯 Ejemplo Básico HOC - {simpleItems.length.toLocaleString()}{' '}
          Elementos
        </h2>

        <VirtualizedSimpleList items={simpleItems} />

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            💡 <strong>Demo:</strong> {simpleItems.length.toLocaleString()}{' '}
            elementos renderizados de forma eficiente. Solo los elementos
            visibles están en el DOM.
          </p>
        </div>
      </div>

      {/* Ejemplo Complejo del HOC withVirtualization */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📦 Ejemplo Complejo HOC - {products.length.toLocaleString()} Productos
        </h2>

        {selectedProduct && (
          <div className="mb-4 p-4 bg-green-100 rounded-lg">
            <p className="text-green-800">
              ✅ Producto seleccionado: <strong>{selectedProduct.name}</strong>{' '}
              - ${selectedProduct.price.toFixed(2)}
            </p>
          </div>
        )}

        <VirtualizedProductList
          items={products}
          onProductClick={handleProductClick}
        />

        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">
            🚀 Características del HOC:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              ✅ Virtualización de {products.length.toLocaleString()} elementos
            </li>
            <li>✅ Solo renderiza elementos visibles (~5-7 elementos)</li>
            <li>✅ Scroll suave y performante</li>
            <li>✅ Navegación programática (botones Inicio/Medio/Final)</li>
            <li>✅ TypeScript type-safe</li>
          </ul>
        </div>
      </div>

      {/* Lista original para comparación */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📋 Lista Original (para comparación)
        </h2>
        <VirtualListOne
          itemCount={1000}
          viewportHeight={400}
          rowHeight={50}
          nodePadding={5}
        />
      </div>
    </main>
  );
}
