import { DamageCalculator } from './damage.calculator';
import { Character, IDefense } from '../character/character.entity';
import { DamageType, DefenseType } from './types/damage.types';

function createCharacter(defenses: IDefense[]): Character {
  const character = new Character();
  character.defenses = defenses;
  return character;
}

describe('DamageCalculator', () => {
  describe('calculateEffectiveDamage', () => {
    it('should return full damage when character has no defense', () => {
      const character = createCharacter([]);
      const result = DamageCalculator.calculateEffectiveDamage(
        character,
        DamageType.SLASHING,
        10,
      );
      expect(result).toBe(10);
    });

    it('should return half damage (rounded down) for resistance', () => {
      const character = createCharacter([
        { type: DamageType.FIRE, defense: DefenseType.RESISTANCE },
      ]);
      const result = DamageCalculator.calculateEffectiveDamage(
        character,
        DamageType.FIRE,
        10,
      );
      expect(result).toBe(5);
    });

    it('should return half damage for resistance with odd value', () => {
      const character = createCharacter([
        { type: DamageType.FIRE, defense: DefenseType.RESISTANCE },
      ]);
      const result = DamageCalculator.calculateEffectiveDamage(
        character,
        DamageType.FIRE,
        15,
      );
      expect(result).toBe(7);
    });

    it('should return 0 for immunity', () => {
      const character = createCharacter([
        { type: DamageType.POISON, defense: DefenseType.IMMUNITY },
      ]);
      const result = DamageCalculator.calculateEffectiveDamage(
        character,
        DamageType.POISON,
        100,
      );
      expect(result).toBe(0);
    });

    it('should return full damage when defense is for different type', () => {
      const character = createCharacter([
        { type: DamageType.FIRE, defense: DefenseType.RESISTANCE },
      ]);
      const result = DamageCalculator.calculateEffectiveDamage(
        character,
        DamageType.SLASHING,
        10,
      );
      expect(result).toBe(10);
    });

    it('should prefer immunity over resistance when both exist for same type (immunity first in list)', () => {
      const character = createCharacter([
        { type: DamageType.FIRE, defense: DefenseType.IMMUNITY },
        { type: DamageType.FIRE, defense: DefenseType.RESISTANCE },
      ]);
      const result = DamageCalculator.calculateEffectiveDamage(
        character,
        DamageType.FIRE,
        10,
      );
      expect(result).toBe(0);
    });
  });
});
