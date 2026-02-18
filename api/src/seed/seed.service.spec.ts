import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import { SeedService } from './seed.service';
import { CharacterRepository } from '../character/character.repository';
import { Character } from '../character/character.entity';

jest.mock('fs');
jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: jest.fn((...args: string[]) => args.join('/')),
}));

describe('SeedService', () => {
  let service: SeedService;
  let characterRepository: jest.Mocked<CharacterRepository>;

  const mockBrivData = {
    name: 'Briv',
    level: 5,
    hitPoints: 25,
    classes: [],
    stats: {},
    items: [],
    defenses: [],
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    (path.join as jest.Mock).mockReturnValue('/cwd/briv.json');
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify(mockBrivData),
    );

    const mockRepository = {
      findByName: jest.fn(),
      loadFromJson: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        { provide: CharacterRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(SeedService);
    characterRepository = module.get(CharacterRepository);
  });

  it('should skip seeding when character already exists', async () => {
    characterRepository.findByName.mockResolvedValue({
      name: 'Briv',
    } as Character);

    await service.onModuleInit();

    expect(characterRepository.findByName).toHaveBeenCalledWith('Briv');
    expect(fs.readFileSync).not.toHaveBeenCalled();
    expect(characterRepository.loadFromJson).not.toHaveBeenCalled();
  });

  it('should load from briv.json and seed when character does not exist', async () => {
    characterRepository.findByName.mockResolvedValue(null);
    characterRepository.loadFromJson.mockResolvedValue({} as Character);

    await service.onModuleInit();

    expect(characterRepository.findByName).toHaveBeenCalledWith('Briv');
    expect(path.join).toHaveBeenCalledWith(process.cwd(), 'briv.json');
    expect(fs.readFileSync).toHaveBeenCalledWith('/cwd/briv.json', 'utf-8');
    expect(characterRepository.loadFromJson).toHaveBeenCalledWith(mockBrivData);
  });

  it('should throw and log when loadFromJson fails', async () => {
    characterRepository.findByName.mockResolvedValue(null);
    characterRepository.loadFromJson.mockRejectedValue(new Error('DB error'));

    await expect(service.onModuleInit()).rejects.toThrow('DB error');
    expect(characterRepository.loadFromJson).toHaveBeenCalled();
  });

  it('should throw when briv.json is missing or invalid', async () => {
    characterRepository.findByName.mockResolvedValue(null);
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('ENOENT');
    });

    await expect(service.onModuleInit()).rejects.toThrow('ENOENT');
  });
});
