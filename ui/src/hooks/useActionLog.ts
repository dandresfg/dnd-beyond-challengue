import { DamageType, DefenseType, Enemy, ICharacter, IDefense } from '@/types';
import { getDefenseStatus } from '@/utils/damageCalculator';
import { useState } from 'react';

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'attack' | 'heal' | 'tempHp';
  amount: number;
  damageType?: DamageType;
  defenseStatus?: DefenseType;
  enemy?: Enemy;
  message: string;
}

const getEffectiveDamage = (amount: number, defenseStatus: DefenseType | null) => {
  if(defenseStatus === DefenseType.IMMUNITY) return 0;
  if(defenseStatus === DefenseType.RESISTANCE) return amount / 2;
  return amount;
}

export const useActionLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addAttackLog = (
    damageType: DamageType,
    amount: number,
    defenses: IDefense[],
    enemy: Enemy,
  ) => {
    const defenseStatus = getDefenseStatus({ defenses } as unknown as ICharacter, damageType);
    const effectiveDamage = getEffectiveDamage(amount, defenseStatus);
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      type: 'attack',
      amount: effectiveDamage,
      damageType,
      defenseStatus: defenseStatus ?? undefined,
      enemy,
      message: `dealt ${effectiveDamage} ${damageType} damage`,
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
