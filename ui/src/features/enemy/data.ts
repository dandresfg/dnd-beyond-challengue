import { Enemy, DamageType } from '@/types';

export const ENEMIES: Enemy[] = [
  {
    id: 'e1',
    name: 'Griznak the Severer',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-1.png',
    damageType: DamageType.SLASHING,
    attackName: 'Jagged Scimitar',
    minDamage: 5,
    maxDamage: 9,
  },
  {
    id: 'e2',
    name: 'Ignis, Ember of the Void',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-2.png',
    damageType: DamageType.FIRE,
    attackName: 'Hellfire Burst',
    minDamage: 8,
    maxDamage: 16,
  },
  {
    id: 'e3',
    name: 'Vorlag, Shadow of Winter',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-3.png',
    damageType: DamageType.COLD,
    attackName: 'Touch of the Grave',
    minDamage: 4,
    maxDamage: 10,
  },
  {
    id: 'e4',
    name: 'Viper, the Silent Arrow',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-4.png',
    damageType: DamageType.PIERCING,
    attackName: 'Poisoned Bolt',
    minDamage: 6,
    maxDamage: 11,
  },
  {
    id: 'e5',
    name: 'Horgar Stone-Fist',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-5.png',
    damageType: DamageType.BLUDGEONING,
    attackName: 'Earthshatter Smash',
    minDamage: 7,
    maxDamage: 14,
  },
  {
    id: 'e6',
    name: 'Stormcaller Zyx',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-6.png',
    damageType: DamageType.LIGHTNING,
    attackName: 'Chain Lightning',
    minDamage: 5,
    maxDamage: 12,
  },
  {
    id: 'e7',
    name: 'Globulus the Corrosive',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-7.png',
    damageType: DamageType.ACID,
    attackName: 'Dissolving Spray',
    minDamage: 4,
    maxDamage: 9,
  },
  {
    id: 'e8',
    name: 'Zorath the Whisperer',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-8.png',
    damageType: DamageType.PSYCHIC,
    attackName: 'Mind Shatter',
    minDamage: 6,
    maxDamage: 12,
  },
  {
    id: 'e9',
    name: 'Lady Mortis',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-9.png',
    damageType: DamageType.NECROTIC,
    attackName: 'Vampiric Drain',
    minDamage: 5,
    maxDamage: 10,
  },
  {
    id: 'e10',
    name: 'Construct Alpha-9',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-10.png',
    damageType: DamageType.FORCE,
    attackName: 'Arcane Missiles',
    minDamage: 3,
    maxDamage: 7,
  },
  {
    id: 'b1',
    name: 'Cindermaw the Eruptor',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/boss-11.png',
    damageType: DamageType.FIRE,
    attackName: 'Magma Breath',
    minDamage: 15,
    maxDamage: 30,
  },
  {
    id: 'b2',
    name: 'Cryonax the Glacial Tyrant',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/boss-12.png',
    damageType: DamageType.COLD,
    attackName: 'Flash Freeze',
    minDamage: 12,
    maxDamage: 22,
  },
  {
    id: 'b3',
    name: "The Bleeding Beast, Nature's Fury",
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/boss-13.png',
    damageType: DamageType.SLASHING,
    attackName: 'Primal Maul',
    minDamage: 16,
    maxDamage: 32,
  },
  {
    id: 'b4',
    name: "K'thul, The Slumbering Terror",
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/boss-14.png',
    damageType: DamageType.PSYCHIC,
    attackName: 'Cosmic Madness',
    minDamage: 18,
    maxDamage: 34,
  },
  {
    id: 'b5',
    name: "The Void-Anchor's Core",
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/boss-15.png',
    damageType: DamageType.FORCE,
    attackName: 'Reality Fracture',
    minDamage: 18,
    maxDamage: 35,
  },
];
