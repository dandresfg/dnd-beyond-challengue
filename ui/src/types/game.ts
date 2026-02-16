import { Character } from './character';
import type { Enemy } from './enemies';

export type GameStatus = 'not-started' | 'playing' | 'defeated' | 'victory';

export type TurnPhase = 'idle' | 'combat';

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface GameState {
  gameStatus: GameStatus;
  currentWave: number;
  turnPhase: TurnPhase;
  character: Character;
  currentEnemy: Enemy | null;
  enemyCurrentHp: number;
  waveCleared: boolean;
}
