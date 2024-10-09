import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element"
import { PlayerHistoryItem } from "../../../models/PlayerHistoryItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../store/store";

interface PlayerStatsProps {
    player: Element;
    history: PlayerHistoryItem[]
    currentGameweek: number;
}
export const PlayerStats = ({player, history, currentGameweek}: PlayerStatsProps):JSX.Element => {
    const totalPlayers = useAppSelector((state) => state.genInfo.data?.total_players);
    const [playerStatsPreviousWeek, setPlayerStatsPreviousWeek] = useState<PlayerHistoryItem | null>(null);
    const [playerStatsThisWeek, setPlayerStatsThisWeek] = useState<PlayerHistoryItem | null>(null);

    const totalPlayersSafe = totalPlayers || 1; // Prevent division by zero

    useEffect(() => {
        if(!player.isPlaceholder && history) {
            const previousStats:PlayerHistoryItem = history.find(historyItem => historyItem.round === currentGameweek-1)
            setPlayerStatsPreviousWeek(previousStats);   
            const currentStats: PlayerHistoryItem = history.find(historyItem => historyItem.round === currentGameweek);
            setPlayerStatsThisWeek(currentStats)

        }
    }, [currentGameweek, history, player.isPlaceholder])
      // Calculate selection percentages
    const selectedPercentThisWeek =
        playerStatsThisWeek?.selected
        ? (playerStatsThisWeek.selected / totalPlayersSafe) * 100
        : 0;

    const selectedPercentPreviousWeek =
        playerStatsPreviousWeek?.selected
        ? (playerStatsPreviousWeek.selected / totalPlayersSafe) * 100
        : 0;

    const formattedSelectedPercentThisWeek = selectedPercentThisWeek.toFixed(1);

    
    return (
        <div className="flex flex-col md:flex-row justify-evenly gap-2">
            <div className="flex flex-row md:flex-col gap-1 justify-between items-center">
                <span className="text-xs md:text-sm">Price</span>
                {player.now_cost/10 === playerStatsPreviousWeek?.value/10 && 
                    <span className="font-bold text-sm md:text-xl">
                        {player.now_cost/10}m
                    </span>}
                {player.now_cost/10 > playerStatsPreviousWeek?.value/10 && 
                    <span className="font-bold text-sm md:text-xl">
                        <FontAwesomeIcon icon={faCaretUp} style={{color:"#63E6BE", marginRight:"10px"}} size="lg"/>
                        {player.now_cost/10}m
                    </span>
                }
                {player.now_cost/10 < playerStatsPreviousWeek?.value/10 && 
                    <span className="font-bold text-sm md:text-xl">
                        <FontAwesomeIcon icon={faCaretDown} style={{color:"#e66565", marginRight:"10px"}} size="lg"/>
                        {player.now_cost/10}m
                    </span>
                }
            </div>
            <div className="flex flex-row md:flex-col gap-1 justify-between items-center">
                <span className="text-xs md:text-sm">Transfers Balance</span>
                {playerStatsThisWeek?.transfers_balance === playerStatsPreviousWeek?.transfers_balance && 
                    <span className="font-bold text-sm md:text-xl">
                        {playerStatsThisWeek?.transfers_balance}
                    </span>}
                {playerStatsThisWeek?.transfers_balance > playerStatsPreviousWeek?.transfers_balance && 
                    <span className="font-bold text-sm md:text-xl">
                        <FontAwesomeIcon icon={faCaretUp} style={{color:"#63E6BE", marginRight:"10px"}} size="lg"/>
                        {playerStatsThisWeek?.transfers_balance}
                    </span>
                }
                {playerStatsThisWeek?.transfers_balance < playerStatsPreviousWeek?.transfers_balance && 
                    <span className="font-bold text-sm md:text-xl">
                        <FontAwesomeIcon icon={faCaretDown} style={{color:"#e66565", marginRight:"10px"}} size="lg"/>
                        {playerStatsThisWeek?.transfers_balance}
                    </span>
                }
            </div>
            <div className="flex flex-row md:flex-col gap-1 justify-between items-center">
              <span className="text-xs md:text-sm">Selected</span>
              {selectedPercentThisWeek === selectedPercentPreviousWeek && (
                <span className="font-bold text-sm md:text-xl">
                  {formattedSelectedPercentThisWeek}%
                </span>
              )}
              {selectedPercentThisWeek > selectedPercentPreviousWeek && (
                <span className="font-bold text-sm md:text-xl">
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    style={{ color: "#63E6BE", marginRight: "10px" }}
                    size="lg"
                  />
                  {formattedSelectedPercentThisWeek}%
                </span>
              )}
              {selectedPercentThisWeek < selectedPercentPreviousWeek && (
                <span className="font-bold text-sm md:text-xl">
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ color: "#e66565", marginRight: "10px" }}
                    size="lg"
                  />
                  {formattedSelectedPercentThisWeek}%
                </span>
              )}
            </div>
            <div className="flex flex-row md:flex-col gap-1 justify-between items-center">
                <span className="text-xs md:text-sm">Pts / Game</span>
                <span className="font-bold text-sm md:text-xl">{player.points_per_game}</span>
            </div>
            <div className="flex flex-row md:flex-col gap-1 justify-between items-center">
                <span className="text-xs md:text-sm">Form</span>
                <span className="font-bold text-sm md:text-xl">{player.form}</span>
            </div>

            <div className="flex flex-row md:flex-col gap-1 justify-between items-center">
                <span className="text-xs md:text-sm">ICT Index</span>
                <span className="font-bold text-sm md:text-xl">{player.ict_index}</span>
            </div>
      </div>
    )
}