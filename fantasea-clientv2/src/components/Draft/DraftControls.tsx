import { DraftBudget } from "./DraftBudget"
import { ResetDraftButton } from "./ResetDraftButton"

export const DraftControls = ():JSX.Element => {
    return (
        <div className="flex flex-row justify-center content-center items-center gap-10 p-2">
            <DraftBudget />
            <ResetDraftButton />
        </div>
    )
}