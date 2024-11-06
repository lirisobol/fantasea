import { Board } from "../components/Draft/Board"
import { DraftControls } from "../components/Draft/Controls/DraftControls"

export const Draft = ():JSX.Element => {
    return (
        // Draft Page
        <div className="flex flex-col h-full">
            <div className="h-24">
                <DraftControls />
            </div>
            <Board />
        </div>
    )
}