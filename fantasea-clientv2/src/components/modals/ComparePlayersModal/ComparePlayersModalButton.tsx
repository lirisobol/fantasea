import { UserPlusIcon } from "@heroicons/react/20/solid";
interface ComparePlayersModalButtonProps {
    openModal:() => void;
}
export const ComparePlayersModalButton = ({openModal}:ComparePlayersModalButtonProps) => {
    return (
        <div className="content-center mt-2">
            <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
            Select Player
            <UserPlusIcon aria-hidden="true" className="h-5 w-5" />
            </button>
        </div>

    )
}