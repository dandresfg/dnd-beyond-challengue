import { ofetch } from 'ofetch';

async function fetcher<T>(url: string): Promise<T> {
  return ofetch<T>(url, { baseURL: '' });
}

export interface Character {
  id: string;
  name: string;
  slug: string;
  level: number;
  hitPoints: number;
  currentHp: number;
  tempHp: number;
  classes: unknown[];
  stats: Record<string, number>;
  items: unknown[];
  defenses: unknown[];
  isAlive: boolean;
}

export const api = {
  getCharacters: (): Promise<Character[]> => fetcher('/characters'),
  getCharacter: (slug: string): Promise<Character> =>
    fetcher(`/characters/${slug}`),
};
