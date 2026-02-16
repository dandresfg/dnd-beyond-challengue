import { useCharacter } from "@hooks/useCharacter"
import { StatsBanner } from "./StatsBanner";
import { HealthBanner } from "./HealthBanner";
import { Avatar } from "./Avatar";
import { Flex, FlexProps } from "@/components/Flex";
import { Text } from "@/components/Text";
import styles from "./InfoCard.module.css";

export const CharacterInfoCard = () => {
    const { player } = useCharacter();

    if (!player) return null;

    return (
        <Flex direction="column" className={styles.card}>
            <div className={styles.innerBorder}></div>

            <Flex direction="row" gap={3} align="center" className={styles.content}>
                <StatsBanner stats={player.stats} />

                <Avatar src={`${player.slug}.png`} alt={player.name} />

                <Flex direction="column" gap={2} grow={1}>
                    <Text variant="h2">{player.name}</Text>

                    <Flex direction="row" gap={5}>
                        <Flex direction="column" gap={1} grow={1}>
                            <InfoRow label="Max HP:" value={player.hitPoints} />
                            <InfoRow label="Current HP:" value={player.currentHp} />
                            <InfoRow label="Level:" value={player.level} />
                        </Flex>
                        <Flex direction="column" gap={1} grow={1}>
                            <InfoRow label="Classes:" value={player.classes.map(cls => cls.name).join(', ')} />
                            <InfoRow label="Defenses:" value={player.defenses.map(d => d.type).join(', ')} />
                        </Flex>
                    </Flex>

                    <Flex direction="column" gap={1}>
                        <Text variant="label" className={styles.itemsLabel}>ITEMS</Text>
                        <Text variant="body" className={styles.itemsList}>
                            {player.items.map(item => item.name).join(', ')}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <HealthBanner
                currentHp={player.currentHp}
                maxHp={player.hitPoints}
                tempHp={player.tempHp}
            />
        </Flex>
    )
}

interface InfoRowProps extends Omit<FlexProps, "children"> {
    label: string;
    value: string | number;
}

const InfoRow = ({ label, value, direction = 'row', justify = 'between', ...props }: InfoRowProps) => (
    <Flex direction={direction} justify={justify} align="end" className={styles.infoRow} {...props}>
        <Text variant="label">{label}</Text>
        <Text variant="value">{value}</Text>
    </Flex>
)