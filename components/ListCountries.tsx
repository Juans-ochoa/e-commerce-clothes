// 'use client';

import { fetchAllCountries } from '@/lib/services/countries-service';
import List from './List';
import { TCountry } from '@/utils/countries-types';
import Country from './Country';

const ListCountries = async () => {
  const data = await fetchAllCountries();

  return (
    <div className="mt-6">
      <List
        items={data as TCountry[]}
        sourceName="country"
        ComponentItem={Country}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
      />
    </div>
  );
};

export default ListCountries;
