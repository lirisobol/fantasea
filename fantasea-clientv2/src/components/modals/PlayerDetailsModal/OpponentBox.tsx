import { generalHelpers } from "../../../services/general-helpers/general-helpers";

interface OpponentBoxProps {
    opponent: string;
    difficulty: number;
}
export const OpponentBox = ({opponent,difficulty}: OpponentBoxProps):JSX.Element => {
    const color = generalHelpers.getDifficultyColor(difficulty);
    return (
        <div className={`rounded-lg px-3 py-1.5 bg-${color} w-32 text-center truncate`}>
            {opponent}
        </div>
    )
}