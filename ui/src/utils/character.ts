import type { Character } from '../types/character';

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function subtitleFromClasses(
  classes: { name: string; classLevel: number }[],
): string | undefined {
  if (!classes?.length) return undefined;
  return classes
    .map((c) => `${capitalize(c.name)} ${c.classLevel}`)
    .join(' / ');
}

export function apiCharacterToCharacterState(c: Character): Character {
  return {
    ...c,
    subtitle: subtitleFromClasses(c.classes) ?? '',
  };
}
