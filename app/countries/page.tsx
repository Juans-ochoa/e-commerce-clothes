import ListCountries from '@/components/ListCountries';
import { fetchAllCountries } from '@/lib/services/countries-service';

export default function CountriesPage() {
  return (
    <main className="bg-green-50 p-8 m-4 w-full max-w-6xl mx-auto flex flex-col gap-4 rounded-2xl ">
      <h1 className="text-4xl text-green-800 font-bold font-mono">
        List of countries
      </h1>
      <ListCountries />
    </main>
  );
}
