import { useAppSelector } from "../../../../store/store"

export const TotalPoints = ():JSX.Element => {
    const totalPoints = useAppSelector((state) => state.draft.managerStats.total_points)
    return (
        <div className="border shadow-sm rounded-md flex flex-row gap-2">
            <span className="bg-orange-500 text-white rounded-l-md px-4 py-1">Total Points</span>
            <span className="bg-white rounded-r-md px-4 py-1 font-bold">{totalPoints}</span>
        </div>
    )
}