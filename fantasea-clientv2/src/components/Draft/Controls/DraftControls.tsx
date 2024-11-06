import { ImportDraft } from "./Actions/ImportDraft"
import { ResetDraft } from "./Actions/ResetDraft"
import { ShareDraft } from "./Actions/ShareDraft"
import { BenchCounter } from "./Indicators/BenchCounter"
import { Budget } from "./Indicators/Budget"
import { SquadCounter } from "./Indicators/SquadCounter"

export const DraftControls = ():JSX.Element => {
    return (
        <div className="flex flex-row items-center h-full px-20 justify-between">
            {/* Indicators */}
            <div className="flex flex-row gap-2">
                <Budget />
                <SquadCounter />
                <BenchCounter />
            </div>

            {/* Actions */}
            <div className="flex flex-row gap-2">
                <ResetDraft />
                <ImportDraft />
                <ShareDraft />
            </div>
        </div>
    )
}