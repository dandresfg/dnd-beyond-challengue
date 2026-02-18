import { Character } from '../character/character.entity';

export class CharacterDamagedEvent {
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly character: Character,
    public readonly damageType: string,
    public readonly rawDamage: number,
    public readonly effectiveDamage: number,
  ) {}
}

export class CharacterHealedEvent {
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly character: Character,
    public readonly healAmount: number,
  ) {}
}

export class CharacterRevivedEvent {
  public readonly timestamp: Date = new Date();

  constructor(public readonly character: Character) {}
}

export class CharacterDiedEvent {
  public readonly timestamp: Date = new Date();

  constructor(public readonly character: Character) {}
}

export class TempHpAddedEvent {
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly character: Character,
    public readonly previousTempHp: number,
  ) {}
}
