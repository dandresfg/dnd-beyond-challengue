import { IStats } from "@/types"

export const StatsBanner = ({ stats }: { stats: IStats }) => {
    return (
        <div>
            <h5>Player Stats</h5>
            <ul>
                {Object.entries(stats).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                ))}
            </ul>
        </div>
    )
}