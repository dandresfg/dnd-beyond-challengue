import { useState } from 'react';
import { DamageType } from '@/types';
import { useActionLog } from './useActionLog';
import { ENEMIES } from '@/features/enemy/data';

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
    const { logs, addAttackLog, addHealLog, addTempHpLog, clearLogs } = useActionLog();

    const handleAttackStart = (damageType: DamageType, amount: number) => {
        setAttackInfo({ damageType, amount });
        const enemy = ENEMIES.find(e => e.damageType === damageType);
        if (enemy) {
            addAttackLog(damageType, amount, enemy);
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
