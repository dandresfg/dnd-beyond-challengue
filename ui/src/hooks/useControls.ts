import { ENEMIES } from '@/features/enemy/data';
import { DamageType, IDefense } from '@/types';
import { useState } from 'react';
import { useActionLog } from './useActionLog';

interface AttackInfo {
  damageType: DamageType;
  amount: number;
}

interface HealInfo {
  type: 'heal' | 'tempHp';
  amount: number;
}

export const useControls = () => {
  const [attackInfo, setAttackInfo] = useState<AttackInfo | null>(null);
  const [healInfo, setHealInfo] = useState<HealInfo | null>(null);
  const { logs, addAttackLog, addHealLog, addTempHpLog, clearLogs } =
    useActionLog();

  const handleAttackStart = (damageType: DamageType, amount: number, defenses: IDefense[]) => {
    setAttackInfo({ damageType, amount });
    const enemy = ENEMIES.find((e) => e.damageType === damageType);
    if (enemy) {
      addAttackLog(damageType, amount, defenses, enemy);
    }
  };

  const handleAttackComplete = () => {
    setAttackInfo(null);
  };

  const handleHealStart = (type: 'heal' | 'tempHp', amount: number) => {
    setHealInfo({ type, amount });
    if (type === 'heal') {
      addHealLog(amount);
    } else {
      addTempHpLog(amount);
    }
  };

  const handleHealComplete = () => {
    setHealInfo(null);
  };

  return {
    attackInfo,
    healInfo,
    logs,
    handleAttackStart,
    handleAttackComplete,
    handleHealStart,
    handleHealComplete,
    clearLogs,
  };
};
