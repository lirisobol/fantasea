import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
interface AdvancedFiltersModalButtonProps {
    openModal:() => void;
}
export const AdvancedFiltersModalButton = ({openModal}:AdvancedFiltersModalButtonProps) => {
    return (
        <div className="content-center mt-2">
            <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-3 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
            Advanced Filters
            <AdjustmentsHorizontalIcon aria-hidden="true" className="h-5 w-5" />
            </button>
        </div>

    )
}