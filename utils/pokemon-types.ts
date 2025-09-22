export type TSprites = {
  frontDefault: string;
  backDefault: string;
};

export type TKindStat =
  | 'speed'
  | 'special-defense'
  | 'special-attack'
  | 'defense';

export type TStat = {
  baseStat: number;
  effort: number;
  stat: {
    name: TKindStat;
    url: string;
  };
};

export type TPokemon = {
  id: number;
  order: number;
  name: string;
  weight: number;
  height: number;
  sprites: TSprites;
  stats: TStat[];
  baseExperience: number;
};

export type TPokemonRequest = {
  id: number;
  order: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: TKindStat;
      url: string;
    };
  }[];
  base_experience: number;
};

export type TPokemonMinRes = { name: string; url: string };

export type TListPokemons = TPokemon[];

export type TResponsePokemons = {
  count: number;
  next?: string;
  previous?: string;
  results: TListPokemons;
};

export type TResponseFetchPokemons = {
  count: number;
  next?: string;
  previous?: string;
  results: TPokemonMinRes[];
};

export type TResponseFetch<T> = {
  success: boolean;
  data?: T;
  error?: Error;
};
