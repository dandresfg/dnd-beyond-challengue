import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CombatLogEntry, CombatLogKind } from './combat-log-entry.entity';

@Injectable()
export class CombatLogRepository extends Repository<CombatLogEntry> {
  constructor(private dataSource: DataSource) {
    super(CombatLogEntry, dataSource.createEntityManager());
  }

  async createEntry(
    characterId: string,
    kind: CombatLogKind,
    payload: Record<string, unknown>,
  ): Promise<CombatLogEntry> {
    const entry = this.create({ characterId, kind, payload });
    return this.save(entry);
  }

  async findByCharacterSlug(
    slug: string,
    kind?: CombatLogKind,
  ): Promise<CombatLogEntry[]> {
    const query = this.createQueryBuilder('entry')
      .innerJoin('entry.character', 'character')
      .where('character.slug = :slug', { slug });

    if (kind) {
      query.andWhere('entry.kind = :kind', { kind });
    }

    return query.orderBy('entry.timestamp', 'DESC').getMany();
  }
}
