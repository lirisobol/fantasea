import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element";
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
  playerHistory: PlayerHistoryItem[];
}

export const PlayerFixtureHistory = ({
  player,
  fixture,
  teams,
  playerHistory,
}: PlayerFixtureHistoryProps): JSX.Element => {
  const playerTeam: Team = teams.find((t) => t.code === player.team_code);
  const [playerStats, setPlayerStats] = useState<PlayerHistoryItem | null>(null);
  const [opponentTeam, setOpponentTeam] = useState<string>("");
  const [gameResult, setGameResult] = useState<string>("");
  const [gameDifficulty, setGameDifficulty] = useState<number>(0);

  useEffect(() => {
    if (!player.isPlaceholder && playerHistory) {
      const opponentId = generalHelpers.getOpponentTeamId(fixture, playerTeam);
      const opponent = generalHelpers.getOpponentName(fixture, opponentId, teams);
      setOpponentTeam(opponent);

      const result = generalHelpers.getGameResult(fixture, playerTeam.id);
      setGameResult(result);

      const difficulty = generalHelpers.getDifficultyRating(fixture, playerTeam.id);
      setGameDifficulty(difficulty);

      const statsForFixture = playerHistory.find(
        (historyItem) => historyItem.fixture === fixture.id
      );
      setPlayerStats(statsForFixture || null);
    }
  }, [player, fixture, playerTeam, teams, playerHistory]);

  return (
    <div className="border-b py-1 flex flex-col gap-1 items-center sm:flex-row sm:gap-6">
      {/* Event and Date */}
      <div className="flex flex-col justify-center items-center">
        <div className="font-semibold text-xs sm:text-sm">
          {`GW${fixture.event}`}
        </div>
        <div className="text-xs">
          {generalHelpers.formatKickoffTime(fixture.kickoff_time)}
        </div>
      </div>

      {/* Opponent */}
      <div className="flex items-center gap-6">
        <OpponentBox opponent={opponentTeam} difficulty={gameDifficulty} />
        <ResultBadge
          result={gameResult}
          home_score={fixture.team_h_score}
          away_score={fixture.team_a_score}
        />
      </div>

      {/* Points */}
      <div className="flex items-center">
        <PointsBadge points={playerStats?.total_points} />
      </div>
    </div>
  );
};
