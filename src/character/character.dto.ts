import { IsNumber, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IClass, IStats, IItem, IDefense } from './character.entity';
import { DamageType } from '../lib/types/damage.types';
import { SLUG_REGEX } from '../lib/pipes/slug-validation.pipe';

// Response DTO - used by all endpoints
export class CharacterResponseDto {
  @ApiProperty({
    description: 'Unique character identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Character name',
    example: 'Briv',
  })
  name: string;

  @ApiProperty({
    description: 'URL-safe slug for character',
    example: 'briv',
  })
  slug: string;

  @ApiProperty({
    description: 'Character level',
    example: 5,
  })
  level: number;

  @ApiProperty({
    description: 'Maximum hit points',
    example: 45,
  })
  hitPoints: number;

  @ApiProperty({
    description: 'Current hit points',
    example: 25,
  })
  currentHp: number;

  @ApiProperty({
    description: 'Temporary hit points',
    example: 5,
  })
  tempHp: number;

  @ApiProperty({
    description: 'Character classes',
    example: [{ name: 'fighter', hitDiceValue: 10, classLevel: 5 }],
  })
  classes: IClass[];

  @ApiProperty({
    description: 'Character ability scores',
    example: {
      strength: 15,
      dexterity: 12,
      constitution: 14,
      intelligence: 10,
      wisdom: 13,
      charisma: 8,
    },
  })
  stats: IStats;

  @ApiProperty({
    description: 'Equipped items with modifiers',
    example: [],
  })
  items: IItem[];

  @ApiProperty({
    description: 'Damage resistances and immunities',
    example: [],
  })
  defenses: IDefense[];

  @ApiProperty({
    description: 'Whether the character is alive',
    example: true,
  })
  isAlive: boolean;
}

// Request DTOs
export class DealDamageDto {
  @ApiProperty({
    description: 'D&D 5e damage type',
    enum: DamageType,
    example: DamageType.FIRE,
  })
  @IsEnum(DamageType)
  damageType: DamageType;

  @ApiProperty({
    description: 'Amount of damage to deal',
    example: 10,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  amount: number;
}

export class HealDto {
  @ApiProperty({
    description: 'Amount of hit points to restore',
    example: 5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  amount: number;
}

export class AddTempHpDto {
  @ApiProperty({
    description:
      'Amount of temporary hit points to add (takes max, not additive)',
    example: 10,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  amount: number;
}

// Param DTOs
export const CHARACTER_SLUG_PARAM_SCHEMA = {
  name: 'slug',
  example: 'briv',
  description: 'Character slug (lowercase, alphanumeric, hyphens only)',
  schema: { pattern: SLUG_REGEX },
};
