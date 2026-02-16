export interface Character {
  id: string;
  name: string;
  slug: string;
  level: number;
  hitPoints: number;
  currentHp: number;
  tempHp: number;
  classes: unknown[];
  stats: Record<string, number>;
  items: unknown[];
  defenses: unknown[];
  isAlive: boolean;
}
