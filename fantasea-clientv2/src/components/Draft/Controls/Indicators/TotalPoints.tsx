import { useAppSelector } from "../../../../store/store"

export const TotalPoints = ():JSX.Element => {
    const totalPoints = useAppSelector((state) => state.draft.managerStats.total_points)
    return (
        <div className="rounded-md flex flex-col w-24 lg:w-40">
            <div className="bg-violet-500 text-white rounded-t-md text-xs lg:text-sm truncate py-1 px-1 text-center">Total Points</div>
            <div className="bg-slate-100 rounded-b-md font-bold text-xs lg:text-sm py-1 px-1 text-center">{totalPoints}</div>
        </div>
    )
}