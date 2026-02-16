import { useCharacter } from "@hooks/useCharacter"
import { StatsBanner } from "./StatsBanner";
import { Flex } from "@/components/Flex";

export const CharacterInfoCard = () => {
    const { player } = useCharacter();

    if (!player) return null;

    return (
        <div style={{ padding: '1rem', borderRadius: 16, margin: "2rem" }}>
            <Flex direction="row" gap={3} align="center">
                <StatsBanner stats={player.stats} />
                <Flex gap={2}>
                    <img src={`${player.slug}.png`} alt={player.name} width={300} height={300} style={{ borderRadius: '50%' }} />
                </Flex>
                <Flex gap={2}>
                    <Flex>
                        <h2>{player.name}</h2>
                        <p>Max HP: {player.hitPoints}</p>
                        <p>Current HP: {player.currentHp}</p>
                        <p>Level: {player.level}</p>
                        <p>Temporary HP: {player.tempHp}</p>
                    </Flex>
                    <Flex grow={1}>
                        <h5>Items</h5>
                        <ul>
                            {player.items.map((item) => (
                                <li key={item.name}>{item.name}</li>
                            ))}
                        </ul>
                    </Flex>
                    <Flex direction="row">
                        <Flex grow={1}>
                            <h5>Classes</h5>
                            <ul>
                                {player.classes.map((cls) => (
                                    <li key={cls.name}>{cls.name}</li>
                                ))}
                            </ul>
                        </Flex>
                        <Flex grow={1}>
                            <h5>Defenses</h5>
                            <ul>
                                {player.defenses.map((defense) => (
                                    <li key={defense.type}>{defense.type}</li>
                                ))}
                            </ul>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}