import { useAppSelector } from "../../../../store/store"

export const OverallRank = ():JSX.Element => {
    const overallRank = useAppSelector((state) => state.draft.managerStats.overall_rank)
    return (
        <div className="border shadow-sm rounded-md flex flex-row gap-2">
            <span className="bg-black text-white rounded-l-md px-4 py-1">Overall Rank</span>
            <span className="bg-white rounded-r-md px-4 py-1 font-bold">{overallRank}</span>
        </div>
    )
}