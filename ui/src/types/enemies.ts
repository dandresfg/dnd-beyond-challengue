export enum DamageType {
  ACID = 'acid',
  BLUDGEONING = 'bludgeoning',
  COLD = 'cold',
  FIRE = 'fire',
  FORCE = 'force',
  LIGHTNING = 'lightning',
  NECROTIC = 'necrotic',
  PIERCING = 'piercing',
  POISON = 'poison',
  PSYCHIC = 'psychic',
  RADIANT = 'radiant',
  SLASHING = 'slashing',
  THUNDER = 'thunder',
}

export enum DefenseType {
  IMMUNITY = 'immunity',
  RESISTANCE = 'resistance',
}

export interface Enemy {
  id: string;
  name: string;
  avatarUrl: string;
  damageType: DamageType;
  attackName: string; // Flavor text for the log
  minDamage: number;
  maxDamage: number;
}
