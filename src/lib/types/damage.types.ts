/**
 * D&D 5e official damage types (lowercase for API/JSON consistency)
 */
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

/**
 * D&D 5e defense types (how a character resists damage)
 */
export enum DefenseType {
  IMMUNITY = 'immunity',
  RESISTANCE = 'resistance',
}
