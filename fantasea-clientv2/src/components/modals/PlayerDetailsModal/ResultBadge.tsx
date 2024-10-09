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
                return "blue";
            default:
                return "blue"; // Default case for unexpected results
        }
    }

    const color = getColor(result);

    return (
        <div className={`flex items-center justify-center rounded-md bg-${color}-100 w-20 py-1 text-xs font-medium text-${color}-700`}>
            {home_score} - {away_score}
        </div>
    );
}
