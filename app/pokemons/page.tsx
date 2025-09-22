import ListPokemons from '@/components/ListPokemons';
import { Suspense } from 'react';

export default function PokemonsPage() {
  return (
    <main className="p-4 w-full max-h-full min-h-dvh bg-white">
      <h1 className="text-2xl  font-bold text-gray-800">pokemon's</h1>
      <section className="bg-blue-800 p-8 rounded-2xl mt-4">
        <Suspense fallback={<p>Loading pokemons...</p>}>
          <ListPokemons />
        </Suspense>
      </section>
    </main>
  );
}
