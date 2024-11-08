import { useAppSelector } from "../../../../store/store"

export const Budget = ():JSX.Element => {
    const budget = useAppSelector((state) => state.draft.budget);
    return (
        <div className="border shadow-sm rounded-md flex flex-row gap-2">
            <span className="bg-teal-500 text-white rounded-l-md px-4 py-1">Budget</span>
            <span className="bg-white rounded-r-md px-4 py-1 font-bold">{budget}m</span>
        </div>
    )
}