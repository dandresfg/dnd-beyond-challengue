import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { CharacterRepository } from './character.repository';
import { Character } from './character.entity';
import { CharacterEventNames } from '../events/character-event.dto';
import { DamageType } from '../lib/types/damage.types';

function createCharacter(overrides: Partial<Character> = {}): Character {
  const character = new Character();
  Object.assign(character, {
    id: 'id-1',
    name: 'Briv',
    slug: 'briv',
    level: 5,
    hitPoints: 25,
    currentHp: 25,
    tempHp: 0,
    classes: [],
    stats: {} as any,
    items: [],
    defenses: [],
    ...overrides,
  });
  return character;
}

describe('CharacterService', () => {
  let service: CharacterService;
  let characterRepository: jest.Mocked<CharacterRepository>;
  let eventEmitter: jest.Mocked<EventEmitter2>;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findBySlug: jest.fn(),
      save: jest.fn(),
    };
    const mockEventEmitter = {
      emit: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        { provide: CharacterRepository, useValue: mockRepository },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get(CharacterService);
    characterRepository = module.get(CharacterRepository);
    eventEmitter = module.get(EventEmitter2);

    jest.clearAllMocks();
  });

  describe('heal', () => {
    it('should throw BadRequestException when character is dead', async () => {
      const character = createCharacter({ currentHp: 0, hitPoints: 25 });
      characterRepository.findBySlug.mockResolvedValue(character);

      await expect(service.heal('briv', 10)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.heal('briv', 10)).rejects.toThrow(
        'Cannot heal a dead character',
      );

      expect(characterRepository.save).not.toHaveBeenCalled();
      expect(eventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should cap healing at max HP and emit HEALED with actual amount', async () => {
      const character = createCharacter({ currentHp: 20, hitPoints: 25 });
      characterRepository.findBySlug.mockResolvedValue(character);
      characterRepository.save.mockImplementation((c) =>
        Promise.resolve(c as Character),
      );

      const result = await service.heal('briv', 10);

      expect(character.currentHp).toBe(25);
      expect(result.currentHp).toBe(25);
      expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        CharacterEventNames.HEALED,
        expect.objectContaining({
          character,
          healAmount: 5,
        }),
      );
    });

    it('should not emit HEALED when already at max HP', async () => {
      const character = createCharacter({ currentHp: 25, hitPoints: 25 });
      characterRepository.findBySlug.mockResolvedValue(character);
      characterRepository.save.mockImplementation((c) =>
        Promise.resolve(c as Character),
      );

      await service.heal('briv', 10);

      expect(character.currentHp).toBe(25);
      expect(eventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when character does not exist', async () => {
      characterRepository.findBySlug.mockResolvedValue(null);

      await expect(service.heal('unknown', 10)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.heal('unknown', 10)).rejects.toThrow(
        'Character "unknown" not found',
      );
    });
  });

  describe('findAll', () => {
    it('should return all characters as DTOs', async () => {
      const characters = [
        createCharacter({ slug: 'briv' }),
        createCharacter({ id: 'id-2', name: 'Other', slug: 'other' }),
      ];
      characterRepository.find.mockResolvedValue(characters);

      const result = await service.findAll();

      expect(characterRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe('briv');
      expect(result[1].slug).toBe('other');
      expect(result[0].isAlive).toBe(true);
    });
  });

  describe('getCharacter', () => {
    it('should return character DTO when found', async () => {
      const character = createCharacter();
      characterRepository.findBySlug.mockResolvedValue(character);

      const result = await service.getCharacter('briv');

      expect(characterRepository.findBySlug).toHaveBeenCalledWith('briv');
      expect(result.slug).toBe('briv');
      expect(result.name).toBe('Briv');
      expect(result.isAlive).toBe(true);
    });

    it('should throw NotFoundException when not found', async () => {
      characterRepository.findBySlug.mockResolvedValue(null);

      await expect(service.getCharacter('unknown')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getCharacter('unknown')).rejects.toThrow(
        'Character "unknown" not found',
      );
    });
  });

  describe('dealDamage', () => {
    it('should apply damage, save, emit DAMAGED and return DTO', async () => {
      const character = createCharacter({ currentHp: 25, tempHp: 0 });
      characterRepository.findBySlug.mockResolvedValue(character);
      characterRepository.save.mockImplementation((c) =>
        Promise.resolve(c as Character),
      );

      const result = await service.dealDamage('briv', DamageType.FIRE, 10);

      expect(characterRepository.findBySlug).toHaveBeenCalledWith('briv');
      expect(characterRepository.save).toHaveBeenCalledWith(character);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        CharacterEventNames.DAMAGED,
        expect.objectContaining({
          character,
          damageType: DamageType.FIRE,
          rawDamage: 10,
          effectiveDamage: 10,
        }),
      );
      expect(result.currentHp).toBe(15);
      expect(result.isAlive).toBe(true);
    });

    it('should emit DIED when character reaches 0 HP', async () => {
      const character = createCharacter({ currentHp: 10, tempHp: 0 });
      characterRepository.findBySlug.mockResolvedValue(character);
      characterRepository.save.mockImplementation((c) =>
        Promise.resolve(c as Character),
      );

      await service.dealDamage('briv', DamageType.FIRE, 10);

      expect(eventEmitter.emit).toHaveBeenCalledWith(
        CharacterEventNames.DAMAGED,
        expect.any(Object),
      );
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        CharacterEventNames.DIED,
        expect.objectContaining({ character }),
      );
    });

    it('should throw NotFoundException when character does not exist', async () => {
      characterRepository.findBySlug.mockResolvedValue(null);

      await expect(
        service.dealDamage('unknown', DamageType.FIRE, 10),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('addTempHp', () => {
    it('should add temp HP, save and emit TEMP_HP_ADDED when value changes', async () => {
      const character = createCharacter({ tempHp: 0 });
      characterRepository.findBySlug.mockResolvedValue(character);
      characterRepository.save.mockImplementation((c) =>
        Promise.resolve(c as Character),
      );

      const result = await service.addTempHp('briv', 10);

      expect(character.tempHp).toBe(10);
      expect(characterRepository.save).toHaveBeenCalledWith(character);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        CharacterEventNames.TEMP_HP_ADDED,
        expect.objectContaining({
          character,
          previousTempHp: 0,
        }),
      );
      expect(result.tempHp).toBe(10);
    });

    it('should not emit TEMP_HP_ADDED when new value is lower than existing', async () => {
      const character = createCharacter({ tempHp: 15 });
      characterRepository.findBySlug.mockResolvedValue(character);
      characterRepository.save.mockImplementation((c) =>
        Promise.resolve(c as Character),
      );

      await service.addTempHp('briv', 10);

      expect(character.tempHp).toBe(15);
      expect(characterRepository.save).toHaveBeenCalled();
      expect(eventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when character does not exist', async () => {
      characterRepository.findBySlug.mockResolvedValue(null);

      await expect(service.addTempHp('unknown', 10)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
