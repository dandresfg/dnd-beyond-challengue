import { useState } from 'react';
import { Api } from '@/config/api';
import { mutatePlayer } from './useCharacter';

interface HealingPayload {
  amount: number;
}

export const useHealing = (characterSlug: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heal = async (payload: HealingPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Api.post(`/characters/${characterSlug}/heal`, {
        amount: payload.amount,
      });
      mutatePlayer(characterSlug, response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addTempHp = async (payload: HealingPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Api.post(`/characters/${characterSlug}/temp-hp`, {
        amount: payload.amount,
      });
      mutatePlayer(characterSlug, response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    heal,
    addTempHp,
    isLoading,
    error,
  };
};
