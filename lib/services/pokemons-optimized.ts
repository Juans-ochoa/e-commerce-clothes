import {
  TPokemon,
  TPokemonMinRes,
  TResponseFetchPokemons,
  TResponsePokemons,
} from '@/utils/pokemon-types';
import { fetchGetPokemonId } from './pokemons-service';

const TIMEOUT_MS = 10000;
const MAX_CONCURRENT_REQUESTS = 10;
const CACHE_EXPIRATION_MS = 5 * 60 * 1000; // 5 minutos
const MAX_CACHE_SIZE = 200;

const cachePokemons = new Map<string, { timestamp: number; data: TPokemon }>();

const clearCache = () => {
  const now = Date.now();

  for (const [key, { timestamp }] of cachePokemons) {
    if (now - timestamp > CACHE_EXPIRATION_MS) {
      cachePokemons.delete(key);
    }
  }
};

const getPokemonFromCache = (url: string): TPokemon | null => {
  const cached = cachePokemons.get(url);

  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > CACHE_EXPIRATION_MS) {
    cachePokemons.delete(url);
    return null;
  }

  return cached.data;
};

const setPokemonInCache = (url: string, data: TPokemon) => {
  if (cachePokemons.size >= MAX_CACHE_SIZE) {
    const firstKey = cachePokemons.keys().next().value;
    if (firstKey) {
      cachePokemons.delete(firstKey);
    }
  }

  cachePokemons.set(url, { timestamp: Date.now(), data });
};

const limitConcurrency = async <T, TItem>(
  items: T[],
  asyncFn: (item: T) => Promise<TItem>,
  limit: number,
): Promise<TItem[]> => {
  const results: any[] = [];

  for (let i = 0; i < items.length; i += limit) {
    const batch = items.slice(i, i + limit);
    const batchResults = await Promise.all(
      batch.map((item: T) => asyncFn(item as any)),
    );
    results.push(...batchResults);
  }

  return results;
};

type TFecthGetResponsePokemons = {
  data?: TResponsePokemons;
  error?: Error;
  success: boolean;
};

type FetchGetPokemonsFunc = () => Promise<TFecthGetResponsePokemons>;

export const fetchGetDataPokemonsOptimized: FetchGetPokemonsFunc = async () => {
  clearCache();

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

    if (!res.ok) {
      throw new Error(`HTTP ERROR ${res.status}: ${res.statusText}`);
    }

    const data = (await res.json()) as TResponseFetchPokemons;

    const list = await limitConcurrency<TPokemonMinRes, TPokemon | null>(
      data.results,
      async (pokemon: TPokemonMinRes) => {
        const cached = getPokemonFromCache(pokemon.url);

        if (cached) {
          return cached;
        }

        const res = await fetchGetPokemonId(pokemon.url);
        if (res.success && res.data !== undefined) {
          // Cache the fetched data
          setPokemonInCache(pokemon.url, res.data);

          return res.data;
        } else {
          console.error('Failed to fetch pokemon data');
          return null;
        }
      },
      MAX_CONCURRENT_REQUESTS,
    );

    return {
      success: true,
      data: { count: list.length, results: list.filter((pok) => pok !== null) },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Error to get data'),
    };
  }
};
