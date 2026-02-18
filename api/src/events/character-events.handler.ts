import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CombatLogKind } from '../combat-log/combat-log-entry.entity';
import { CombatLogRepository } from '../combat-log/combat-log.repository';
import { CharacterEventNames } from './character-event.dto';
import {
  CharacterDamagedEvent,
  CharacterDiedEvent,
  CharacterHealedEvent,
  CharacterRevivedEvent,
  TempHpAddedEvent,
} from './character.events';

@Injectable()
export class CharacterEventsHandler {
  constructor(private readonly combatLogRepository: CombatLogRepository) {}

  @OnEvent(CharacterEventNames.DAMAGED)
  async handleCharacterDamaged(event: CharacterDamagedEvent) {
    await this.combatLogRepository.createEntry(event.character.id, CombatLogKind.DAMAGE, {
      rawDamage: event.rawDamage,
      effectiveDamage: event.effectiveDamage,
      damageType: event.damageType,
    });
  }

  @OnEvent(CharacterEventNames.HEALED)
  async handleCharacterHealed(event: CharacterHealedEvent) {
    await this.combatLogRepository.createEntry(event.character.id, CombatLogKind.HEAL, {
      healAmount: event.healAmount,
    });
  }

  @OnEvent(CharacterEventNames.DIED)
  async handleCharacterDied(event: CharacterDiedEvent) {
    await this.combatLogRepository.createEntry(event.character.id, CombatLogKind.DIED, {});
  }

  @OnEvent(CharacterEventNames.REVIVED)
  async handleCharacterRevived(event: CharacterRevivedEvent) {
    await this.combatLogRepository.createEntry(event.character.id, CombatLogKind.REVIVED, {});
  }

  @OnEvent(CharacterEventNames.TEMP_HP_ADDED)
  async handleTempHpAdded(event: TempHpAddedEvent) {
    await this.combatLogRepository.createEntry(event.character.id, CombatLogKind.TEMP_HP, {
      previousTempHp: event.previousTempHp,
      newTempHp: event.character.tempHp,
    });
  }
}
