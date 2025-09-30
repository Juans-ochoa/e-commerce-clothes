'use client';

import { ComponentType } from 'react';
import withVirtualization from './HOC/withVirtualization';

// Tipo para los datos del producto
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
};

// Props del componente de lista (sin las props del HOC)
type BaseProductListProps = {
  onProductClick?: (product: Product) => void;
};

// Props completas incluyendo las del HOC
type ProductListProps = BaseProductListProps & {
  items: Product[];
  itemCount: number;
  scrollToIndex: (index: number) => void;
};

// Componente base de lista de productos
const ProductList: ComponentType<ProductListProps> = ({
  items,
  itemCount,
  scrollToIndex,
  onProductClick,
}) => {
  return (
    <div className="space-y-2">
      {items.map((product, index) => (
        <div
          key={product.id}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onProductClick?.(product)}
        >
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>
            <p
              className={`text-sm ${
                product.inStock ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {product.inStock ? 'En stock' : 'Agotado'}
            </p>
          </div>
        </div>
      ))}

      {/* Información de navegación */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          Mostrando {items.length} de {itemCount} productos
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => scrollToIndex(0)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ir al inicio
          </button>
          <button
            onClick={() => scrollToIndex(Math.floor(itemCount / 2))}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ir al medio
          </button>
          <button
            onClick={() => scrollToIndex(itemCount - 1)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ir al final
          </button>
        </div>
      </div>
    </div>
  );
};

// Aplicar el HOC de virtualización
const VirtualizedProductList = withVirtualization({
  itemHeight: 100, // Altura de cada producto
  containerHeight: 500, // Altura del contenedor
  nodePadding: 3, // Padding para elementos fuera de vista
})<Product, BaseProductListProps & { items: Product[] }>(ProductList);

export default VirtualizedProductList;
