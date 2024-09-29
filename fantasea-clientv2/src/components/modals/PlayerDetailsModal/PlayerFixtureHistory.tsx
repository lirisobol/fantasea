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
    <div className="border-b py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:items-center">
      {/* Event and Date */}
      <div className="flex justify-between gap-5 sm:block">
        <div className="font-semibold text-xs sm:text-sm">
          {`GW${fixture.event}`}
        </div>
        <div className="text-xs sm:hidden">
          {generalHelpers.formatKickoffTime(fixture.kickoff_time)}
        </div>
      </div>

      {/* Date (only on larger screens) */}
      <div className="hidden sm:block text-xs">
        {generalHelpers.formatKickoffTime(fixture.kickoff_time)}
      </div>

      {/* Opponent */}
      <div className="mt-2 sm:mt-0">
        <OpponentBox opponent={opponentTeam} difficulty={gameDifficulty} />
      </div>

      {/* Result */}
      <div className="mt-2 sm:mt-0">
        <ResultBadge
          result={gameResult}
          home_score={fixture.team_h_score}
          away_score={fixture.team_a_score}
        />
      </div>

      {/* Points */}
      <div className="mt-2 sm:mt-0">
        <PointsBadge points={playerStats?.total_points} />
      </div>
    </div>
  );
};
