import { Character, generateSlug } from './character.entity';

describe('Character entity and generateSlug', () => {
  describe('generateSlug', () => {
    it('should lowercase and hyphenate name', () => {
      expect(generateSlug('Briv')).toBe('briv');
      expect(generateSlug('Gandalf the Grey')).toBe('gandalf-the-grey');
    });

    it('should remove special characters', () => {
      expect(generateSlug("O'Brien")).toBe('obrien');
      expect(generateSlug('Hero (legendary)')).toBe('hero-legendary');
    });

    it('should collapse multiple hyphens and trim', () => {
      expect(generateSlug('  multiple   spaces  ')).toBe('multiple-spaces');
      expect(generateSlug('a--b')).toBe('a-b');
    });
  });

  describe('Character getStat', () => {
    it('should return base stat when no items affect it', () => {
      const character = new Character();
      character.stats = {
        strength: 15,
        dexterity: 12,
        constitution: 14,
        intelligence: 10,
        wisdom: 13,
        charisma: 8,
      };
      character.items = [];

      expect(character.getStat('strength')).toBe(15);
      expect(character.getStat('dexterity')).toBe(12);
    });

    it('should add item modifier when item affects stat', () => {
      const character = new Character();
      character.stats = {
        strength: 15,
        dexterity: 12,
        constitution: 14,
        intelligence: 10,
        wisdom: 13,
        charisma: 8,
      };
      character.items = [
        {
          name: 'Gauntlets',
          modifier: {
            affectedObject: 'stats',
            affectedValue: 'strength',
            value: 2,
          },
        },
      ];

      expect(character.getStat('strength')).toBe(17);
      expect(character.getStat('dexterity')).toBe(12);
    });

    it('should handle missing items as empty array', () => {
      const character = new Character();
      character.stats = {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      };
      (character as any).items = undefined;

      expect(character.getStat('strength')).toBe(10);
    });
  });

  describe('Character getStatModifier', () => {
    it('should return floor((stat - 10) / 2)', () => {
      const character = new Character();
      character.stats = {
        strength: 15,
        dexterity: 12,
        constitution: 14,
        intelligence: 10,
        wisdom: 8,
        charisma: 8,
      };
      character.items = [];

      expect(character.getStatModifier('strength')).toBe(2);
      expect(character.getStatModifier('dexterity')).toBe(1);
      expect(character.getStatModifier('intelligence')).toBe(0);
      expect(character.getStatModifier('wisdom')).toBe(-1);
    });
  });
});
