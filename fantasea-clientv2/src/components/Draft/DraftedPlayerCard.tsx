import { useState } from "react";
import { DraftElement } from "../../store/slices/draft"
import { Element } from "../../models/gen-info/Element";
import PlayerDetailsModalDraft from "../modals/PlayerDetailsModal/PlayerDetailsModalDraft";

interface DraftedPlayerCardProps {
    player: DraftElement
}
export const DraftedPlayerCard = ({player}:DraftedPlayerCardProps):JSX.Element => {
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

    return (
        <div className="flex flex-col w-full h-full" onClick={openDetailsModal}>
            <div className="flex justify-center">
                <img src={jerseyImagePath} alt="jersey" style={{ width: '70px', height: '90px' }} />
            </div>
            <div className="bg-white w-full flex-1 flex flex-col">
                <div className="font-semibold p-1">
                    {stats.web_name}
                </div>
                <div className="text-sm flex justify-evenly bg-slate-200 flex-1 p-1">
                    <div>
                        {stats.now_cost/10}m
                    </div>
                    <div>
                        {stats.points_per_game}
                    </div>
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