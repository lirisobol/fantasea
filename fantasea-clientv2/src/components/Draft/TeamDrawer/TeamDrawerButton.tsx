import { ArrowLeftIcon } from "@heroicons/react/16/solid"
interface TeamDrawerButtonProps {
    handleOpen: () => void;
}
export const TeamDrawerButton = ({handleOpen}: TeamDrawerButtonProps):JSX.Element => {
    return (
        <button
        onClick={handleOpen}
        type="button"
        className="
            flex content-center justify-center
            w-20
            rounded-lg
            px-3 py-2
            text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"      >
        <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
      </button>
    )
}