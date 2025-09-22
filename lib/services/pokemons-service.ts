import {
  TKindStat,
  TListPokemons,
  TPokemon,
  TPokemonMinRes,
  TPokemonRequest,
  TResponseFetch,
  TResponseFetchPokemons,
  TResponsePokemons,
} from '@/utils/pokemon-types';

type TFetchPokemons = () => Promise<TResponseFetch<TResponsePokemons>>;

const list: TListPokemons = [
  {
    baseExperience: 64,
    height: 7,
    id: 1,
    name: 'bulbasaur',
    order: 1,
    sprites: {
      backDefault:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',

      frontDefault:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    stats: [
      {
        baseStat: 45,
        effort: 0,
        stat: {
          name: 'hp' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
      {
        baseStat: 49,
        effort: 0,
        stat: {
          name: 'attack' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/2/',
        },
      },
      {
        baseStat: 49,
        effort: 0,
        stat: {
          name: 'defense' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/3/',
        },
      },
      {
        baseStat: 65,
        effort: 1,
        stat: {
          name: 'special-attack' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        baseStat: 65,
        effort: 0,
        stat: {
          name: 'special-defense' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        baseStat: 45,
        effort: 0,
        stat: {
          name: 'speed' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/6/',
        },
      },
    ],
    weight: 69,
  },
  {
    baseExperience: 64,
    height: 7,
    id: 1,
    name: 'bulbasaur',
    order: 1,
    sprites: {
      backDefault:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',

      frontDefault:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    stats: [
      {
        baseStat: 45,
        effort: 0,
        stat: {
          name: 'hp' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
      {
        baseStat: 49,
        effort: 0,
        stat: {
          name: 'attack' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/2/',
        },
      },
      {
        baseStat: 49,
        effort: 0,
        stat: {
          name: 'defense' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/3/',
        },
      },
      {
        baseStat: 65,
        effort: 1,
        stat: {
          name: 'special-attack' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        baseStat: 65,
        effort: 0,
        stat: {
          name: 'special-defense' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        baseStat: 45,
        effort: 0,
        stat: {
          name: 'speed' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/6/',
        },
      },
    ],
    weight: 69,
  },
  {
    baseExperience: 64,
    height: 7,
    id: 1,
    name: 'bulbasaur',
    order: 1,
    sprites: {
      backDefault:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',

      frontDefault:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    stats: [
      {
        baseStat: 45,
        effort: 0,
        stat: {
          name: 'hp' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
      {
        baseStat: 49,
        effort: 0,
        stat: {
          name: 'attack' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/2/',
        },
      },
      {
        baseStat: 49,
        effort: 0,
        stat: {
          name: 'defense' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/3/',
        },
      },
      {
        baseStat: 65,
        effort: 1,
        stat: {
          name: 'special-attack' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        baseStat: 65,
        effort: 0,
        stat: {
          name: 'special-defense' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        baseStat: 45,
        effort: 0,
        stat: {
          name: 'speed' as TKindStat,
          url: 'https://pokeapi.co/api/v2/stat/6/',
        },
      },
    ],
    weight: 69,
  },
];

export const fetchGetPokemons: TFetchPokemons = async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {
      method: 'GET',
    });

    if (res.ok) {
      const data = (await res.json()) as TResponseFetchPokemons;

      const responsePokemons = data.results.map(async (pok: TPokemonMinRes) => {
        const res = await fetchGetPokemonId(pok.url);
        if (res.success && res.data !== undefined) {
          return res.data;
        } else {
          return null;
        }
      });

      const listPokemons = await Promise.all(responsePokemons);

      return {
        success: true,
        data: {
          count: listPokemons.length,
          results: listPokemons.filter((pok) => pok !== null),
        },
      };
    } else {
      return {
        success: false,
        error: new Error('Error al obtener los datos'),
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred'),
    };
  }
};

type FetchGetPokemon = (url: string) => Promise<TResponseFetch<TPokemon>>;

export const fetchGetPokemonId: FetchGetPokemon = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        error: new Error(
          `Error to get pokemon: ${res.status}-${res.statusText}`,
        ),
        success: false,
      };
    }

    const data = (await res.json()) as TPokemonRequest;

    return {
      success: true,
      data: {
        id: data.id,
        height: data.height,
        weight: data.weight,
        name: data.name,
        baseExperience: data.base_experience,
        order: data.order,
        sprites: {
          backDefault: data.sprites.back_default,
          frontDefault: data.sprites.front_default,
        },
        stats: data.stats.map((stat) => ({
          baseStat: stat.base_stat,
          effort: stat.effort,
          stat: {
            name: stat.stat.name,
            url: stat.stat.url,
          },
        })),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(`Error unexpected`),
    };
  }
};
