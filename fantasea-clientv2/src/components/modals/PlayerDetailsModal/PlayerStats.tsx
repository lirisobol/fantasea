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
        <div className="flex flex-col md:flex-row justify-evenly gap-2">
            <div className="flex flex-row md:flex-col gap-1 justify-between items-center">
                <span className="text-xs md:text-sm">Price</span>
                {player.now_cost/10 === playerStatsPreviousWeek?.value/10 && 
                    <span className="font-bold text-sm md:text-xl">
                        {player.now_cost/10}m
                    </span>}
                {player.now_cost/10 > playerStatsPreviousWeek?.value/10 && 
                    <span className="font-bold text-sm md:text-xl">{player.now_cost/10}m
                        <FontAwesomeIcon icon={faCaretUp} style={{color:"#63E6BE", marginLeft:"10px"}} size="lg"/>
                    </span>
                }
                {player.now_cost/10 < playerStatsPreviousWeek?.value/10 && 
                    <span className="font-bold text-sm md:text-xl">{player.now_cost/10}m
                        <FontAwesomeIcon icon={faCaretDown} style={{color:"#e66565", marginLeft:"10px"}} size="lg"/>
                    </span>
                }
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
                <span className="text-xs md:text-sm">Selected</span>
                <span className="font-bold text-sm md:text-xl">{player.selected_by_percent} %</span>
            </div>
            <div className="flex flex-row md:flex-col gap-1 justify-between items-center">
                <span className="text-xs md:text-sm">ICT Index</span>
                <span className="font-bold text-sm md:text-xl">{player.ict_index}</span>
            </div>
      </div>
    )
}