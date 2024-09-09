import { useAppSelector } from "../../store/store";

export const DraftBudget = ():JSX.Element => {
    const budget = useAppSelector((state) => state.draft.budget);
    
    return (
        <div className="flex flex-row gap-x-1.5 shadow border px-3 py-1.5 rounded-lg bg-gray-200">
            <span>Budget -</span>
            <span className="font-semibold text-green-700">
                {budget}m
            </span>
        </div>
    )
}