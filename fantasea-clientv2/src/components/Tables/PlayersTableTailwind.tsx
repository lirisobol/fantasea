import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { useAppSelector } from "../../store/store";
import { Element } from "../../models/gen-info/Element";
import { CustomPlayerName } from "./CustomCells/CustomPlayerName/CustomPlayerName";
import { Team } from "../../models/gen-info/Team";
import { generalHelpers } from "../../services/general-helpers/general-helpers";

interface PlayersTableTailwindProps {
  onSelection: (player: Element) => void;
}
export default function PlayersTableTailwind({
  onSelection,
}: PlayersTableTailwindProps): JSX.Element {
  const currentGameWeekId = useAppSelector<number>(
    (state) => state.genInfo.data?.currentGameWeekId
  );
  const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
  const fixtures = useAppSelector((state) => state.genInfo.data?.fixtures);

  const teamCode = useAppSelector((state) => state.filters.teamCode);
  const positionType = useAppSelector((state) => state.filters.positionType);
  const searchQuery = useAppSelector((state) => state.filters.searchQuery);
  const minPrice = useAppSelector((state) => state.filters.minPrice);
  const maxPrice = useAppSelector((state) => state.filters.maxPrice);

  const players: Element[] = useFilteredPlayers(
    teamCode,
    positionType,
    searchQuery,
    minPrice,
    maxPrice
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    Selected
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    Total Pts
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    GW{currentGameWeekId} Points
                  </th>
                  {/* Fixture headers */}
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    GW{currentGameWeekId}
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    GW{currentGameWeekId + 1}
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    GW{currentGameWeekId + 2}
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    GW{currentGameWeekId + 3}
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs sm:text:sm font-semibold text-gray-900">
                    GW{currentGameWeekId + 4}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {players.map((player) => {
                  const playerTeamId = player.team;
                  const teamFixtures = fixtures
                    ?.filter(
                      (fixture) =>
                        (fixture.team_h === playerTeamId ||
                          fixture.team_a === playerTeamId) &&
                        fixture.event >= currentGameWeekId
                    )
                    .sort((a, b) => a.event - b.event)
                    .slice(0, 5);

                  return (
                    <tr key={player.id} onClick={() => onSelection(player)}>
                      <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm font-medium text-gray-900">
                        <CustomPlayerName player={player} />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm text-gray-900">
                        {player.selected_by_percent}%
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm text-gray-900">
                        {player.total_points}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm text-gray-900">
                        {player.event_points}
                      </td>
                      {/* Fixture cells */}
                      {teamFixtures?.map((fixture, index) => {
                        const isHome = fixture.team_h === playerTeamId;
                        const opponentTeamId = isHome
                          ? fixture.team_a
                          : fixture.team_h;
                        const opponentTeam = teams?.find(
                          (team) => team.id === opponentTeamId
                        );
                        // Get difficulty rating
                        const difficulty = generalHelpers.getDifficultyRating(
                          fixture,
                          playerTeamId
                        );

                        // Get difficulty color
                        const difficultyColor =
                          generalHelpers.getDifficultyColor(difficulty);

                        // Get text color based on background color
                        const textColor =
                          generalHelpers.getTextColor(difficultyColor);

                        return (
                          <td
                            key={index}
                            className={`whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm bg-${difficultyColor} text-${textColor}`}
                          >
                            <div className="flex flex-col items-center">
                              <span>
                                {opponentTeam?.short_name || opponentTeam?.name}
                              </span>
                              <span>{isHome ? "(H)" : "(A)"}</span>
                            </div>
                          </td>
                        );
                      })}

                      {/* cases where there are less than 5 fixtures */}
                      {Array.from({
                        length: 5 - (teamFixtures?.length || 0),
                      }).map((_, idx) => (
                        <td
                          key={`empty-${idx}`}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm text-gray-500"
                        >
                          N/A
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
