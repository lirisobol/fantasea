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
            text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"      >
            List View
      </button>
    )
}