import { DraftElement } from "../../store/slices/draft"
import { DraftedPlayerCard } from "./DraftedPlayerCard"
import { EmptyCard } from "./EmpyCard"

interface PlayerCardProps {
    player: DraftElement
}
export const PlayerCard = ({player}:PlayerCardProps):JSX.Element => {
    return (
        <div className="w-20 h-24 md:w-32 md:h-40 text-center flex justify-center">
            {player.isPicked ? (
                <DraftedPlayerCard player={player}/>
            ): (
                <EmptyCard player={player}/>
            )
            }
        </div>
    )
}