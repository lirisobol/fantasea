import { Fixture } from "../../../models/gen-info/Fixture";
import { Team } from "../../../models/gen-info/Team";
import { useAppSelector } from "../../../store/store";
import { LoadingSpinner } from "../../Loading/LoadingSpinner/LoadingSpinner";

export const KeySchedule = (): JSX.Element => {
    const teams = useAppSelector<Team[] | undefined>((state) => state.genInfo.data?.teams);
  const currentGameweek = useAppSelector<number | undefined>(
    (state) => state.genInfo.data?.currentGameWeekId
  );

  const fixtures = useAppSelector<Fixture[] | undefined>(
    (state) => state.genInfo.data?.fixtures
  );

  // Check if data is available
  if (currentGameweek === undefined || fixtures === undefined) {
    return <LoadingSpinner />;
  }

  const upcomingFixtures = fixtures.filter(
    (fixture) => fixture.event === currentGameweek + 1
  );

  const upcomingFixturesSortedByStartDate = upcomingFixtures.sort((a, b) => {
    return new Date(a.kickoff_time).getTime() - new Date(b.kickoff_time).getTime();
  });

  const getImage = (teamCode: number) => {
    const teamId = teams?.find((t) => t.id === teamCode)?.code
    return `/assets/images/badges/${teamId}.png`;
  };

  const getTeamNameByCode = (teamCode:number) => {
    return teams?.find((t) => t.id === teamCode)?.name;
  };



  return (
    <div className="flex flex-col h-full">
      <div className="max-h-[87vh] overflow-y-auto">
        <ul role="list" className="divide-y divide-gray-100">
          {upcomingFixturesSortedByStartDate.map((fixture) => (
            <li key={fixture.id} className="flex py-6 px-2 justify-center">
                {/* Home Team */}
              <div className="flex flex-col items-center justify-center w-2/6">
                <img
                  alt=""
                  src={getImage(fixture.team_h)}
                  className="w-12 h-12"
                />
                <span className="font-bold">
                    {getTeamNameByCode(fixture.team_h)}
                </span>
              </div>

              {/* Time */}
              <div className="flex flex-col items-center justify-center text-xs w-2/6">
                <span className="text-lg font-semibold">
                  {new Date(fixture.kickoff_time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className="text-gray-700">
                  {new Date(fixture.kickoff_time).toLocaleDateString()}
                </span>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center justify-center w-2/6">
                <img
                  alt=""
                  src={getImage(fixture.team_a)}
                  className="w-12 h-12"
                />
                <span className="font-bold">
                    {getTeamNameByCode(fixture.team_a)}
                </span>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// <p className="mt-1 flex text-xs text-gray-500">
// <span className="truncate">
//   Fitness:
//   <span className="font-semibold ml-2">
//     {player.stats?.chance_of_playing_next_round}%
//   </span>
// </span>
// </p>
