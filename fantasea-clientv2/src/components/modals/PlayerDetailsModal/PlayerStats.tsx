import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element"
import { PlayerHistoryItem } from "../../../models/PlayerHistoryItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface PlayerStatsProps {
    player: Element;
    history: PlayerHistoryItem[]
    currentGameweek: number;
}
export const PlayerStats = ({player, history, currentGameweek}: PlayerStatsProps):JSX.Element => {
    
    const [playerStatsPreviousWeek, setPlayerStatsPreviousWeek] = useState<PlayerHistoryItem | null>(null);

    useEffect(() => {
        if(!player.isPlaceholder && history) {
            const stats:PlayerHistoryItem = history.find(historyItem => historyItem.round === currentGameweek-1)
            setPlayerStatsPreviousWeek(stats);            
        }
    }, [currentGameweek, history, player.isPlaceholder])
    

    return (
        <div className="flex flex-wrap gap-4 sm:flex-row sm:gap-0 justify-evenly rounded-lg bg-slate-100 p-4">
        <div className="flex flex-col gap-1 justify-center items-center">
            <span className="text-xs sm:text-sm">Price</span>
            {player.now_cost/10 === playerStatsPreviousWeek?.value/10 && 
                <span className="font-bold text-sm sm:text-xl">
                    {player.now_cost/10}m
                </span>}
            {player.now_cost/10 > playerStatsPreviousWeek?.value/10 && 
                <span className="font-bold text-sm sm:text-xl">{player.now_cost/10}m
                    <FontAwesomeIcon icon={faCaretUp} style={{color:"#63E6BE", marginLeft:"10px"}} size="lg"/>
                </span>
            }
            {player.now_cost/10 < playerStatsPreviousWeek?.value/10 && 
                <span className="font-bold text-sm sm:text-xl">{player.now_cost/10}m
                    <FontAwesomeIcon icon={faCaretDown} style={{color:"#e66565", marginLeft:"10px"}} size="lg"/>
                </span>
            }
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
            <span className="text-xs sm:text-sm">Pts / Game</span>
            <span className="font-bold text-sm sm:text-xl">{player.points_per_game}</span>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
            <span className="text-xs sm:text-sm">Form</span>
            <span className="font-bold text-sm sm:text-xl">{player.form}</span>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
            <span className="text-xs sm:text-sm">Selected</span>
            <span className="font-bold text-sm sm:text-xl">{player.selected_by_percent} %</span>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
            <span className="text-xs sm:text-sm">ICT Index</span>
            <span className="font-bold text-sm sm:text-xl">{player.ict_index}</span>
        </div>
      </div>
    )
}