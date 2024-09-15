import { XMarkIcon } from "@heroicons/react/16/solid"
import { useAppDispatch } from "../../../store/store";
import { removePlayerFromBench, removePlayerFromSquad } from "../../../store/slices/draft/draft";

interface PlayerRemoverProps {
    index:number;
    elementType: number;
    isBench: boolean;
}
export const PlayerRemover = ({index, elementType, isBench}: PlayerRemoverProps):JSX.Element => {
    const dispatch = useAppDispatch();
    const removePlayer = () => {
        if(elementType) {
            if(isBench) {
                dispatch(removePlayerFromBench(index))
            }
            else {
                dispatch(removePlayerFromSquad({ index, element_type: elementType }));
            }
        }
    }
    return (
        <button
            type="button"
            onClick={removePlayer}
            className="rounded-md text-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            <XMarkIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500"
            />
        </button>
    )
}