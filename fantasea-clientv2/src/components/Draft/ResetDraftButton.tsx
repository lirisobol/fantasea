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
            className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Reset Draft
        </button>
    )
}