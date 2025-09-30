'use client';

import withVirtualization from './HOC/withVirtualization';

// Componente simple de lista
type SimpleItem = {
  id: number;
  text: string;
  color: string;
};

type SimpleListProps = {
  items: SimpleItem[];
  itemCount: number;
  scrollToIndex: (index: number) => void;
};

const SimpleList = ({ items, itemCount, scrollToIndex }: SimpleListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`p-4 m-2 rounded shadow-sm ${item.color} border`}
          style={{ height: '80px' }}
        >
          <div className="font-semibold">Item #{item.id}</div>
          <div className="text-sm text-gray-600">{item.text}</div>
        </div>
      ))}

      {/* Controles de navegación */}
      <div className="flex gap-2 p-4 bg-gray-50 rounded">
        <button
          onClick={() => scrollToIndex(0)}
          className="px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600"
        >
          Top
        </button>
        <button
          onClick={() => scrollToIndex(Math.floor(itemCount / 2))}
          className="px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600"
        >
          Middle
        </button>
        <button
          onClick={() => scrollToIndex(itemCount - 1)}
          className="px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600"
        >
          Bottom
        </button>
        <span className="ml-auto text-sm text-gray-600 px-3 py-1">
          Total: {itemCount} items
        </span>
      </div>
    </div>
  );
};

// Crear HOC virtualizado
const VirtualizedSimpleList = withVirtualization({
  itemHeight: 88, // 80px + 8px margin
  containerHeight: 400,
  nodePadding: 2,
})(SimpleList);

export default VirtualizedSimpleList;
