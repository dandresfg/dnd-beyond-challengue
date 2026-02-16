import { ofetch } from 'ofetch';
import useSWR from 'swr';
import { Character } from '../types/character';

export const usePlayers = () => {
  const { data, isLoading, error } = useSWR<Character[]>('/characters', ofetch);
  return {
    players: data ?? [],
    isLoading,
    error,
  };
};
