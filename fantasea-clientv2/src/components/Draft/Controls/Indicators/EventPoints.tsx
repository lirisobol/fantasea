import { useAppSelector } from "../../../../store/store"

export const EventPoints = ():JSX.Element => {
    const eventPoints = useAppSelector((state) => state.draft.managerStats.points)
    const currentEvent = useAppSelector((state) => state.genInfo.data?.currentGameWeekId);
    return (
        <div className="rounded-md flex flex-col w-24 lg:w-40">
            <div className="bg-red-500 text-white rounded-t-md text-xs lg:text-sm truncate py-1 px-1 text-center">GW{currentEvent} Points</div>
            <div className="bg-slate-100 rounded-b-md font-bold text-xs lg:text-sm py-1 px-1 text-center">{eventPoints}</div>
        </div>
    )
}