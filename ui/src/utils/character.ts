import type { Character } from '../api/client';
import type { CharacterState } from '../types/game';

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function apiCharacterToCharacterState(c: Character): CharacterState {
  const resistances =
    (c.defenses as { type: string; defense: string }[])
      ?.filter((d) => d.defense === 'resistance')
      .map((d) => capitalize(d.type)) ?? [];

  return {
    name: c.name,
    level: c.level,
    currentHp: c.currentHp,
    maxHp: c.hitPoints,
    tempHp: c.tempHp,
    resistances,
    badges: [],
    label: c.currentHp > c.hitPoints * 0.5 ? 'Healthy' : 'Wounded',
  };
}
