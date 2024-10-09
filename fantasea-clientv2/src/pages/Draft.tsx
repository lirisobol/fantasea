import { DraftBoard } from "../components/Draft/DraftBoard"
import { DraftControls } from "../components/Draft/DraftControls"

export const Draft = ():JSX.Element => {
    return (
        <div className="flex flex-col h-full"> {/* Ensures it fits in the remaining height without additional overflow */}
            <DraftControls />
            <DraftBoard />
        </div>
    )
}