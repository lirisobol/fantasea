import { Element } from "../../models/gen-info/Element";
import { useAppSelector } from "../../store/store";
import { Team } from "../../models/gen-info/Team";
import { ElementType } from "../../models/gen-info/ElementType";
import { CustomPlayerName } from "./CustomCells/CustomPlayerName/CustomPlayerName";

export const MostTransferredIn = (): JSX.Element => {
  const players = useAppSelector<Element[]>((state) => state.genInfo.data?.elements);
  const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
  const elementTypes = useAppSelector<ElementType[]>((state) => state.genInfo.data?.element_types);
  const currentGameweekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);

  // Get the top 10 players sorted by transfers_in_event
  const topTransferredInPlayers = players
    ?.slice() // Make a copy to avoid mutating the original array
    .sort((a, b) => b.transfers_in_event - a.transfers_in_event)
    .slice(0, 10);

  return (
    <>
      {/* Table Header */}
      <div className="px-4 py-8 bg-gradient-to-r from-cyan-500 to-blue-500 border-b rounded-t-lg">
        <h2 className="text-3xl font-semibold text-gray-100">Most Transferred In Players</h2>
      </div>
      {/* Table Content */}
      <div className="flex-grow px-4">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Rank
              </th>
              <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Position
              </th>
              <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
              Transfers In (GW{currentGameweekId})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {topTransferredInPlayers?.map((player, index) => {
              const team = teams?.find((team) => team.id === player.team);
              const position = elementTypes?.find((type) => type.id === player.element_type);

              const formattedTransfersInEvent = new Intl.NumberFormat().format(
                player.transfers_in_event
              );

              return (
                <tr key={player.id}>
                  <td className="px-3 py-3.5 text-xs sm:text-sm text-gray-900">{index + 1}</td>
                  <td className="px-3 py-3.5 text-xs sm:text-sm text-gray-900">
                    <CustomPlayerName player={player}/>
                  </td>
                  <td className="px-3 py-3.5 text-xs sm:text-sm text-gray-900">
                    {position?.singular_name_short}
                  </td>
                  <td className="px-3 py-3.5 text-xs sm:text-sm text-gray-900">
                    {formattedTransfersInEvent}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </>
  );
};
