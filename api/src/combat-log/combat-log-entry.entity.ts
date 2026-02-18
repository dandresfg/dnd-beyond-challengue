import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from '../character/character.entity';

export enum CombatLogKind {
  DAMAGE = 'damage',
  HEAL = 'heal',
  TEMP_HP = 'temp_hp',
  DIED = 'died',
  REVIVED = 'revived',
}

@Entity()
export class CombatLogEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  characterId: string;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'characterId' })
  character: Character;

  @Column({ type: 'varchar', length: 20 })
  kind: CombatLogKind;

  @Column('json')
  payload: Record<string, unknown>;

  @CreateDateColumn()
  timestamp: Date;
}
