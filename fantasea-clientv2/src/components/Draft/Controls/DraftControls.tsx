import { ImportDraft } from "./Actions/Import/ImportDraft"
import { ResetDraft } from "./Actions/ResetDraft"
import { ShareDraft } from "./Actions/ShareDraft"
import { BenchCounter } from "./Indicators/BenchCounter"
import { Budget } from "./Indicators/Budget"
import { EventPoints } from "./Indicators/EventPoints"
import { OverallRank } from "./Indicators/OverallRank"
import { SquadCounter } from "./Indicators/SquadCounter"
import { TotalPoints } from "./Indicators/TotalPoints"

interface DraftControlsProps {
    isLive: boolean;
}
export const DraftControls = ({isLive}:DraftControlsProps):JSX.Element => {
    return (
        <div className="flex flex-row items-center h-full px-20 justify-between">
            {/* Indicators */}
            <div className="flex flex-row gap-2">
                <Budget />
                <SquadCounter />
                <BenchCounter />
            </div>
            {isLive &&
                <div className="flex flex-row gap-2">
                    <OverallRank />
                    <TotalPoints />
                    <EventPoints />
                </div>
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