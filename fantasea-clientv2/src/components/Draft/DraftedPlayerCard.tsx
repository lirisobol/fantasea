import { useState } from "react";
import { DraftElement } from "../../store/slices/draft"
import { Element } from "../../models/gen-info/Element";
import PlayerDetailsModalDraft from "../modals/PlayerDetailsModal/PlayerDetailsModalDraft";
import { useAppSelector } from "../../store/store";
import { generalHelpers } from "../../services/general-helpers/general-helpers";
import { Team } from "../../models/gen-info/Team";

interface DraftedPlayerCardProps {
    player: DraftElement
}
export const DraftedPlayerCard = ({player}:DraftedPlayerCardProps):JSX.Element => {
    const currentGameWeekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);
    const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
    const [detailsModalShow, setDetailsModalShow] = useState<boolean>(false)
    const openDetailsModal = () => {
        setDetailsModalShow(true);
    };
    const HideDetailsModal = () => {
        setDetailsModalShow(false);
    };
    
    
    const jerseyImagePath = player && player.stats?.team_code ? `/assets/images/kits/${player.stats.team_code}.png` : '/assets/images/kits/default.png';
    const stats = player.stats;
    if(!stats) {return null}
    const playerTeam = generalHelpers.getTeamByPlayer(player.stats as Element, teams)
    const nextGameForTeam = generalHelpers.getNextGameForClub(playerTeam, currentGameWeekId);
    const opponentId = generalHelpers.getOpponentTeamId(nextGameForTeam, playerTeam);
    const opponentShortName = generalHelpers.getTeamShortNameById(opponentId, teams);
    const difficulty = generalHelpers.getDifficultyRating(nextGameForTeam, playerTeam.id);
    const difficultyColor = generalHelpers.getDifficultyColor(difficulty);
    const textColor = generalHelpers.getTextColor(difficultyColor);
    const isOpponentHome = generalHelpers.isOpponentHome(nextGameForTeam, opponentId);


    return (
        <div className="flex flex-col" onClick={openDetailsModal}>
            <div className="flex justify-center">
                <img src={jerseyImagePath} alt="jersey" className="md:w-[100px] md:h-[90px] w-[40px] h-[40px]" />
            </div>

            <div className="w-full flex flex-col">
                <div className="font-semibold p-0.5 md:px-2 md:py-1 bg-white rounded-t-lg text-xs truncate">
                    {stats.web_name}
                </div>
                <div className="text-xs/3 flex justify-around items-center bg-violet-950 flex-1 p-0.5 md:px-2 md:py-1 text-white text-xs">
                    <div className="font-semibold truncate">
                        {stats.now_cost/10}
                    </div>
                    <div className="font-semibold truncate">
                        {stats.points_per_game}
                    </div>
                </div>
                <div className={`text-xs/3 flex justify-center items-center gap-2 flex-1 px-1 py-0.5 md:px-2 md:py-1 rounded-b-lg bg-${difficultyColor} text-${textColor}`}>
                    {opponentShortName}
                    <span className="font-semibold">{isOpponentHome ? "(A)" : "(H)"}</span>
                </div>
            </div>
            
            <PlayerDetailsModalDraft 
                show={detailsModalShow}
                onHide={HideDetailsModal}
                player={player.stats as Element}
            />
        </div>
    )
}