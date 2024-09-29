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
        <div className={`flex items-center justify-center rounded-md bg-${color}-100 px-3 py-1.5 text-sm font-medium text-${color}-700 w-32`}>
            {home_score} - {away_score}
        </div>
    );
}
