interface ResultBadgeProps {
    result: string;
    home_score: string;
    away_score: string;
}

export const ResultBadge = ({ result, home_score, away_score }: ResultBadgeProps): JSX.Element => {
    const getColor = (result: string) => {
        switch(result) {
            case "Win":
                return "green";
            case "Lose":
                return "red";
            case "Draw":
                return "gray";
            default:
                return "blue"; // Default case for unexpected results
        }
    }

    const color = getColor(result);

    return (
        <div className={`flex items-center justify-center bg-${color}-400 w-16 py-1 text-xs font-medium text-${color}-900`}>
            {home_score} - {away_score}
        </div>
    );
}
