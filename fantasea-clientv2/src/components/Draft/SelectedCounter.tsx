import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store"
import { countPlayers } from "./TeamDrawer/teamHelpers";

export const SelectedCounter = ():JSX.Element => {
    const squad = useAppSelector((state) => state.draft.players.squad);
    const bench = useAppSelector((state) => state.draft.players.bench); 
    const [teamLength, setTeamLength] = useState<number>(0);

    useEffect(() => {
        const squadLength = countPlayers(squad, bench);
        setTeamLength(squadLength)        
    }, [squad, bench])

    return (
        <div className="
        flex flex-row gap-1 sm:gap-x-1.5
        px-3 py-2  
        rounded-lg
        justify-center
        text-xs sm:text-sm 
        text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <span>Selected </span>
        <span className="font-semibold text-gray-700">
            <span className="font-bold">{teamLength}</span>
            <span> / 15</span>
        </span>
    </div>
    )
}