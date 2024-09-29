import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element"
import { Fixture } from "../../../models/gen-info/Fixture";
import { Team } from "../../../models/gen-info/Team";
import { generalHelpers } from "../../../services/general-helpers/general-helpers";
import { ResultBadge } from "./ResultBadge";
import { OpponentBox } from "./OpponentBox";
import { PlayerHistoryItem } from "../../../models/PlayerHistoryItems";
import { PointsBadge } from "./PointsBadge";

interface PlayerFixtureHistoryProps {
    player: Element;
    fixture: Fixture;
    teams: Team[];
    playerHistory: PlayerHistoryItem[]
}

export const PlayerFixtureHistory = ({ player, fixture, teams, playerHistory}: PlayerFixtureHistoryProps): JSX.Element => {
    const playerTeam: Team = teams.find(t => t.code === player.team_code);
    const [playerStats, setPlayerStats] = useState<PlayerHistoryItem | null>(null)
    const [opponentTeam, setOpponentTeam] = useState<string>('');
    const [gameResult, setGameResult] = useState<string>('');
    const [gameDifficulty, setGameDifficulty] = useState<number>(0);
    

    useEffect(() => {
        if (!player.isPlaceholder && playerHistory) {
          // Existing logic
          const opponentId = generalHelpers.getOpponentTeamId(fixture, playerTeam);
          const opponent = generalHelpers.getOpponentName(fixture, opponentId, teams);
          setOpponentTeam(opponent);
      
          const result = generalHelpers.getGameResult(fixture, playerTeam.id);
          setGameResult(result);
      
          const difficulty = generalHelpers.getDifficultyRating(fixture, playerTeam.id);
          setGameDifficulty(difficulty);
      
          // **Find the player's stats for this fixture**
          const statsForFixture = playerHistory.find(
            (historyItem) => historyItem.fixture === fixture.id
          );
          setPlayerStats(statsForFixture || null);
        }
      }, [player, fixture, playerTeam, teams, playerHistory]);
    

    return (
        <div className="flex items-center gap-4 border p-2">
            {/* Kickoff Time */}
            <div className="w-40 flex-shrink-0 flex items-center gap-2">
                <span className="font-semibold w-12 flex-shrink-0">
                    {`GW${fixture.event}`}
                </span>
                <span className="text-xs ml-2 flex-grow">
                    {generalHelpers.formatKickoffTime(fixture.kickoff_time)}
                </span>
            </div>
            <div className="flex flex-row flex-grow gap-2">
                <OpponentBox opponent={opponentTeam} difficulty={gameDifficulty} />
                {/* Result */}
                <ResultBadge result={gameResult} home_score={fixture.team_h_score} away_score={fixture.team_a_score}/>
                <PointsBadge points={playerStats?.total_points}/>
            </div>
        </div>
    )
}
