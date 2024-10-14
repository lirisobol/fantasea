import { ManagerDetails } from "../../../models/ManagerDetails"

interface ManagerStatsProps {
    managerStats: ManagerDetails
}
export const ManagerStats = ({managerStats}:ManagerStatsProps):JSX.Element => {
    console.log(managerStats);
    
    return (
        <div className="flex flex-col border w-10/12 shadow">
            <div className="flex flex-row justify-center border w-full">
                <h2 className="p-4 font-semibold text-2xl">
                    {managerStats.name}
                </h2>
            </div>
            <div className="flex flex-row justify-evenly border">
                <div className="p-4 text-center">
                    <span className="text-xs">Name</span>
                    <p className="text-lg font-semibold">{managerStats.player_first_name} {managerStats.player_last_name}</p>
                </div>
                <div className="p-4 text-center">
                    <span className="text-xs">Overall Rank</span>
                    <p className="text-lg font-semibold">{managerStats.summary_overall_rank}</p>
                </div>
                <div className="p-4 text-center">
                    <span className="text-xs">Overall Points</span>
                    <p className="text-lg font-semibold">{managerStats.summary_overall_points}</p>
                </div>
                <div className="p-4 text-center">
                    <span className="text-xs">GW{managerStats.current_event} Rank</span>
                    <p className="text-lg font-semibold">{managerStats.summary_event_rank}</p>
                </div>
                <div className="p-4 text-center">
                    <span className="text-xs">GW{managerStats.current_event} Points</span>
                    <p className="text-lg font-semibold">{managerStats.summary_event_points}</p>
                </div>
            </div>
        </div>
    )
}