interface ModalButtonProps {
    openModal:() => void;
}
export const ModalButton = ({openModal}:ModalButtonProps) => {
    return (
        <div className="inset-0 flex items-center justify-center">
            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
            Advanced Filters
            </button>
        </div>
    )
}