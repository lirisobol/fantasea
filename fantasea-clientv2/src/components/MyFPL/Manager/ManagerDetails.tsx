import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ManagerDetails } from "../../../models/manager/ManagerDetails";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface ManagerStatsProps {
  managerDetails: ManagerDetails;
}

export const ManagerStats = ({ managerDetails }: ManagerStatsProps): JSX.Element => {
  const current_event = managerDetails.current_event;
  const previous_overall_rank = managerDetails.manager_history.current[current_event - 2]?.overall_rank || managerDetails.summary_overall_rank;

  // Determine rank change direction
  const rankImproved = managerDetails.summary_overall_rank < previous_overall_rank;
  const rankIcon = rankImproved ? faCaretUp : faCaretDown;
  const rankIconColor = rankImproved ? "#63E6BE" : "#e66565";

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <h2 className="p-4 font-semibold text-2xl">{managerDetails.name}</h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-evenly pb-5">
        {/* Name */}
        <div className="p-2 flex flex-col items-center sm:items-start">
          <div className="text-xs text-center sm:text-left">Name</div>
          <p className="text-xs sm:text-sm font-semibold">
            {managerDetails.player_first_name} {managerDetails.player_last_name}
          </p>
        </div>
        {/* Rank */}
        <div className="p-2 flex flex-col items-center sm:items-start">
          <div className="text-xs text-center sm:text-left">Rank</div>
          <p className="text-xs sm:text-sm font-semibold flex items-center">
            <FontAwesomeIcon
              icon={rankIcon}
              style={{ color: rankIconColor, marginRight: "10px" }}
              size="lg"
            />
            {managerDetails.summary_overall_rank.toLocaleString()}
          </p>
        </div>
        {/* Points */}
        <div className="p-2 flex flex-col items-center sm:items-start">
          <div className="text-xs text-center sm:text-left">Points</div>
          <p className="text-xs sm:text-sm font-semibold">{managerDetails.summary_overall_points}</p>
        </div>
        {/* Current GW Points */}
        <div className="p-2 flex flex-col items-center sm:items-start">
          <div className="text-xs text-center sm:text-left">GW{current_event} Points</div>
          <p className="text-xs sm:text-sm font-semibold">{managerDetails.summary_event_points}</p>
        </div>
      </div>
    </div>
  );
};
