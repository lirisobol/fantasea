import { MinusIcon } from "@heroicons/react/20/solid"
import { useAppDispatch } from "../../store/store"
import { removePlayer } from "../../store/slices/player-compare";

interface PlayerRemoverButtonProps {
    playerId: number
}
export const PlayerRemoverButton = ({playerId}: PlayerRemoverButtonProps):JSX.Element => {
    const dispatch = useAppDispatch();
    const handleRemove = () => {
        console.log(playerId);
        
        dispatch(removePlayer(playerId));
    };
    return (
        <>
        <button
            onClick={handleRemove}
            type="button"
            className="rounded-full bg-red px-1 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
            <MinusIcon aria-hidden="true" className="h-4 w-4" />
        </button>
    </>
    )

}