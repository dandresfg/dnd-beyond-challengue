import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CHARACTER_SLUG_PARAM_SCHEMA } from '../character/character.dto';
import { SlugValidationPipe } from '../lib/pipes/slug-validation.pipe';
import { CombatLogKind } from './combat-log-entry.entity';
import { CombatLogEntryResponseDto } from './combat-log.dto';
import { CombatLogService } from './combat-log.service';

@ApiTags('Combat log')
@Controller('combat-log')
export class CombatLogController {
  constructor(private readonly combatLogService: CombatLogService) {}

  @Get(':slug')
  @ApiOperation({
    summary: 'Get combat log for character (optional filter by kind)',
  })
  @ApiParam(CHARACTER_SLUG_PARAM_SCHEMA)
  @ApiQuery({
    name: 'kind',
    required: false,
    enum: CombatLogKind,
    description: 'Filter entries by event kind',
  })
  @ApiResponse({
    status: 200,
    description: 'Combat log entries (newest first)',
    type: [CombatLogEntryResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 400, description: 'Invalid slug or kind' })
  async getByCharacterSlug(
    @Param('slug', SlugValidationPipe) slug: string,
    @Query(
      'kind',
      new ParseEnumPipe(CombatLogKind, { optional: true }),
    )
    kind?: CombatLogKind,
  ): Promise<CombatLogEntryResponseDto[]> {
    return this.combatLogService.getByCharacterSlug(slug, kind);
  }
}
