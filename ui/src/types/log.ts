export type LogEntryVariant = 'positive' | 'negative' | 'neutral' | 'info';

export type LogEntryType =
  | 'player_attack'
  | 'player_defeated_enemy'
  | 'player_heal'
  | 'player_temp_hp'
  | 'enemy_attack'
  | 'wave_start'
  | 'wave_cleared';

export interface LogEntry {
  id: string;
  timestamp: string;
  round?: string;
  type: LogEntryType;
  variant: LogEntryVariant;
  attacker?: string;
  target?: string;
  damage?: number;
  amount?: number;
  damageType?: string;
  wave?: number;
  enemyName?: string;
}
