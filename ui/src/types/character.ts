import type { CharacterStats } from './game';

export interface Character {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  level: number;
  hitPoints: number;
  currentHp: number;
  tempHp: number;
  classes: { name: string; classLevel: number }[];
  items: {
    name: string;
    modifier: { affectedObject: string; affectedValue: string; value: number };
  }[];
  defenses: { type: string; defense: string }[];
  stats: CharacterStats;
  isAlive: boolean;
}
