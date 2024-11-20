import { DraftElement } from "../../store/slices/draft"
import { DraftedPlayerCard } from "./DraftedPlayerCard"
import { EmptyCard } from "./EmpyCard"

interface PlayerCardProps {
    player: DraftElement
}
export const PlayerCard = ({player}:PlayerCardProps):JSX.Element => {
    return (
        <div className="w-12 h-16 md:w-24 md:h-32 text-center flex justify-center">
            {player.isPicked ? (
                <DraftedPlayerCard player={player}/>
            ): (
                <EmptyCard player={player}/>
            )
            }
        </div>
    )
}