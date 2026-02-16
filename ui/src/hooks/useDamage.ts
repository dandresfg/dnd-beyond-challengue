import { useState } from 'react';
import { DamageType } from '@/types';
import { API_BASE_URL } from '@/config/api';

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
            const response = await fetch(`${API_BASE_URL}/characters/${characterSlug}/damage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to apply damage');
            }

            const data = await response.json();
            return data;
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
