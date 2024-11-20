import { useAppSelector } from "../../../../store/store"

export const Budget = ():JSX.Element => {
    const budget = useAppSelector((state) => state.draft.budget);
    return (
        <div className="rounded-md flex flex-col w-24 lg:w-40">
            <div className="bg-teal-500 text-white rounded-t-md text-xs lg:text-sm truncate py-1 px-1  text-center">Budget</div>
            <div className="bg-slate-100 rounded-b-md font-bold text-xs lg:text-sm py-1 px-1 text-center">{budget.toFixed(2)} M</div>
        </div>
    )
}