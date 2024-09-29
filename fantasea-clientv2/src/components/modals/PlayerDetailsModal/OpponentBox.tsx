import { generalHelpers } from "../../../services/general-helpers/general-helpers";

interface OpponentBoxProps {
    opponent: string;
    difficulty: number;
}
export const OpponentBox = ({opponent,difficulty}: OpponentBoxProps):JSX.Element => {
    const color = generalHelpers.getDifficultyColor(difficulty);
    const textColor = generalHelpers.getTextColor(color); 
    

    return (
        <div className={`rounded-lg bg-${color} text-${textColor} w-20 py-1 text-center font-medium truncate text-xs`}>
            {opponent}
        </div>
    )
}