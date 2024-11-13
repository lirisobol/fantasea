import { ImportDraft } from "./Actions/Import/ImportDraft"
import { ResetDraft } from "./Actions/ResetDraft"
import { ShareDraft } from "./Actions/ShareDraft"
import { Budget } from "./Indicators/Budget"
import { EventPoints } from "./Indicators/EventPoints"
import { OverallRank } from "./Indicators/OverallRank"
import { TotalPoints } from "./Indicators/TotalPoints"

interface DraftControlsProps {
    isLive: boolean;
}
export const DraftControls = ({isLive}:DraftControlsProps):JSX.Element => {
    return (
        <div className="flex flex-row justify-center h-full py-1 gap-1 md:gap-4">
            {/* Indicators */}
            <Budget />
            {isLive &&
            <>
                <OverallRank />
                <TotalPoints />
                <EventPoints />
            </>
            }
            {/* Actions */}
                <div className="flex flex-row gap-2">
                    <ResetDraft />
                    <ImportDraft />
                    <ShareDraft />
                </div>
        </div>
    )
}