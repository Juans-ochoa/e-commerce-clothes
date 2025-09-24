import {
  fetchAllCountries,
  fetchCountryByName,
} from '@/lib/services/countries-service';
import { TCountry } from '@/utils/countries-types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 120;

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  const data = await fetchCountryByName(name);

  return {
    title: data?.name.common,
    description: `this is a country ${data?.name.official}, with area of ${data?.area}`,
  };
}

export const generateStaticParams = async () => {
  const countries = (await fetchAllCountries()) as TCountry[];

  return countries.map((country) => ({ name: country.name.common }));
};

export default async function Page({ params }: Props) {
  const { name } = await params;

  const date = new Date().toLocaleString();

  const data = await fetchCountryByName(name);

  if (data === null) return notFound();

  return (
    <main className="flex flex-col gap-4 max-w-6xl mx-auto m-8 p-8 rounded-2xl bg-gradient-to-bl from-0% to-100% from-violet-400 to-violet-800">
      <h1 className="text-6xl text-violet-200 font-semibold">
        {data.name.common} -- {date}
      </h1>
      <div className="flex flex-col gap-3 p-4 items-center">
        <Image
          src={data.flags.svg}
          width={400}
          height={400}
          className="rounded-xl"
          alt={data.flags.alt}
        />
        <div className="flex flex-col gap-2 items-start w-2xl bg-violet-900 p-4 rounded-xl">
          <h2 className="text-3xl font-semibold text-violet-100">
            {data.capital}
          </h2>
          <p>currency</p>
          <p>{data.timezones}</p>
        </div>
      </div>
    </main>
  );
}
