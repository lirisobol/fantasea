import { Fixture } from "../../../../models/gen-info/Fixture";
import { Team } from "../../../../models/gen-info/Team";
import { Element } from "../../../../models/gen-info/Element";
import { PlayerHistoryItem } from "../../../../models/PlayerHistoryItems";
import { generalHelpers } from "../../../../services/general-helpers/general-helpers";
import { ResultBadge } from "../ResultBadge";
import { OpponentBox } from "../OpponentBox";

export const FixtureHistoryTab = ({
  player,
  fixtureHistory,
  teams,
  playerHistory,
}: {
  player: Element;
  fixtureHistory: Fixture[];
  teams: Team[];
  playerHistory: PlayerHistoryItem[];
}): JSX.Element => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="px-1 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
              GW
            </th>
            <th className="px-1 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
              Date
            </th>
            <th className="px-1 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
              Opponent
            </th>
            <th className="px-1 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
              Result
            </th>
            <th className="px-1 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {fixtureHistory.length > 0 ? (
            fixtureHistory.map((fixture) => {
              // Compute necessary data for each fixture
              const playerTeam = teams.find((t) => t.code === player.team_code);
              const opponentId = generalHelpers.getOpponentTeamId(fixture, playerTeam);
              const opponentTeam = teams.find((t) => t.id === opponentId);
              const opponentName = opponentTeam?.short_name || opponentTeam?.name || 'Unknown';
              const isHome = fixture.team_h === playerTeam.id;
              const result = generalHelpers.getGameResult(fixture, playerTeam.id);
              const date = new Date(fixture.kickoff_time);
              const difficulty = generalHelpers.getDifficultyRating(fixture, playerTeam?.id)
              const playerStats = playerHistory.find(
                (historyItem) => historyItem.fixture === fixture.id
              );
              const points = playerStats?.total_points ?? '-';

              return (
                <tr key={fixture.id}>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    {fixture.event}
                  </td>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span>{date.toLocaleDateString()}</span>
                      <span>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </td>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    <div className="flex items-center">
                        <OpponentBox 
                            opponent={opponentName}
                            difficulty={difficulty}
                        />
                    </div>
                  </td>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    <ResultBadge 
                        result={result}
                        home_score={fixture.team_h_score}
                        away_score={fixture.team_a_score}
                    />
                  </td>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    <span className="bg-black text-white px-3 py-1 rounded-md">
                        {points}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="px-3 py-4 text-center text-gray-500">
                No history available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
