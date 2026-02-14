import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  CharacterDamagedEvent,
  CharacterHealedEvent,
  CharacterDiedEvent,
  TempHpAddedEvent,
} from './character.events';
import { CharacterEventNames } from './character-event.dto';

@Injectable()
export class CharacterEventsHandler {
  private readonly logger = new Logger(CharacterEventsHandler.name);

  @OnEvent(CharacterEventNames.DAMAGED)
  handleCharacterDamaged(event: CharacterDamagedEvent) {
    this.logger.log(
      `${event.character.name} took ${event.effectiveDamage} ${event.damageType} damage (raw: ${event.rawDamage}). HP: ${event.character.currentHp}`,
    );
    // TODO: Future WebSocket broadcast for real-time updates
  }

  @OnEvent(CharacterEventNames.HEALED)
  handleCharacterHealed(event: CharacterHealedEvent) {
    this.logger.log(
      `${event.character.name} healed for ${event.healAmount}. HP: ${event.character.currentHp}`,
    );
    // TODO: Future WebSocket broadcast for real-time updates
  }

  @OnEvent(CharacterEventNames.DIED)
  handleCharacterDied(event: CharacterDiedEvent) {
    this.logger.warn(`${event.character.name} has died!`);
    // TODO: Future logic for achievements, loot drops, etc.
  }

  @OnEvent(CharacterEventNames.TEMP_HP_ADDED)
  handleTempHpAdded(event: TempHpAddedEvent) {
    this.logger.log(
      `${event.character.name} temp HP: ${event.previousTempHp} → ${event.character.tempHp}`,
    );
    // TODO: Future WebSocket broadcast for real-time updates
  }
}
