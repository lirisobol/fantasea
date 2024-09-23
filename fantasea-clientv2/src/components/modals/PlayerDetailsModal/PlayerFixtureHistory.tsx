import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element"
import { Fixture } from "../../../models/gen-info/Fixture";
import { Team } from "../../../models/gen-info/Team";
import { generalHelpers } from "../../../services/general-helpers/general-helpers";
import { ResultBadge } from "./ResultBadge";
import { OpponentBox } from "./OpponentBox";

interface PlayerFixtureHistoryProps {
    player: Element;
    fixture: Fixture;
    teams: Team[];
}

export const PlayerFixtureHistory = ({ player, fixture, teams }: PlayerFixtureHistoryProps): JSX.Element => {
    const playerTeam: Team = teams.find(t => t.code === player.team_code);

    const [opponentTeam, setOpponentTeam] = useState<string>('');
    const [gameResult, setGameResult] = useState<string>('');
    const [gameDifficulty, setGameDifficulty] = useState<number>(0);

    useEffect(() => {
        if (!player.isPlaceholder) {
            const opponentId = generalHelpers.getOpponentTeamId(fixture, playerTeam);
            
            const opponent = generalHelpers.getOpponentName(fixture, opponentId, teams);
            setOpponentTeam(opponent);
            
            const result = generalHelpers.getGameResult(fixture, playerTeam.id);
            setGameResult(result);

            const difficulty = generalHelpers.getDifficultyRating(fixture, playerTeam.id);
            setGameDifficulty(difficulty);
        }
    }, [player, fixture, playerTeam, teams]);

    return (
        <div className="flex gap-4 justify-around border p-4">
            {/* Kickoff Time */}
            <span className="w-1/4">
                {fixture.kickoff_time}
            </span>
            <span className="w-1/4">
                <OpponentBox opponent={opponentTeam} difficulty={gameDifficulty} />
            </span>
            {/* Result */}
            <span className="w-1/4">
                <ResultBadge result={gameResult}/>
            </span>
            {/* Score */}
            <span className="flex flex-row gap-2 w-1/4">
                <span>{fixture.team_h_score}</span>
                <span> - </span>
                <span>{fixture.team_a_score}</span>
            </span>
        </div>
    )
}
