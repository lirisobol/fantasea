import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ManagerDetails } from "../../../models/manager/ManagerDetails"
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import StatsBanner from "./StatsBanner";
interface managerStatsProps {
    managerDetails: ManagerDetails
}
export const ManagerStats = ({managerDetails}:managerStatsProps):JSX.Element => {
    console.log(managerDetails);
    const current_event = managerDetails.current_event;
    return (
        <div className="flex flex-col">
            <StatsBanner gameweek={current_event} gameweek_points={managerDetails.summary_event_points}/>
            <div className="flex flex-row justify-center">
                <h2 className="p-4 font-semibold text-2xl">
                    {managerDetails.name}
                </h2>
            </div>
            <div className="flex flex-row justify-evenly">
                <div className="p-4 text-center">
                    <span className="text-xs">Name</span>
                    <p className="text-lg font-semibold">{managerDetails.player_first_name} {managerDetails.player_last_name}</p>
                </div>
                <div className="p-4 text-center">
                    <span className="text-xs">Overall Rank</span>
                    {managerDetails.summary_overall_rank >= managerDetails.manager_history.current[current_event-2].overall_rank && (
                        <p className="text-lg font-semibold">
                            <FontAwesomeIcon icon={faCaretDown} style={{color:"#e66565", marginRight:"10px"}} size="lg"/>
                            {managerDetails.summary_overall_rank}
                        </p>
                    )}
                    {managerDetails.summary_overall_rank <= managerDetails.manager_history.current[current_event-2].overall_rank && (
                        <p className="text-lg font-semibold">
                            <FontAwesomeIcon icon={faCaretUp} style={{color:"#63E6BE", marginRight:"10px"}} size="lg"/>
                            {managerDetails.summary_overall_rank}
                        </p>
                    )}
                </div>
                
                <div className="p-4 text-center">
                    <span className="text-xs">Overall Points</span>
                    <p className="text-lg font-semibold">{managerDetails.summary_overall_points}</p>
                </div>

                <div className="p-4 text-center">
                    <span className="text-xs">GW{managerDetails.current_event} Points</span>
                    <p className="text-lg font-semibold">{managerDetails.summary_event_points}</p>
                </div>
            </div>
        </div>
    )
}
