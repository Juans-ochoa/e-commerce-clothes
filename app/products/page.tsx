import Filter from '@/components/Filter';
import ListProducts from '@/components/ListProducts';
import { FilterSearchparams } from '@/utils/types';
import { Suspense } from 'react';

export const revalidate = 60;

type PageProps = {
  searchParams?: Promise<{
    [k: string]: string | number | string[] | undefined;
  }>;
};

export default function Products(props: PageProps) {
  let { searchParams } = props;
  const filter: FilterSearchparams = { category: '', query: '' };

  (async () => {
    const params = await searchParams;
    filter.category = params?.category ? String(params.category) : 'all';
    filter.query = params?.query ? String(params.query) : '';
  })();

  const key = `${filter.category}-${filter.query}-${Date.now()}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10 bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-600">Listado de productos</h1>
      <Filter />
      <Suspense key={key} fallback={<ProductsSkeleton />}>
        <ListProducts filter={filter} />
      </Suspense>
    </main>
  );
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse w-2xs">
          <div className="bg-gray-300 h-64 w-full rounded-t-lg"></div>
          <div className="bg-white p-4 rounded-b-lg">
            <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-1/2 mb-2 rounded"></div>
            <div className="bg-gray-300 h-8 w-full rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
