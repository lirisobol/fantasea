import { useAppSelector } from "../../../../store/store"

export const OverallRank = ():JSX.Element => {
    const overallRank = useAppSelector((state) => state.draft.managerStats.overall_rank)
    return (
        <div className="rounded-md flex flex-col w-24 lg:w-40">
            <div className="bg-black text-white rounded-t-md text-xs lg:text-sm truncate py-1 px-1 text-center">Overall Rank</div>
            <div className="bg-slate-100 rounded-b-md font-bold text-xs lg:text-sm py-1 px-1 text-center">{overallRank}</div>
        </div>
    )
}