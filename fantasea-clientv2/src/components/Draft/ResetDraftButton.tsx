import { resetDraft } from "../../store/slices/draft"
import { useAppDispatch } from "../../store/store"

export const ResetDraftButton = ():JSX.Element => {
    const dispatch = useAppDispatch()
    const handleReset = () => {
        dispatch(resetDraft());
    };
    return (
        <button 
            onClick={handleReset}
            className="
                inline-flex items-center 
                gap-x-1.5 
                rounded-lg
                px-5 py-2
                text-xs sm:text-sm 
                bg-red-600 font-normal text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Reset
        </button>
    )
}