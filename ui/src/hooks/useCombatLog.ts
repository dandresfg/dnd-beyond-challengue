import { fetcher } from '@/config/api';
import { DamageType } from '@/types';
import useSWR from 'swr';

export enum CombatLogKind {
    DAMAGE = 'damage',
    HEAL = 'heal',
    TEMP_HP = 'temp_hp',
    DIED = 'died',
    REVIVED = 'revived',
}

interface DamageEntry {
    kind: CombatLogKind.DAMAGE;
    payload: { rawDamage: number; effectiveDamage: number; damageType: DamageType };
    timestamp: string;
}
interface HealEntry {
    kind: CombatLogKind.HEAL;
    payload: { healAmount: number };
    timestamp: string;
}
interface TempHpEntry {
    kind: CombatLogKind.TEMP_HP;
    payload: { previousTempHp: number; newTempHp: number };
    timestamp: string;
}
interface DiedEntry {
    kind: CombatLogKind.DIED;
    payload: Record<string, never>;
    timestamp: string;
}
interface RevivedEntry {
    kind: CombatLogKind.REVIVED;
    payload: Record<string, never>;
    timestamp: string;
}

export type CombatLogEntry =
    | DamageEntry
    | HealEntry
    | TempHpEntry
    | DiedEntry
    | RevivedEntry;

export const useCombatLog = (characterSlug: string, kind?: CombatLogKind) => {
    const { data: logs, isLoading, error, mutate } = useSWR<CombatLogEntry[]>(
        `/combat-log/${characterSlug}${kind ? `?kind=${kind}` : ''}`,
        fetcher,
    );

    const getLogsByKind = (kind: CombatLogKind) => {
        return logs?.filter((log) => log.kind === kind) ?? [];
    }

    return {
        logs: logs ?? [],
        isLoading,
        error,
        mutate,
        getLogsByKind,
    };
};
