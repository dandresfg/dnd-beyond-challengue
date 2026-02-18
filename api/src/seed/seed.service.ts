import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CharacterRepository } from '../character/character.repository';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly characterRepository: CharacterRepository) {}

  async onModuleInit() {
    try {
      const existing = await this.characterRepository.findByName('Briv');
      if (existing) return;

      const brivPath = path.join(process.cwd(), 'briv.json');
      const brivData = JSON.parse(fs.readFileSync(brivPath, 'utf-8'));

      await this.characterRepository.loadFromJson(brivData);
      this.logger.log('Seeding from briv.json');
    } catch (error) {
      this.logger.error('Failed to seed character data', error);
      throw error;
    }
  }
}
