import { DamageType, Enemy } from '@/types';

export const ENEMY_FALLBACK: Enemy = {
  id: 'fallback',
  name: "The Bleeding Beast, Nature's Fury",
  avatarUrl:
    'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/Boss-12.png',
  damageType: DamageType.SLASHING,
  attackName: 'Primal Maul',
};

export const ENEMIES: Enemy[] = [
  {
    id: 'e1',
    name: 'Griznak the Severer',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-1.png',
    damageType: DamageType.SLASHING,
    attackName: 'Jagged Scimitar',
  },
  {
    id: 'e2',
    name: 'Ignis, Ember of the Void',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-2.png',
    damageType: DamageType.PIERCING,
    attackName: 'Hellfire Burst',
  },
  {
    id: 'e4',
    name: 'Viper, the Silent Arrow',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-4.png',
    damageType: DamageType.POISON,
    attackName: 'Poisoned Bolt',
  },
  {
    id: 'e5',
    name: 'Horgar Stone-Fist',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-5.png',
    damageType: DamageType.BLUDGEONING,
    attackName: 'Earthshatter Smash',
  },
  {
    id: 'e6',
    name: 'Stormcaller Zyx',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-6.png',
    damageType: DamageType.LIGHTNING,
    attackName: 'Chain Lightning',
  },
  {
    id: 'e7',
    name: 'Globulus the Corrosive',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-7.png',
    damageType: DamageType.ACID,
    attackName: 'Dissolving Spray',
  },
  {
    id: 'e8',
    name: 'Zorath the Whisperer',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-8.png',
    damageType: DamageType.PSYCHIC,
    attackName: 'Mind Shatter',
  },
  {
    id: 'e9',
    name: 'Lady Mortis',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-9.png',
    damageType: DamageType.NECROTIC,
    attackName: 'Vampiric Drain',
  },
  {
    id: 'e10',
    name: 'Construct Alpha-9',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/npc-10.png',
    damageType: DamageType.THUNDER,
    attackName: 'Arcane Missiles',
  },
  {
    id: 'b1',
    name: 'Cindermaw the Eruptor',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/Boss-13.png',
    damageType: DamageType.FIRE,
    attackName: 'Magma Breath',
  },
  {
    id: 'b2',
    name: 'Cryonax the Glacial Tyrant',
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/Boss-14.png',
    damageType: DamageType.COLD,
    attackName: 'Flash Freeze',
  },
  {
    id: 'b4',
    name: "K'thul, The Slumbering Terror",
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/Boss-11.png',
    damageType: DamageType.RADIANT,
    attackName: 'Cosmic Madness',
  },
  {
    id: 'b5',
    name: "The Void-Anchor's Core",
    avatarUrl:
      'https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/assets/Boss-15.png',
    damageType: DamageType.FORCE,
    attackName: 'Reality Fracture',
  },
];
