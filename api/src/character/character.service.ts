import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CharacterEventNames } from '../events/character-event.dto';
import {
  CharacterDamagedEvent,
  CharacterDiedEvent,
  CharacterHealedEvent,
  CharacterRevivedEvent,
  TempHpAddedEvent,
} from '../events/character.events';
import { DamageCalculator } from '../lib/damage.calculator';
import { TempHpCalculator } from '../lib/temp-hp.calculator';
import { DamageType } from '../lib/types/damage.types';
import { CharacterResponseDto } from './character.dto';
import { Character } from './character.entity';
import { CharacterRepository } from './character.repository';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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
    damageType: DamageType,
    amount: number,
  ): Promise<CharacterResponseDto> {
    const character = await this.characterRepository.findBySlug(slug);

    if (!character) {
      throw new NotFoundException(`Character "${slug}" not found`);
    }

    const effectiveDamage = DamageCalculator.calculateEffectiveDamage(
      character,
      damageType,
      amount,
    );

    TempHpCalculator.applyDamageToHp(character, effectiveDamage);

    await this.characterRepository.save(character);

    this.eventEmitter.emit(
      CharacterEventNames.DAMAGED,
      new CharacterDamagedEvent(character, damageType, amount, effectiveDamage),
    );

    if (character.currentHp === 0) {
      this.eventEmitter.emit(
        CharacterEventNames.DIED,
        new CharacterDiedEvent(character),
      );
    }

    return this.toDto(character);
  }

  async heal(slug: string, amount: number): Promise<CharacterResponseDto> {
    const character = await this.characterRepository.findBySlug(slug);

    if (!character) {
      throw new NotFoundException(`Character "${slug}" not found`);
    }

    if (character.currentHp === 0) {
      throw new BadRequestException('Cannot heal a dead character');
    }

    const previousHp = character.currentHp;

    character.currentHp = Math.min(
      character.hitPoints,
      character.currentHp + amount,
    );

    const actualHealing = character.currentHp - previousHp;

    await this.characterRepository.save(character);

    if (actualHealing > 0) {
      this.eventEmitter.emit(
        CharacterEventNames.HEALED,
        new CharacterHealedEvent(character, actualHealing),
      );
    }

    return this.toDto(character);
  }

  async addTempHp(slug: string, amount: number): Promise<CharacterResponseDto> {
    const character = await this.characterRepository.findBySlug(slug);

    if (!character) {
      throw new NotFoundException(`Character "${slug}" not found`);
    }

    const previousTempHp = TempHpCalculator.addTempHp(character, amount);

    await this.characterRepository.save(character);

    if (character.tempHp !== previousTempHp) {
      this.eventEmitter.emit(
        CharacterEventNames.TEMP_HP_ADDED,
        new TempHpAddedEvent(character, previousTempHp),
      );
    }

    return this.toDto(character);
  }

  async revive(slug: string): Promise<CharacterResponseDto> {
    const character = await this.characterRepository.findBySlug(slug);

    if (!character) {
      throw new NotFoundException(`Character "${slug}" not found`);
    }

    character.currentHp = character.hitPoints;
    character.tempHp = 0;
    await this.characterRepository.save(character);

    this.eventEmitter.emit(
      CharacterEventNames.REVIVED,
      new CharacterRevivedEvent(character),
    );

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
      items: character.items ?? [],
      defenses: character.defenses ?? [],
      isAlive: character.currentHp > 0,
    };
  }
}
