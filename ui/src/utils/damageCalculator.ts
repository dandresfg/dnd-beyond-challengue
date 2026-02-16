import { DamageType, DefenseType, ICharacter } from '@/types';

/**
 * Calculate effective damage based on D&D 5e rules:
 * - Immunity: 0 damage
 * - Resistance: Half damage (rounded down)
 * - Normal: Full damage
 */
export const calculateEffectiveDamage = (
    character: ICharacter,
    damageType: DamageType,
    rawDamage: number
): number => {
    const defenses = character.defenses || [];

    const hasImmunity = defenses.some(
        (d) => d.type === damageType && d.defense === DefenseType.IMMUNITY
    );
    if (hasImmunity) return 0;

    const hasResistance = defenses.some(
        (d) => d.type === damageType && d.defense === DefenseType.RESISTANCE
    );
    if (hasResistance) return Math.floor(rawDamage / 2);

    return rawDamage;
};

export const getDefenseStatus = (
    character: ICharacter,
    damageType: DamageType
): 'immune' | 'resistant' | 'normal' => {
    const defenses = character.defenses || [];

    if (defenses.some((d) => d.type === damageType && d.defense === DefenseType.IMMUNITY)) {
        return 'immune';
    }

    if (defenses.some((d) => d.type === damageType && d.defense === DefenseType.RESISTANCE)) {
        return 'resistant';
    }

    return 'normal';
};
