import { TResponse } from '@/utils/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TFetch = <TData>(url: string) => Promise<TResponse<TData>>;

export const fetchApi: TFetch = async <TData>(url: string) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ERROR ${res.status} - ${res.statusText}`, {
        cause: {
          message: `${res.url} - ${res.type} - ${res.status} - ${res.statusText}`,
        },
      });
    }

    const data = (await res.json()) as TData;

    return {
      data,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error(`HTTP ERROR to fetch ${url}`),
    };
  }
};
