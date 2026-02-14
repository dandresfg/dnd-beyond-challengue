import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Character } from './character.entity';

@Injectable()
export class CharacterRepository extends Repository<Character> {
  constructor(private dataSource: DataSource) {
    super(Character, dataSource.createEntityManager());
  }

  /**
   * Find character by name
   */
  async findByName(name: string): Promise<Character | null> {
    return this.findOne({ where: { name } });
  }

  /**
   * Load character from JSON data
   */
  async loadFromJson(jsonData: any): Promise<Character> {
    const character = this.create({
      name: jsonData.name,
      level: jsonData.level,
      hitPoints: jsonData.hitPoints,
      currentHp: jsonData.hitPoints, // Initialize current HP to max
      tempHp: 0,
      classes: jsonData.classes,
      stats: jsonData.stats,
      items: jsonData.items || [],
      defenses: jsonData.defenses || [],
    });

    return this.save(character);
  }
}
