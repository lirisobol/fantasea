import { DraftElement } from "../../store/slices/draft"

interface DraftedPlayerCardProps {
    player: DraftElement
}
export const DraftedPlayerCard = ({player}:DraftedPlayerCardProps):JSX.Element => {
    const stats = player.stats;
    if(!stats) {return null}
    return (
        <div>
            {stats.web_name}
        </div>
    )
}