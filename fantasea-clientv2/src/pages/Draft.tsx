import { Board } from "../components/Draft/Board"

export const Draft = ():JSX.Element => {
    return (
        // Draft Page
        <div className="flex flex-col h-full">
            {/* place holder for controls */}
            <div className="bg-slate-300 h-24 flex justify-center items-center">CONTROLS</div>
            <Board />
        </div>
    )
}