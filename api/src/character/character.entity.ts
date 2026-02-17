import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DamageType, DefenseType } from '../lib/types/damage.types';

export interface IClass {
  name: string;
  hitDiceValue: number;
  classLevel: number;
}

export interface IStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface IItem {
  name: string;
  modifier: {
    affectedObject: string;
    affectedValue: string;
    value: number;
  };
}

export interface IDefense {
  type: DamageType;
  defense: DefenseType;
}

@Entity()
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  level: number;

  @Column()
  hitPoints: number; // Max HP from JSON

  @Column()
  currentHp: number; // Runtime state

  @Column({ default: 0 })
  tempHp: number; // Temporary hit points

  @Column('json')
  classes: IClass[];

  @Column('json')
  stats: IStats;

  @Column('json', { nullable: true })
  items: IItem[];

  @Column('json', { nullable: true })
  defenses: IDefense[];

  getStat(stat: keyof IStats): number {
    const baseValue = this.stats[stat];
    const filteredItems = (this.items || []).filter(
      (item) =>
        item.modifier?.affectedObject === 'stats' &&
        item.modifier?.affectedValue === stat,
    );

    const itemBonus = filteredItems.reduce(
      (total, item) => total + item.modifier.value,
      0,
    );

    return baseValue + itemBonus;
  }

  getStatModifier(stat: keyof IStats): number {
    const effectiveStat = this.getStat(stat);
    return Math.floor((effectiveStat - 10) / 2);
  }
}

/**
 * Generate a URL-safe slug from a character name
 * Examples: "Briv" → "briv", "Gandalf the Grey" → "gandalf-the-grey"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Spaces to hyphens
    .replace(/-+/g, '-') // Multiple hyphens to single
    .replace(/^-+|-+$/g, ''); // Trim hyphens from start/end
}
