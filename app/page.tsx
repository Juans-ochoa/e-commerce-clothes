'use client';

import FilterWithDebounce from '@/components/FilterWithDebounce';
import VirtualListOne from '@/components/VirtualListOne';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-600">Listado de productos</h1>
      <FilterWithDebounce />
      <VirtualListOne
        // renderItem={ <div>Item </div>}
        itemCount={10000}
        viewportHeight={800}
        rowHeight={50}
        nodePadding={5}
      />
    </main>
  );
}
