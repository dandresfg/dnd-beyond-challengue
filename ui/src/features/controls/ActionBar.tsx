import { useState } from "react";
import { Card } from "@/components/Card";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { DamageType } from "@/types";
import { useDamage } from "@/hooks/useDamage";
import { useHealing } from "@/hooks/useHealing";
import { useCharacter } from "@/hooks/useCharacter";
import styles from "./ActionBar.module.css";

interface ActionBarProps {
    onAttackStart: (damageType: DamageType, amount: number) => void;
    onHealStart: (type: 'heal' | 'tempHp', amount: number) => void;
}

export const ActionBar = ({ onAttackStart, onHealStart }: ActionBarProps) => {
    const { player } = useCharacter();
    const { applyDamage } = useDamage(player?.slug || '');
    const { heal, addTempHp } = useHealing(player?.slug || '');

    const [attackAmount, setAttackAmount] = useState(0);
    const [damageType, setDamageType] = useState<DamageType>(DamageType.FIRE);
    const [healAmount, setHealAmount] = useState(0);
    const [tempHpAmount, setTempHpAmount] = useState(0);

    const handleAttack = async () => {
        if (!player || attackAmount <= 0) return;

        try {
            onAttackStart(damageType, attackAmount);
            await applyDamage({ damageType, amount: attackAmount });
        } catch (error) {
            console.error('Failed to apply damage:', error);
        }
    };

    const handleHeal = async () => {
        if (healAmount <= 0) return;

        try {
            onHealStart('heal', healAmount);
            await heal({ amount: healAmount });
        } catch (error) {
            console.error('Failed to apply healing:', error);
        }
    };

    const handleAddTempHp = async () => {
        if (tempHpAmount <= 0) return;

        try {
            onHealStart('tempHp', tempHpAmount);
            await addTempHp({ amount: tempHpAmount });
        } catch (error) {
            console.error('Failed to add temporary HP:', error);
        }
    };

    return (
        <Card>
            <Flex direction="row" align="center" gap={1} className={styles.header}>
                <Text variant="label" className={styles.headerText}>Quick Actions</Text>
            </Flex>

            <Flex direction="row" gap={2} wrap className={styles.actionsContainer}>
                {/* Attack Input */}
                <Flex direction="column" gap={1} className={styles.inputGroup}>
                    <Text variant="label" className={styles.inputLabel}>Attacking</Text>
                    <Flex direction="row" className={styles.inputWrapper}>
                        <input
                            type="number"
                            value={attackAmount}
                            onChange={(e) => setAttackAmount(Number(e.target.value))}
                            className={styles.input}
                            min="0"
                            aria-label="Attack damage amount"
                        />
                    </Flex>
                    <select
                        value={damageType}
                        onChange={(e) => setDamageType(e.target.value as DamageType)}
                        className={styles.select}
                        aria-label="Damage type"
                    >
                        {Object.values(DamageType).map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAttack}
                        className={`${styles.button} ${styles.buttonDamage}`}
                        aria-label="Apply damage"
                        disabled={attackAmount <= 0}
                    >
                        <span>Apply Dmg</span>
                    </button>
                </Flex>

                {/* Heal Input */}
                <Flex direction="column" gap={1} className={styles.inputGroup}>
                    <Text variant="label" className={styles.inputLabel}>Heal</Text>
                    <Flex direction="row" className={styles.inputWrapper}>
                        <input
                            type="number"
                            value={healAmount}
                            onChange={(e) => setHealAmount(Number(e.target.value))}
                            className={styles.input}
                            min="0"
                            aria-label="Heal amount"
                        />
                    </Flex>
                    <button
                        onClick={handleHeal}
                        className={`${styles.button} ${styles.buttonHeal}`}
                        aria-label="Apply healing"
                        disabled={healAmount <= 0}
                    >
                        <span>Heal</span>
                    </button>
                </Flex>

                {/* Temp HP Input */}
                <Flex direction="column" gap={1} className={styles.inputGroup}>
                    <Text variant="label" className={styles.inputLabel}>Temp HP</Text>
                    <Flex direction="row" className={styles.inputWrapper}>
                        <input
                            type="number"
                            value={tempHpAmount}
                            onChange={(e) => setTempHpAmount(Number(e.target.value))}
                            className={styles.input}
                            min="0"
                            aria-label="Temporary HP amount"
                        />
                    </Flex>
                    <button
                        onClick={handleAddTempHp}
                        className={`${styles.button} ${styles.buttonTemp}`}
                        aria-label="Add temporary HP"
                        disabled={tempHpAmount <= 0}
                    >
                        <span>Add Temp</span>
                    </button>
                </Flex>
            </Flex>
        </Card>
    );
};
