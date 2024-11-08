import { Board } from "../components/Draft/Board"
import { DraftControls } from "../components/Draft/Controls/DraftControls"
import { useAppSelector } from "../store/store"

export const Draft = ():JSX.Element => {
    const isLive = useAppSelector<boolean>((state) => state.draft.isLive)
    return (
        // Draft Page
        <div className="flex flex-col h-full">
            <div className="h-24">
                <DraftControls isLive={isLive}/>
            </div>
            <Board />
        </div>
    )
}