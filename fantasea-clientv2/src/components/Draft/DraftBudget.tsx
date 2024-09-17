import { useAppSelector } from "../../store/store";

export const DraftBudget = ():JSX.Element => {
    const budget = useAppSelector((state) => state.draft.budget).toFixed(1)
    
    return (
        <div className="
            flex flex-row gap-1 sm:gap-x-1.5
            px-3 py-2  
            rounded-lg
            justify-center
            text-xs 
            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span>Budget </span>
            <span className="font-semibold text-green-700">
                {budget}m
            </span>
        </div>
    )
}