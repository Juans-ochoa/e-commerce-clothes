import Image from 'next/image';
import React, { JSX } from 'react';
import Button from './Button';
import { TProduct } from '@/utils/types';
import Link from 'next/link';
import { IconCarambola, IconCarambolaFilled } from '@tabler/icons-react';

const Product = ({
  product,
  className,
}: {
  product: TProduct;
  className?: string;
}) => {
  const { title, category, image, price, description, rating } = product;

  const renderStars = (rate: number) => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rate);

    for (let i = 0; i < 5; i++) {
      const start =
        i < fullStars ? (
          <IconCarambolaFilled key={i} className="text-amber-300 h-5 w-5" />
        ) : (
          <IconCarambola
            stroke={2}
            key={i}
            className="text-amber-300 h-5 w-5"
          />
        );
      stars.push(start);
    }
    return stars;
  };

  return (
    <Link href={`/products/${product.id}`}>
      <article
        className={`flex flex-col gap-2 rounded-lg shadow-md shadow-blue-20 bg-blue-100 w-full max-h-fit ${className}`}
      >
        <div className="rounded-t-lg ratio-3/2 relative w-full h-fit">
          <Image
            className="rounded-t-lg hover:scale-105 hover:rounded-lg transition-all object-cover transition-duration-300 ease-linear"
            src={image}
            alt={title}
            width={400}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-1 p-3">
          <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
          <p className="text-md text-blue-800">
            Category:{' '}
            <span className="text-sm text-blue-500 font-semibold">
              {category}
            </span>
          </p>

          {/* Rating Section */}
          <div className="flex items-center gap-2 my-1">
            <div className="flex items-center">{renderStars(rating.rate)}</div>
            <span className="text-sm text-blue-600 font-medium">
              {rating.rate}
            </span>
            <span className="text-xs text-blue-500">
              ({rating.count} reviews)
            </span>
          </div>

          <p className="text-sm text-blue-700 line-clamp-2">{description}</p>
        </div>
        <div className="flex p-3 items-center justify-between">
          <p className="text-lg font-semibold text-blue-600">€{price}</p>
          <div>
            <Button className="bg-transparent">
              <span className="text-blue-900 font-semibold">Add</span>
            </Button>
            <Button className="ml-2 bg-transparent">
              <span className="text-blue-900 font-semibold">View details</span>
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Product;
