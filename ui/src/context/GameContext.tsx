import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ENEMIES, BOSSES, type Enemy } from '../features/enemies/data';
import { DamageType } from '../features/enemies/data';
import type { CharacterState, GameState } from '../types/game';
import { useLog } from './LogContext';

const INITIAL_STATE: GameState = {
  gameStatus: 'not-started',
  currentWave: 0,
  turnPhase: 'idle',
  character: {} as unknown as CharacterState,
  currentEnemy: null,
  enemyCurrentHp: 0,
  waveCleared: false,
};

function getEnemyForWave(wave: number): Enemy {
  if (wave <= 10) {
    const index = wave - 1;
    return ENEMIES[index];
  }
  const bossIndex = Math.floor(Math.random() * BOSSES.length);
  return BOSSES[bossIndex];
}

function damageTypeToDisplay(dt: DamageType): string {
  return dt.charAt(0).toUpperCase() + dt.slice(1).toLowerCase();
}

interface GameContextValue extends GameState {
  startGame: (player: CharacterState) => void;
  resetGame: () => void;
  playerAttack: () => void;
  playerHeal: (amount: number) => void;
  addTempHp: (amount: number) => void;
  nextWave: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const { addEntry, clearLog } = useLog();
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const enemyAttackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const startGame = useCallback(
    (player: CharacterState) => {
      clearLog();
      const enemy = getEnemyForWave(1);
      addEntry({
        type: 'wave_start',
        variant: 'neutral',
        wave: 1,
        enemyName: enemy.name,
      });
      setState({
        ...INITIAL_STATE,
        gameStatus: 'playing',
        currentWave: 1,
        turnPhase: 'idle',
        character: player,
        currentEnemy: enemy,
        enemyCurrentHp: 1,
        waveCleared: false,
      });
    },
    [addEntry, clearLog],
  );

  const resetGame = useCallback(() => {
    if (enemyAttackTimeoutRef.current) {
      clearTimeout(enemyAttackTimeoutRef.current);
      enemyAttackTimeoutRef.current = null;
    }
    clearLog();
    setState(INITIAL_STATE);
  }, [clearLog]);

  const nextWave = useCallback(() => {
    setState((prev) => {
      if (prev.currentWave >= 11) return prev;
      const nextWaveNum = prev.currentWave + 1;
      const enemy = getEnemyForWave(nextWaveNum);
      addEntry({
        type: 'wave_start',
        variant: 'neutral',
        round: `Wave ${nextWaveNum}`,
        wave: nextWaveNum,
        enemyName: enemy.name,
      });
      return {
        ...prev,
        currentWave: nextWaveNum,
        currentEnemy: enemy,
        enemyCurrentHp: 1,
        waveCleared: false,
        turnPhase: 'idle',
      };
    });
  }, [addEntry]);

  const playerAttack = useCallback(() => {
    setState((prev) => {
      if (prev.turnPhase !== 'idle' || !prev.currentEnemy || prev.waveCleared)
        return prev;

      const damage = 15;
      const newEnemyHp = Math.max(0, prev.enemyCurrentHp - damage);
      const enemyDefeated = newEnemyHp <= 0;

      if (enemyDefeated) {
        addEntry({
          type: 'player_defeated_enemy',
          variant: 'info',
          round: `Wave ${prev.currentWave}`,
          attacker: prev.character.name,
          target: prev.currentEnemy.name,
        });
        addEntry({
          type: 'wave_cleared',
          variant: 'info',
          round: `End of Wave ${prev.currentWave}`,
          wave: prev.currentWave,
        });
      } else {
        addEntry({
          type: 'player_attack',
          variant: 'neutral',
          round: `Wave ${prev.currentWave}`,
          attacker: prev.character.name,
          target: prev.currentEnemy.name,
          damage,
        });
      }

      const isVictory = prev.currentWave >= 11 && enemyDefeated;

      return {
        ...prev,
        enemyCurrentHp: enemyDefeated ? 0 : newEnemyHp,
        waveCleared: enemyDefeated,
        turnPhase: enemyDefeated ? 'idle' : 'combat',
        gameStatus: isVictory ? 'victory' : prev.gameStatus,
      };
    });
  }, [addEntry]);

  const playerHeal = useCallback(
    (amount: number) => {
      setState((prev) => {
        if (prev.turnPhase !== 'idle' || prev.waveCleared) return prev;
        const actualHeal = Math.min(
          amount,
          prev.character.maxHp - prev.character.currentHp,
        );
        if (actualHeal <= 0) return prev;

        addEntry({
          type: 'player_heal',
          variant: 'positive',
          round: `Wave ${prev.currentWave}`,
          attacker: prev.character.name,
          amount: actualHeal,
        });

        return {
          ...prev,
          character: {
            ...prev.character,
            currentHp: prev.character.currentHp + actualHeal,
          },
          turnPhase: 'combat',
        };
      });
    },
    [addEntry],
  );

  const addTempHp = useCallback(
    (amount: number) => {
      setState((prev) => {
        if (prev.turnPhase !== 'idle' || prev.waveCleared) return prev;
        if (amount <= 0) return prev;

        addEntry({
          type: 'player_temp_hp',
          variant: 'positive',
          round: `Wave ${prev.currentWave}`,
          attacker: prev.character.name,
          amount,
        });

        return {
          ...prev,
          character: {
            ...prev.character,
            tempHp: prev.character.tempHp + amount,
          },
          turnPhase: 'combat',
        };
      });
    },
    [addEntry],
  );

  const enemyAttack = useCallback(() => {
    setState((prev) => {
      if (prev.turnPhase !== 'combat' || !prev.currentEnemy) return prev;

      const damage =
        prev.currentEnemy.minDamage +
        Math.floor(
          Math.random() *
            (prev.currentEnemy.maxDamage - prev.currentEnemy.minDamage + 1),
        );
      const damageTypeStr = damageTypeToDisplay(prev.currentEnemy.damageType);

      let remainingDamage = damage;
      let newTempHp = prev.character.tempHp;
      let newCurrentHp = prev.character.currentHp;

      if (prev.character.tempHp > 0) {
        const tempAbsorb = Math.min(prev.character.tempHp, damage);
        newTempHp = prev.character.tempHp - tempAbsorb;
        remainingDamage = damage - tempAbsorb;
      }
      if (remainingDamage > 0) {
        newCurrentHp = Math.max(0, prev.character.currentHp - remainingDamage);
      }

      addEntry({
        type: 'enemy_attack',
        variant: 'negative',
        round: `Wave ${prev.currentWave}`,
        attacker: prev.currentEnemy.name,
        target: prev.character.name,
        damage,
        damageType: damageTypeStr,
      });

      return {
        ...prev,
        turnPhase: 'idle',
        character: {
          ...prev.character,
          currentHp: newCurrentHp,
          tempHp: newTempHp,
        },
        gameStatus: newCurrentHp <= 0 ? 'defeated' : prev.gameStatus,
      };
    });
  }, [addEntry]);

  useEffect(() => {
    if (state.turnPhase === 'combat' && state.gameStatus === 'playing') {
      enemyAttackTimeoutRef.current = setTimeout(() => {
        enemyAttack();
      }, 1500);
    }
    return () => {
      if (enemyAttackTimeoutRef.current) {
        clearTimeout(enemyAttackTimeoutRef.current);
      }
    };
  }, [state.turnPhase, state.gameStatus, enemyAttack]);

  const value: GameContextValue = {
    ...state,
    startGame,
    resetGame,
    playerAttack,
    playerHeal,
    addTempHp,
    nextWave,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
