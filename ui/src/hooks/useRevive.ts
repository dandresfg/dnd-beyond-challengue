import { useState } from 'react';
import { Api } from '@/config/api';
import { mutatePlayer } from './useCharacter';

export const useRevive = (characterSlug: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const revive = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Api.post(
        `/characters/${characterSlug}/revive`,
        {},
      );
      mutatePlayer(characterSlug, response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    revive,
    isLoading,
    error,
  };
};
