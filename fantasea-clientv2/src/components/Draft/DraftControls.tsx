import { useState } from "react";
import { DraftBudget } from "./DraftBudget"
import { ResetDraftButton } from "./ResetDraftButton"
import { TeamDrawerButton } from "./TeamDrawer/TeamDrawerButton";
import TeamDrawer from "./TeamDrawer/TeamDrawer";

export const DraftControls = ():JSX.Element => {
    const [teamDrawerShow, setTeamDrawerShow] = useState<boolean>(false);

    const handleTeamDrawerClose = () => {
        setTeamDrawerShow(false);
    }
    const handleTeamDrawerOpen = () => {
        setTeamDrawerShow(true);
    }
    return (
        <div className="flex flex-row justify-center content-center items-center gap-10 p-2">
            <DraftBudget />
            <ResetDraftButton />
            <TeamDrawerButton handleOpen={handleTeamDrawerOpen} />
            <TeamDrawer show={teamDrawerShow} handleClose={handleTeamDrawerClose}/>
        </div>
    )
}