import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from '../character/character.module';
import { CombatLogEntry } from './combat-log-entry.entity';
import { CombatLogController } from './combat-log.controller';
import { CombatLogRepository } from './combat-log.repository';
import { CombatLogService } from './combat-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CombatLogEntry]),
    CharacterModule,
  ],
  controllers: [CombatLogController],
  providers: [CombatLogRepository, CombatLogService],
  exports: [CombatLogRepository],
})
export class CombatLogModule {}
