import { Team } from "../../models/gen-info/Team";
import { useAppSelector } from "../../store/store";
import { generalHelpers } from "../../services/general-helpers/general-helpers";
import { Fixture } from "../../models/gen-info/Fixture";
import { CustomClubName } from "./CustomCells/CustomClubName/CustomClubName";

export default function FDRTable(): JSX.Element {
  const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
  const currentGameWeekId = useAppSelector<number>(
    (state) => state.genInfo.data?.currentGameWeekId
  );
  const fixtures = useAppSelector<Fixture[]>((state) => state.genInfo.data?.fixtures);

  const getFixtureHeaders = () => {
    const headers = [];
    for (let i = currentGameWeekId; i <= 38; i++) {
      headers.push(
        <th
          key={`gw-${i}`}
          className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900"
        >
          GW{i}
        </th>
      );
    }
    return headers;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    Club
                  </th>
                  {getFixtureHeaders()}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {teams.map((team) => {
                  const teamFixtures = fixtures
                    ?.filter(
                      (fixture) =>
                        (fixture.team_h === team.id || fixture.team_a === team.id) &&
                        fixture.event >= currentGameWeekId
                    )
                    .sort((a, b) => a.event - b.event);

                  return (
                    <tr key={team.id}>
                      <td className="whitespace-nowrap pr-5 py-4 text-xs sm:text-sm font-medium text-gray-900">
                        <CustomClubName data={team}/>
                      </td>
                      {Array.from({ length: 38 - currentGameWeekId + 1 }).map((_, idx) => {
                        const gw = currentGameWeekId + idx;
                        const fixture = teamFixtures?.find((f) => f.event === gw);

                        if (fixture) {
                          const isHome = fixture.team_h === team.id;
                          const opponentTeamId = isHome ? fixture.team_a : fixture.team_h;
                          const opponentTeam = teams.find((t) => t.id === opponentTeamId);

                          // Get difficulty rating
                          const difficulty = generalHelpers.getDifficultyRating(fixture, team.id);
                          // Get difficulty color
                          const difficultyColor = generalHelpers.getDifficultyColor(difficulty);
                          // Get text color
                          const textColor = generalHelpers.getTextColor(difficultyColor);

                          return (
                            <td
                              key={`team-${team.id}-gw-${gw}`}
                              className={`whitespace-nowrap py-4 pl-3 pr-3 sm:py-8 sm:pl-5 sm:pr-5 text-xs sm:text-sm bg-${difficultyColor} text-${textColor}`}
                            >
                              <div className="flex flex-col items-center">
                                <span>{opponentTeam?.short_name || opponentTeam?.name}</span>
                                <span>{isHome ? "(H)" : "(A)"}</span>
                              </div>
                            </td>
                          );
                        } else {
                          // No fixture for this gameweek
                          return (
                            <td
                              key={`team-${team.id}-gw-${gw}`}
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm text-gray-500"
                            >
                              -
                            </td>
                          );
                        }
                      })}
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
