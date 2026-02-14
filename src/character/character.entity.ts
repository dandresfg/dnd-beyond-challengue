import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  type: string; // "fire", "slashing", etc.
  defense: 'immunity' | 'resistance';
}

@Entity()
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

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

  @Column('json', { default: '[]' })
  items: IItem[];

  @Column('json', { default: '[]' })
  defenses: IDefense[];

  getStat(stat: keyof IStats): number {
    const baseValue = this.stats[stat];
    const filteredItems = this.items.filter(
      (item) =>
        item.modifier.affectedObject === 'stats' &&
        item.modifier.affectedValue === stat,
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
