import { useCharacter } from "@hooks/useCharacter"
import { StatsBanner } from "./StatsBanner";

export const CharacterInfoCard = () => {
    const { player } = useCharacter();

    if (!player) return null;

    return (
        <div>
            <h5>Character Info</h5>
            <h2>{player.name}</h2>
            <p>Level: {player.level}</p>
            <p>Hit Points: {player.hitPoints}</p>
            <p>Current HP: {player.currentHp}</p>
            <p>Temporary HP: {player.tempHp}</p>
            <StatsBanner stats={player.stats} />
            <div>
                <h5>Classes</h5>
                <ul>
                    {player.classes.map((cls) => (
                        <li key={cls.name}>{cls.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h5>Items</h5>
                <ul>
                    {player.items.map((item) => (
                        <li key={item.name}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}