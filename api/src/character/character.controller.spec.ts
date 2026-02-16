import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterResponseDto } from './character.dto';
import { DamageType } from '../lib/types/damage.types';

describe('CharacterController', () => {
  let controller: CharacterController;
  let characterService: jest.Mocked<CharacterService>;

  const mockCharacter: CharacterResponseDto = {
    id: 'id-1',
    name: 'Briv',
    slug: 'briv',
    level: 5,
    hitPoints: 25,
    currentHp: 25,
    tempHp: 0,
    classes: [],
    stats: {
      strength: 15,
      dexterity: 12,
      constitution: 14,
      intelligence: 10,
      wisdom: 13,
      charisma: 8,
    },
    items: [],
    defenses: [],
    isAlive: true,
  };

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      getCharacter: jest.fn(),
      dealDamage: jest.fn(),
      heal: jest.fn(),
      addTempHp: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [{ provide: CharacterService, useValue: mockService }],
    }).compile();

    controller = module.get(CharacterController);
    characterService = module.get(CharacterService);
    jest.clearAllMocks();
  });

  describe('listCharacters', () => {
    it('should return list from service', async () => {
      characterService.findAll.mockResolvedValue([mockCharacter]);

      const result = await controller.listCharacters();

      expect(characterService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockCharacter]);
    });
  });

  describe('getCharacter', () => {
    it('should return character for valid slug', async () => {
      characterService.getCharacter.mockResolvedValue(mockCharacter);

      const result = await controller.getCharacter('briv');

      expect(characterService.getCharacter).toHaveBeenCalledWith('briv');
      expect(result).toEqual(mockCharacter);
    });

    it('should propagate NotFoundException', async () => {
      characterService.getCharacter.mockRejectedValue(
        new NotFoundException('Character "unknown" not found'),
      );

      await expect(controller.getCharacter('unknown')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('dealDamage', () => {
    it('should call service with slug, damageType and amount', async () => {
      characterService.dealDamage.mockResolvedValue(mockCharacter);

      const result = await controller.dealDamage('briv', {
        damageType: DamageType.FIRE,
        amount: 10,
      });

      expect(characterService.dealDamage).toHaveBeenCalledWith(
        'briv',
        DamageType.FIRE,
        10,
      );
      expect(result).toEqual(mockCharacter);
    });
  });

  describe('heal', () => {
    it('should call service with slug and amount', async () => {
      characterService.heal.mockResolvedValue(mockCharacter);

      const result = await controller.heal('briv', { amount: 5 });

      expect(characterService.heal).toHaveBeenCalledWith('briv', 5);
      expect(result).toEqual(mockCharacter);
    });
  });

  describe('addTempHp', () => {
    it('should call service with slug and amount', async () => {
      characterService.addTempHp.mockResolvedValue(mockCharacter);

      const result = await controller.addTempHp('briv', { amount: 10 });

      expect(characterService.addTempHp).toHaveBeenCalledWith('briv', 10);
      expect(result).toEqual(mockCharacter);
    });
  });
});
