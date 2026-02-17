import { useState } from 'react';
import { DamageType, Enemy } from '@/types';

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'attack' | 'heal' | 'tempHp';
  amount: number;
  damageType?: DamageType;
  enemy?: Enemy;
  message: string;
}

export const useActionLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addAttackLog = (
    damageType: DamageType,
    amount: number,
    enemy: Enemy,
    result?: string,
  ) => {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      type: 'attack',
      amount,
      damageType,
      enemy,
      message: result || `dealt ${amount} ${damageType} damage`,
    };
    setLogs((prev) => [entry, ...prev]);
  };

  const addHealLog = (amount: number) => {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      type: 'heal',
      amount,
      message: `Healed for ${amount} HP`,
    };
    setLogs((prev) => [entry, ...prev]);
  };

  const addTempHpLog = (amount: number) => {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      type: 'tempHp',
      amount,
      message: `Gained ${amount} temporary HP`,
    };
    setLogs((prev) => [entry, ...prev]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return {
    logs,
    addAttackLog,
    addHealLog,
    addTempHpLog,
    clearLogs,
  };
};
