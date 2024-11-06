import { Board } from "../components/Draft/Board"

export const Draft = ():JSX.Element => {
    return (
        // Draft Page
        <div className="flex flex col">
            {/* place holder for controls */}
            <div className="bg-white">CONTROLS</div>
            <Board />
        </div>
    )
}