import { TCountry } from '@/utils/countries-types';
import { fetchApi } from '../utils';

const BASE_URL = 'https://restcountries.com/v3.1';

type TFieldsCountry =
  | 'name'
  | 'flags'
  | 'area'
  | 'maps'
  | 'region'
  | 'capital'
  | 'ccn3';

type TCountryMassive = Pick<TCountry, TFieldsCountry>;

export const fetchAllCountries = async () => {
  const url: string =
    BASE_URL + '/all?fields=name,ccn3,flags,capital,area,maps,region,capital,';

  const { success, error, data } = await fetchApi<TCountryMassive[]>(url);

  if (!success && error !== undefined) {
    return error;
  }

  if (data === undefined) return [];

  return data;
};

export const fetchCountryByName = async (name: string) => {
  const url = BASE_URL + `/name/${name}`;

  const { success, error, data } = await fetchApi<TCountry[]>(url);

  if (data === undefined) return null;

  return data[0];
};
