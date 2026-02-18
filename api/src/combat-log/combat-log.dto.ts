import { ApiProperty } from '@nestjs/swagger';
import { CombatLogKind } from './combat-log-entry.entity';

export class CombatLogEntryResponseDto {
  @ApiProperty({ enum: CombatLogKind, example: CombatLogKind.DAMAGE })
  kind: CombatLogKind;

  @ApiProperty({
    description: 'Event-specific payload (structure depends on kind)',
    example: { rawDamage: 10, effectiveDamage: 8, damageType: 'fire' },
  })
  payload: Record<string, unknown>;

  @ApiProperty({ example: '2025-02-18T12:00:00.000Z' })
  timestamp: Date;
}
