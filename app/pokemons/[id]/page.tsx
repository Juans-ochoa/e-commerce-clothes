import Pokemon from '@/components/Pokemon';
import { fetchGetPokemonId } from '@/lib/services/pokemons-service';
import { TPokemon } from '@/utils/pokemon-types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = Promise<{ id: string }>;

async function getPokemon(id: string): Promise<TPokemon | null> {
  const { success, data } = await fetchGetPokemonId(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
  );

  if (success && data !== undefined) {
    return data as TPokemon;
  } else {
    return null;
  }
}

export async function generateStaticParams() {
  const ids = Array.from({ length: 151 }, (_, i) => i + 1); // IDs del 1 al 151
  return ids.map((id) => ({ id: id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Props;
}): Promise<Metadata> {
  const { id } = await params;

  const pokemon = await getPokemon(id);

  return {
    title: pokemon ? pokemon.name : 'Unknown Pokemon',
    description: `Details about ${pokemon ? pokemon.name : 'Unknown Pokemon'}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPokemon(id);

  if (!data) {
    notFound();
  }

  return (
    <div className="bg-red-50 w-full min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold p-4 text-red-600">
        Pokemon Detail: {id}
      </h1>

      <Pokemon pokemon={data} className="max-w-2xl min-w-full bg-red-400" />
    </div>
  );
}
