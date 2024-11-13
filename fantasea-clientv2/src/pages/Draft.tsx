import { Board } from "../components/Draft/Board"
import { DraftControls } from "../components/Draft/Controls/DraftControls"
import ListView from "../components/Draft/ListView/ListView"
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
                <div className="w-1/6 h-full">
                    <ListView />
                </div>
                <div className="w-4/6 h-full">
                    <Board />
                </div>
                <div className="bg-slate-100 w-1/6">
                    Key Matches
                </div>
            </div>
        </div>
    )
}