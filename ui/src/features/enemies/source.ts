// ui/src/features/dashboard/enemies.ts

export interface Enemy {
  id: string;
  name: string;
  avatarUrl: string;
  damageType: string; // Matches API Enum
  attackName: string; // Flavor text for the log
  minDamage: number;
  maxDamage: number;
}

export const ENEMIES: Enemy[] = [
  {
    id: 'e1',
    name: 'Griznak the Severer',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Griznak',
    damageType: 'slashing',
    attackName: 'Jagged Scimitar',
    minDamage: 5,
    maxDamage: 9,
  },
  {
    id: 'e2',
    name: 'Ignis, Ember of the Void',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ignis',
    damageType: 'fire',
    attackName: 'Hellfire Burst',
    minDamage: 8, // High damage, but Briv is Immune (0)
    maxDamage: 16,
  },
  {
    id: 'e3',
    name: 'Vorlag, Shadow of Winter',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Vorlag',
    damageType: 'cold',
    attackName: 'Touch of the Grave',
    minDamage: 4,
    maxDamage: 10,
  },
  {
    id: 'e4',
    name: 'Viper, the Silent Arrow',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Viper',
    damageType: 'piercing',
    attackName: 'Poisoned Bolt',
    minDamage: 6,
    maxDamage: 11,
  },
  {
    id: 'e5',
    name: 'Horgar Stone-Fist',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Horgar',
    damageType: 'bludgeoning',
    attackName: 'Earthshatter Smash',
    minDamage: 7,
    maxDamage: 14,
  },
  {
    id: 'e6',
    name: 'Stormcaller Zyx',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Zyx',
    damageType: 'lightning',
    attackName: 'Chain Lightning',
    minDamage: 5,
    maxDamage: 12,
  },
  {
    id: 'e7',
    name: 'Globulus the Corrosive',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Globulus',
    damageType: 'acid',
    attackName: 'Dissolving Spray',
    minDamage: 4,
    maxDamage: 9,
  },
  {
    id: 'e8',
    name: 'Zorath the Whisperer',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Zorath',
    damageType: 'psychic',
    attackName: 'Mind Shatter',
    minDamage: 6,
    maxDamage: 12,
  },
  {
    id: 'e9',
    name: 'Lady Mortis',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mortis',
    damageType: 'necrotic',
    attackName: 'Vampiric Drain',
    minDamage: 5,
    maxDamage: 10,
  },
  {
    id: 'e10',
    name: 'Construct Alpha-9',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alpha9',
    damageType: 'force',
    attackName: 'Arcane Missiles',
    minDamage: 3,
    maxDamage: 7,
  },
];
