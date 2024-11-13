import { useAppSelector } from "../../../../store/store"

export const OverallRank = ():JSX.Element => {
    const overallRank = useAppSelector((state) => state.draft.managerStats.overall_rank)
    return (
        <div className="rounded-md flex flex-col w-24 md:w-40">
            <div className="bg-black text-white rounded-t-md text-xs md:text-sm truncate py-1 px-1 border text-center">Overall Rank</div>
            <div className="bg-slate-100 rounded-b-md font-bold text-xs md:text-sm py-1 px-1 border text-center">{overallRank}</div>
        </div>
    )
}