export type CombatLogEntryVariant =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'info';

export interface CombatLogEntryType {
  timestamp: string;
  round?: string;
  message: React.ReactNode;
  variant?: CombatLogEntryVariant;
}
