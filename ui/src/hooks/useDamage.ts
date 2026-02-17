import { useState } from 'react';
import { DamageType } from '@/types';
import { Api } from '@/config/api';
import { mutatePlayer } from './useCharacter';

interface DamagePayload {
  damageType: DamageType;
  amount: number;
}

export const useDamage = (characterSlug: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyDamage = async (payload: DamagePayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Api.post(`/characters/${characterSlug}/damage`, {
        damageType: payload.damageType,
        amount: payload.amount,
      });
      mutatePlayer(characterSlug, response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    applyDamage,
    isLoading,
    error,
  };
};
