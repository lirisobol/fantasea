import { generalHelpers } from "../../../services/general-helpers/general-helpers";

interface OpponentBoxProps {
    opponent: string;
    difficulty: number;
}
export const OpponentBox = ({opponent,difficulty}: OpponentBoxProps):JSX.Element => {
    const color = generalHelpers.getDifficultyColor(difficulty);
    const textColor = generalHelpers.getTextColor(color); 
    

    return (
        <div className={`rounded-lg px-2 py-1 bg-${color} text-${textColor} w-32 text-center truncate`}>
            {opponent}
        </div>
    )
}