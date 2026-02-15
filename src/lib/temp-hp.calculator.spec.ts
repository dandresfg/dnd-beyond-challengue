import { TempHpCalculator } from './temp-hp.calculator';
import { Character } from '../character/character.entity';

function createCharacter(currentHp: number, tempHp: number): Character {
  const character = new Character();
  character.currentHp = currentHp;
  character.tempHp = tempHp;
  return character;
}

describe('TempHpCalculator', () => {
  describe('applyDamageToHp', () => {
    it('should apply damage to temp HP first', () => {
      const character = createCharacter(25, 5);
      const result = TempHpCalculator.applyDamageToHp(character, 3);

      expect(character.tempHp).toBe(2);
      expect(character.currentHp).toBe(25);
      expect(result).toEqual({ tempHpLost: 3, currentHpLost: 0 });
    });

    it('should overflow damage to current HP after temp HP is depleted', () => {
      const character = createCharacter(25, 5);
      const result = TempHpCalculator.applyDamageToHp(character, 8);

      expect(character.tempHp).toBe(0);
      expect(character.currentHp).toBe(22);
      expect(result).toEqual({ tempHpLost: 5, currentHpLost: 3 });
    });

    it('should not reduce current HP below 0', () => {
      const character = createCharacter(25, 5);
      const result = TempHpCalculator.applyDamageToHp(character, 100);

      expect(character.tempHp).toBe(0);
      expect(character.currentHp).toBe(0);
      expect(result).toEqual({ tempHpLost: 5, currentHpLost: 25 });
    });

    it('should handle damage when no temp HP exists', () => {
      const character = createCharacter(25, 0);
      const result = TempHpCalculator.applyDamageToHp(character, 10);

      expect(character.currentHp).toBe(15);
      expect(result).toEqual({ tempHpLost: 0, currentHpLost: 10 });
    });

    it('should handle zero damage', () => {
      const character = createCharacter(25, 5);
      const result = TempHpCalculator.applyDamageToHp(character, 0);

      expect(character.tempHp).toBe(5);
      expect(character.currentHp).toBe(25);
      expect(result).toEqual({ tempHpLost: 0, currentHpLost: 0 });
    });
  });

  describe('addTempHp', () => {
    it('should keep higher value when existing temp HP is greater', () => {
      const character = createCharacter(25, 5);
      const previousTempHp = TempHpCalculator.addTempHp(character, 3);

      expect(character.tempHp).toBe(5);
      expect(previousTempHp).toBe(5);
    });

    it('should replace with higher value when new amount is greater', () => {
      const character = createCharacter(25, 5);
      const previousTempHp = TempHpCalculator.addTempHp(character, 10);

      expect(character.tempHp).toBe(10);
      expect(previousTempHp).toBe(5);
    });

    it('should set temp HP when character has none', () => {
      const character = createCharacter(25, 0);
      const previousTempHp = TempHpCalculator.addTempHp(character, 10);

      expect(character.tempHp).toBe(10);
      expect(previousTempHp).toBe(0);
    });
  });
});
