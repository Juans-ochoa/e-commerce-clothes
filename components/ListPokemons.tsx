import { fetchGetPokemons } from '@/lib/services/pokemons-service';
import React from 'react';
import List from './List';
import Pokemon from './Pokemon';
import { TListPokemons } from '@/utils/pokemon-types';
import { fetchGetDataPokemonsOptimized } from '@/lib/services/pokemons-optimized';

const ListPokemons = async () => {
  // const { success, data, error } = await fetchGetPokemons();
  const { success, data, error } = await fetchGetDataPokemonsOptimized();

  if (!success) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <List
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5"
      sourceName="pokemon"
      items={data?.results as TListPokemons}
      ComponentItem={Pokemon}
    />
  );
};

export default ListPokemons;
