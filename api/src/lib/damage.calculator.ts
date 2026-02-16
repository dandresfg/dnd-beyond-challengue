import { Character, IDefense } from '../character/character.entity';
import { DamageType, DefenseType } from './types/damage.types';

export class DamageCalculator {
  /**
   * Calculate effective damage based on D&D 5e rules:
   * - Immunity: 0 damage
   * - Resistance: Half damage (rounded down)
   * - Normal: Full damage
   */
  static calculateEffectiveDamage(
    character: Character,
    damageType: DamageType,
    rawDamage: number,
  ): number {
    const defenses = character.defenses || [];

    const hasImmunity = defenses.some(
      (d: IDefense) =>
        d.type === damageType && d.defense === DefenseType.IMMUNITY,
    );
    if (hasImmunity) return 0;

    const hasResistance = defenses.some(
      (d: IDefense) =>
        d.type === damageType && d.defense === DefenseType.RESISTANCE,
    );
    if (hasResistance) return Math.floor(rawDamage / 2);

    return rawDamage;
  }
}
