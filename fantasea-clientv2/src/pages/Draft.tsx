import { DraftBoard } from "../components/Draft/DraftBoard"
import { DraftControls } from "../components/Draft/DraftControls"

export const Draft = ():JSX.Element => {
    return (
        <div className="flex flex-col justify-center h-full py-4"> {/* Ensures it fits in the remaining height without additional overflow */}
            <DraftControls />
            <DraftBoard />
        </div>
    )
}