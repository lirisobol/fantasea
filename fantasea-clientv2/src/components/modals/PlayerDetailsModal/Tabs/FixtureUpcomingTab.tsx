import { Fixture } from "../../../../models/gen-info/Fixture";
import { Team } from "../../../../models/gen-info/Team";
import { Element } from "../../../../models/gen-info/Element";
import { generalHelpers } from "../../../../services/general-helpers/general-helpers";

interface FixtureUpcomingTabProps {
  player: Element;
  fixtureUpcoming: Fixture[];
  teams: Team[];
}

export const FixtureUpcomingTab = ({
  player,
  fixtureUpcoming,
  teams,
}: FixtureUpcomingTabProps): JSX.Element => {
  // Function to get the difficulty color class
  const getDifficultyColorClass = (difficulty: number): string => {
    switch (difficulty) {
      case 1:
        return "bg-green-500";
      case 2:
        return "bg-green-400";
      case 3:
        return "bg-yellow-400";
      case 4:
        return "bg-orange-400";
      case 5:
        return "bg-red-500";
      default:
        return "bg-gray-200";
    }
  };

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
              Venue
            </th>
            <th className="px-1 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
              Difficulty
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {fixtureUpcoming.length > 0 ? (
            fixtureUpcoming.map((fixture) => {
              // Compute necessary data for each fixture
              const playerTeam = teams.find((t) => t.code === player.team_code);
              const opponentId = generalHelpers.getOpponentTeamId(
                fixture,
                playerTeam
              );
              const opponentTeam = teams.find((t) => t.id === opponentId);
              const opponentName =
                opponentTeam?.short_name || opponentTeam?.name || "Unknown";
              const isHome = fixture.team_h === playerTeam.id;
              const venue = isHome ? "Home" : "Away";
              const date = new Date(fixture.kickoff_time);
              const difficulty = generalHelpers.getDifficultyRating(
                fixture,
                playerTeam?.id
              );
              const difficultyColorClass = getDifficultyColorClass(difficulty);

              return (
                <tr key={fixture.id}>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    {fixture.event}
                  </td>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span>{date.toLocaleDateString()}</span>
                      <span>
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    {opponentName}
                  </td>
                  <td className="px-1 py-4 text-xs sm:text-sm text-gray-900">
                    {venue}
                  </td>
                  <td className="px-1 py-4 text-xs sm:text-sm">
                    <span
                      className={`px-2 py-1 rounded-md text-white ${difficultyColorClass}`}
                    >
                      {difficulty}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-3 py-4 text-center text-gray-500"
              >
                No upcoming fixtures.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
