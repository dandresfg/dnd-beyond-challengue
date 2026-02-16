import type { Enemy } from './enemies';

export type GameStatus = 'not-started' | 'playing' | 'defeated' | 'victory';

export type TurnPhase = 'idle' | 'combat';

export interface CharacterState {
  name: string;
  subtitle?: string;
  level?: number;
  portraitUrl?: string;
  ac?: number;
  resistances: string[];
  badges: string[];
  currentHp: number;
  maxHp: number;
  tempHp: number;
  label: string;
}

export interface GameState {
  gameStatus: GameStatus;
  currentWave: number;
  turnPhase: TurnPhase;
  character: CharacterState;
  currentEnemy: Enemy | null;
  enemyCurrentHp: number;
  waveCleared: boolean;
}
