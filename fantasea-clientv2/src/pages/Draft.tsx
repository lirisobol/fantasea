import { useState } from "react"
import { DraftBoard } from "../components/Draft/DraftBoard"
import { DraftControls } from "../components/Draft/DraftControls"
import TeamDrawer from "../components/Draft/DraftDrawer"
import { TeamDrawerButton } from "../components/Draft/TeamDrawerButton"

export const Draft = ():JSX.Element => {
    const [teamDrawerShow, setTeamDrawerShow] = useState<boolean>(false);

    const handleTeamDrawerClose = () => {
        setTeamDrawerShow(false);
    }
    const handleTeamDrawerOpen = () => {
        setTeamDrawerShow(true);
    }

    return (
        <div className="flex flex-col h-full"> {/* Ensures it fits in the remaining height without additional overflow */}
            <DraftControls />
            <DraftBoard />
            <TeamDrawerButton handleOpen={handleTeamDrawerOpen} />
            <TeamDrawer show={teamDrawerShow} handleClose={handleTeamDrawerClose}/>
        </div>
    )
}