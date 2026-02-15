import { Injectable, NotFoundException } from '@nestjs/common';
import { CharacterRepository } from './character.repository';
import { CharacterResponseDto } from './character.dto';
import { Character } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async findAll(): Promise<CharacterResponseDto[]> {
    const characters = await this.characterRepository.find();
    return characters.map((c) => this.toDto(c));
  }

  async getCharacter(slug: string): Promise<CharacterResponseDto> {
    const character = await this.characterRepository.findBySlug(slug);

    if (!character) {
      throw new NotFoundException(`Character "${slug}" not found`);
    }

    return this.toDto(character);
  }

  async dealDamage(
    slug: string,
    damageType: string,
    amount: number,
  ): Promise<CharacterResponseDto> {
    const character = await this.characterRepository.findBySlug(slug);

    if (!character) {
      throw new NotFoundException(`Character "${slug}" not found`);
    }

    // TODO Phase 6: Calculate effective damage (resistance/immunity)
    // TODO Phase 6: Apply to temp HP first, then current HP
    // TODO Phase 6: Emit CharacterDamagedEvent
    // TODO Phase 6: Check if character died and emit CharacterDiedEvent

    // Naive implementation for now - just subtract from currentHp
    const effectiveDamage = amount;
    character.currentHp = Math.max(0, character.currentHp - effectiveDamage);

    await this.characterRepository.save(character);

    return this.toDto(character);
  }

  async heal(slug: string, amount: number): Promise<CharacterResponseDto> {
    const character = await this.characterRepository.findBySlug(slug);

    if (!character) {
      throw new NotFoundException(`Character "${slug}" not found`);
    }

    // TODO Phase 6: Emit CharacterHealedEvent

    // Healing cannot exceed max HP
    character.currentHp = Math.min(
      character.hitPoints,
      character.currentHp + amount,
    );

    await this.characterRepository.save(character);

    return this.toDto(character);
  }

  async addTempHp(slug: string, amount: number): Promise<CharacterResponseDto> {
    const character = await this.characterRepository.findBySlug(slug);

    if (!character) {
      throw new NotFoundException(`Character "${slug}" not found`);
    }

    // TODO Phase 6: Emit TempHpAddedEvent

    // Temp HP takes the maximum value, not additive
    character.tempHp = Math.max(character.tempHp, amount);

    await this.characterRepository.save(character);

    return this.toDto(character);
  }

  private toDto(character: Character): CharacterResponseDto {
    return {
      id: character.id,
      name: character.name,
      slug: character.slug,
      level: character.level,
      hitPoints: character.hitPoints,
      currentHp: character.currentHp,
      tempHp: character.tempHp,
      classes: character.classes,
      stats: character.stats,
      items: character.items,
      defenses: character.defenses,
      isAlive: character.currentHp > 0,
    };
  }
}
