import { useAppSelector } from "../../../../store/store"

export const EventPoints = ():JSX.Element => {
    const eventPoints = useAppSelector((state) => state.draft.managerStats.points)
    const currentEvent = useAppSelector((state) => state.genInfo.data?.currentGameWeekId);
    return (
        <div className="border shadow-sm rounded-md flex flex-row gap-2">
            <span className="bg-red-500 text-white rounded-l-md px-4 py-1">GW{currentEvent} Points</span>
            <span className="bg-white rounded-r-md px-4 py-1 font-bold">{eventPoints}</span>
        </div>
    )
}