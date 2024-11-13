import { useState } from "react"
import ListViewDrawer from "../ListView/ListViewDrawer"
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
    const [show, setShow ] = useState<boolean>(false);
    const openDrawer = () => {
        setShow(true)
    };
    const closeDrawer = () => {
        setShow(false)
    };
    return (
        <div className="flex flex-row justify-between px-4 h-full py-1 gap-1 md:gap-4">
            <button className="px-4 border border-black rounded-md hover:text-white hover:bg-black transition" onClick={openDrawer}>
                List View
            </button>
            

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
                <ListViewDrawer  show={show} onHide={closeDrawer}/>
        </div>
    )
}