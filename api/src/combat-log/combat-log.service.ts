import {
  Injectable
} from '@nestjs/common';
import { CombatLogEntry, CombatLogKind } from './combat-log-entry.entity';
import { CombatLogEntryResponseDto } from './combat-log.dto';
import { CombatLogRepository } from './combat-log.repository';

@Injectable()
export class CombatLogService {
  constructor(
    private readonly combatLogRepository: CombatLogRepository,
  ) {}

  async getByCharacterSlug(
    slug: string,
    kind?: CombatLogKind,
  ): Promise<CombatLogEntryResponseDto[]> {
    const entries = await this.combatLogRepository.findByCharacterSlug(
      slug,
      kind,
    );
    return entries.map((e: CombatLogEntry) => this.toDto(e));
  }

  private toDto(entry: CombatLogEntry): CombatLogEntryResponseDto {
    return {
      kind: entry.kind,
      payload: entry.payload,
      timestamp: entry.timestamp,
    };
  }
}
