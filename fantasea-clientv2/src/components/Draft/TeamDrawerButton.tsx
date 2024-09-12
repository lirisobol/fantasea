import { ArrowLeftIcon } from "@heroicons/react/16/solid"
interface TeamDrawerButtonProps {
    handleOpen: () => void;
}
export const TeamDrawerButton = ({handleOpen}: TeamDrawerButtonProps):JSX.Element => {
    return (
        <button
        onClick={handleOpen}
        type="button"
        className="absolute right-0 bg-indigo-600 p-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-96"
      >
        <ArrowLeftIcon aria-hidden="true" className="h-20 w-3" />
      </button>
    )
}