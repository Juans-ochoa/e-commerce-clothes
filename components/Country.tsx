import { TCountry } from '@/utils/countries-types';
import { IconBuilding, IconFrame, IconGraph } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Country = ({ country }: { country: TCountry }) => {
  return (
    <Link href={`/countries/${country.name.common}`}>
      <div className="flex gap-2 h-fit bg-gradient-to-l from-green-900 to-green-600 shadow-sm shadow-green-100 rounded-2xl border-4 border-green-600">
        <div className="h-full">
          <Image
            src={country.flags.png}
            alt={country.flags.alt}
            width={200}
            height={150}
            className="h-full max-h-[120px] rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1 justify-star">
          <h3 className="text-xl text-green-200 font-semibold">
            {country.name.common}
          </h3>
          <h4 className="text-md text-green-400">
            Capital:&nbsp;
            <span className="text-green-200 text-sm">{country.capital[0]}</span>
          </h4>
          <p className="text-sm text-green-300">
            <IconFrame className="h-6 w-6 text-green-200 inline-block" />
            {country.area} 🧩
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Country;
