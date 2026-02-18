import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CharacterService } from './character.service';
import {
  CharacterResponseDto,
  DealDamageDto,
  HealDto,
  AddTempHpDto,
  CHARACTER_SLUG_PARAM_SCHEMA,
} from './character.dto';
import { SlugValidationPipe } from '../lib/pipes/slug-validation.pipe';

@ApiTags('Character')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @ApiOperation({ summary: 'List all characters' })
  @ApiResponse({
    status: 200,
    description: 'Characters retrieved successfully',
    type: [CharacterResponseDto],
  })
  async listCharacters(): Promise<CharacterResponseDto[]> {
    return this.characterService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get character by slug' })
  @ApiParam(CHARACTER_SLUG_PARAM_SCHEMA)
  @ApiResponse({
    status: 200,
    description: 'Character retrieved successfully',
    type: CharacterResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 400, description: 'Invalid slug format' })
  async getCharacter(
    @Param('slug', SlugValidationPipe) slug: string,
  ): Promise<CharacterResponseDto> {
    return this.characterService.getCharacter(slug);
  }

  @Post(':slug/damage')
  @ApiOperation({ summary: 'Deal damage to character' })
  @ApiParam(CHARACTER_SLUG_PARAM_SCHEMA)
  @ApiResponse({
    status: 200,
    description: 'Damage applied successfully',
    type: CharacterResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 400, description: 'Invalid slug format' })
  async dealDamage(
    @Param('slug', SlugValidationPipe) slug: string,
    @Body() dto: DealDamageDto,
  ): Promise<CharacterResponseDto> {
    return this.characterService.dealDamage(slug, dto.damageType, dto.amount);
  }

  @Post(':slug/heal')
  @ApiOperation({ summary: 'Heal character' })
  @ApiParam(CHARACTER_SLUG_PARAM_SCHEMA)
  @ApiResponse({
    status: 200,
    description: 'Healing applied successfully',
    type: CharacterResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 400, description: 'Invalid slug format' })
  async heal(
    @Param('slug', SlugValidationPipe) slug: string,
    @Body() dto: HealDto,
  ): Promise<CharacterResponseDto> {
    return this.characterService.heal(slug, dto.amount);
  }

  @Post(':slug/temp-hp')
  @ApiOperation({ summary: 'Add temporary HP to character' })
  @ApiParam(CHARACTER_SLUG_PARAM_SCHEMA)
  @ApiResponse({
    status: 200,
    description: 'Temporary HP added successfully',
    type: CharacterResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 400, description: 'Invalid slug format' })
  async addTempHp(
    @Param('slug', SlugValidationPipe) slug: string,
    @Body() dto: AddTempHpDto,
  ): Promise<CharacterResponseDto> {
    return this.characterService.addTempHp(slug, dto.amount);
  }

  @Post(':slug/revive')
  @ApiOperation({ summary: 'Revive character to full HP' })
  @ApiParam(CHARACTER_SLUG_PARAM_SCHEMA)
  @ApiResponse({
    status: 200,
    description: 'Character revived successfully',
    type: CharacterResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 400, description: 'Invalid slug format' })
  async revive(
    @Param('slug', SlugValidationPipe) slug: string,
  ): Promise<CharacterResponseDto> {
    return this.characterService.revive(slug);
  }
}
