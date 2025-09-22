import { TProduct } from '@/utils/types';
import { IconCarambola, IconCarambolaFilled } from '@tabler/icons-react';

type PageProps = {
  params: Promise<{ id: string }>;
};

const product: TProduct = {
  id: 1,
  title: 'Camiseta Básica Blanca',
  price: 29.99,
  description:
    'Camiseta de algodón 100% orgánico, perfecta para el uso diario. Corte regular y máxima comodidad.',
  category: 'Camisetas',
  image:
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=600&fit=crop&auto=format',
  rating: {
    rate: 4.5,
    count: 120,
  },
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="flex h-dvh flex-col items-center justify-start p-10 bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-600">Product ID: {id}</h1>
      <section className="flex gap-4 mt-5 w-full max-w-2xl p-5 bg-white rounded-lg shadow-md">
        <div className="rounded-lg ratio-3/4 w-2xs relative">
          <img
            className="rounded-lg object-cover"
            src={product.image}
            alt={product.title}
            width={300}
            height={400}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-blue-900 mb-2">
            {product.title}
          </h2>
          <p className="text-md text-blue-500 font-bold">{product.category}</p>
          <p className="text-md text-blue-800">{product.description}</p>
          <div className="flex justify-between">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const full: boolean = Math.floor(product.rating.rate) > i;

                return full ? (
                  <IconCarambolaFilled
                    key={i}
                    className="text-amber-300 h-6 w-6"
                  />
                ) : (
                  <IconCarambola
                    stroke={2}
                    key={i}
                    className="text-amber-300 h-6 w-6"
                  />
                );
              })}

              <span className="text-yellow-500 font-semibold ">
                {product.rating.rate}
              </span>
            </div>
            <p className="text-yellow-500 font-semibold">
              {product.rating.count}
            </p>
          </div>
          <p className="text-xl font-bold text-blue-600">{product.price} €</p>
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-full active:scale-75 transition-all duration-300 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}


