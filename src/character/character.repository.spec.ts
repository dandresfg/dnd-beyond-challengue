import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from './character.repository';
import { Character } from './character.entity';

describe('CharacterRepository', () => {
  let repository: CharacterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Character],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Character]),
      ],
      providers: [CharacterRepository],
    }).compile();

    repository = module.get(CharacterRepository);
  });

  describe('findByName', () => {
    it('should return null when no character exists', async () => {
      const result = await repository.findByName('Briv');
      expect(result).toBeNull();
    });

    it('should return character when found', async () => {
      await repository.loadFromJson({
        name: 'Briv',
        level: 5,
        hitPoints: 25,
        classes: [],
        stats: {},
        items: [],
        defenses: [],
      });
      const result = await repository.findByName('Briv');
      expect(result).not.toBeNull();
      expect(result?.name).toBe('Briv');
      expect(result?.slug).toBe('briv');
    });
  });

  describe('findBySlug', () => {
    it('should return null when no character exists', async () => {
      const result = await repository.findBySlug('briv');
      expect(result).toBeNull();
    });

    it('should return character when found by slug', async () => {
      await repository.loadFromJson({
        name: 'Briv',
        level: 5,
        hitPoints: 25,
        classes: [],
        stats: {},
        items: [],
        defenses: [],
      });
      const result = await repository.findBySlug('briv');
      expect(result).not.toBeNull();
      expect(result?.slug).toBe('briv');
    });
  });

  describe('loadFromJson', () => {
    it('should create and save character from JSON data', async () => {
      const jsonData = {
        name: 'Briv',
        level: 5,
        hitPoints: 25,
        classes: [],
        stats: {},
        items: [
          {
            name: 'Sword',
            modifier: {
              affectedObject: 'stats',
              affectedValue: 'strength',
              value: 1,
            },
          },
        ],
        defenses: [],
      };
      const result = await repository.loadFromJson(jsonData);

      expect(result.name).toBe('Briv');
      expect(result.slug).toBe('briv');
      expect(result.level).toBe(5);
      expect(result.hitPoints).toBe(25);
      expect(result.currentHp).toBe(25);
      expect(result.tempHp).toBe(0);
      expect(result.classes).toEqual([]);
      expect(result.items).toEqual(jsonData.items);
      expect(result.defenses).toEqual([]);
    });
  });
});
