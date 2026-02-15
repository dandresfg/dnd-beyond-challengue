import { Character } from '../character/character.entity';

export interface ApplyDamageResult {
  tempHpLost: number;
  currentHpLost: number;
}

export class TempHpCalculator {
  /**
   * Apply damage to temp HP first, then current HP (D&D 5e rule).
   * Temp HP is always consumed before real HP.
   */
  static applyDamageToHp(
    character: Character,
    damage: number,
  ): ApplyDamageResult {
    let remainingDamage = damage;
    let tempHpLost = 0;
    let currentHpLost = 0;

    if (character.tempHp > 0) {
      tempHpLost = Math.min(character.tempHp, remainingDamage);
      character.tempHp -= tempHpLost;
      remainingDamage -= tempHpLost;
    }

    if (remainingDamage > 0) {
      currentHpLost = Math.min(character.currentHp, remainingDamage);
      character.currentHp = Math.max(0, character.currentHp - remainingDamage);
    }

    return { tempHpLost, currentHpLost };
  }

  /**
   * Add temporary HP (takes max, not additive - D&D 5e rule).
   * Returns previous temp HP value (for event payload).
   */
  static addTempHp(character: Character, amount: number): number {
    const previousTempHp = character.tempHp;
    character.tempHp = Math.max(character.tempHp, amount);
    return previousTempHp;
  }
}
