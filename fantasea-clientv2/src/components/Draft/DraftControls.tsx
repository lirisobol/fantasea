import { useState } from "react";
import { DraftBudget } from "./DraftBudget"
import { ResetDraftButton } from "./ResetDraftButton"
import { TeamDrawerButton } from "./TeamDrawer/TeamDrawerButton";
import TeamDrawer from "./TeamDrawer/TeamDrawer";
import { SelectedCounter } from "./SelectedCounter";

export const DraftControls = ():JSX.Element => {
    const [teamDrawerShow, setTeamDrawerShow] = useState<boolean>(false);

    const handleTeamDrawerClose = () => {
        setTeamDrawerShow(false);
    }
    const handleTeamDrawerOpen = () => {
        setTeamDrawerShow(true);
    }
    return (
        <div className="flex flex-row justify-between content-center items-center gap-2 sm:gap-20 px-5 py-2">
            <div className="flex flex-row gap-2">
                <ResetDraftButton />
                <DraftBudget />
                <SelectedCounter />
            </div>
            <div>
                <TeamDrawerButton handleOpen={handleTeamDrawerOpen} />
            </div>
            <TeamDrawer show={teamDrawerShow} handleClose={handleTeamDrawerClose}/>
        </div>
    )
}