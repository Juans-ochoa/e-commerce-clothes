import { TKindStat, TPokemon, TStat } from '@/utils/pokemon-types';
import {
  IconBasket,
  IconPlaystationTriangle,
  IconRuler,
  IconWeight,
} from '@tabler/icons-react';
import Image from 'next/image';
import React, { JSX } from 'react';
import List from './List';
import Link from 'next/link';

const Pokemon = ({
  pokemon,
  className,
}: {
  pokemon: TPokemon;
  className?: string;
}) => {
  return (
    <Link href={`/pokemons/${pokemon.id}`}>
      <article
        className={`flex flex-col gap-2 bg-blue-50 h-fit w-full ${className} rounded-lg shadow-md shadow-blue-20`}
      >
        <picture className="flex flex-col gap-1">
          <div className="w-full rounded-lg">
            <Image
              src={pokemon.sprites.frontDefault}
              alt={pokemon.name}
              height={200}
              width={300}
            />
          </div>
          <h2 className="ml-6 text-lg text-blue-800 font-semibold">
            {pokemon.name}
          </h2>
        </picture>
        <div className="flex flex-col gap-1 p-6 bg-white rounded-lg">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <IconRuler className="h-4 w-4 mr-2" />
              <span className="text-sm text-blue-800">{pokemon.height}</span>
            </div>
            <div className="flex gap-1">
              <IconWeight className="h-4 w-4 mr-2" />
              <span className="text-sm text-blue-800">{pokemon.weight}</span>
            </div>
          </div>
          <div className="mt-3">
            <List
              className="flex flex-col gap-2"
              items={pokemon.stats}
              sourceName="stat"
              ComponentItem={Stat}
            />
          </div>
        </div>
      </article>
    </Link>
  );
};

type TStatComponent = ({ stat }: { stat: TStat }) => JSX.Element;

const Stat: TStatComponent = ({ stat }) => {
  return (
    <li className="flex flex-wrap gap-2">
      <span className="text-sm font-semibold text-blue-600">
        {stat.stat.name}
      </span>
      <div className="flex gap-1">
        <IconBasket className="h-4 w-4 text-orange-400" />
        <span
          className="text-sm text-gray-400
    "
        >
          {stat.baseStat}
        </span>
      </div>
      <div className="flex gap-1">
        <IconPlaystationTriangle className="w-4 h-4 text-blue-500" />
        <span
          className="text-sm text-gray-400
    "
        >
          {stat.effort}
        </span>
      </div>
    </li>
  );
};

export default Pokemon;
