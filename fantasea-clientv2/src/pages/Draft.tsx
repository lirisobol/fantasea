import { Board } from "../components/Draft/Board"
import { DraftControls } from "../components/Draft/Controls/DraftControls"
import { KeySchedule } from "../components/Draft/KeySchedule/KeySchedule"
import { useAppSelector } from "../store/store"

export const Draft = ():JSX.Element => {
    const isLive = useAppSelector<boolean>((state) => state.draft.isLive)
    return (
        // Draft Page
        <div className="flex flex-col h-full">
            <div className="">
                <DraftControls isLive={isLive}/>
            </div>
            <div className="flex flex-row">
                <div className="w-3/4 h-full">
                    <Board />
                </div>
                <div className="w-2/6">
                    <KeySchedule />
                </div>
            </div>
        </div>
    )
}