import { ResetDraftButton } from "./ResetDraftButton"

export const DraftControls = ():JSX.Element => {
    return (
        <div className="flex flex-row justify-center">
            <ResetDraftButton />
        </div>
    )
}