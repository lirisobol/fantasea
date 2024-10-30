import { useAppSelector } from "../../store/store";
import { Team } from "../../models/gen-info/Team";
import { CustomClubName } from "./CustomCells/CustomClubName/CustomClubName";

export const CleanSheets = (): JSX.Element => {
  const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
  console.log(teams);
  const mostCleanSheets = teams?.slice()
  .sort((a,b) => b.clean_sheets - a.clean_sheets)
  .slice(0,10);
  console.log(mostCleanSheets);
  
  return (
    <div className="border rounded-lg shadow-lg bg-white flex flex-col h-full">
      {/* Table Header */}
      <div className="px-4 py-8 bg-gradient-to-r from-cyan-500 to-teal-500 border-b rounded-t-lg">
        <h2 className="text-3xl font-semibold text-gray-100">Leading By Clean Sheets</h2>
      </div>
      {/* Table Content */}
      <div className="flex-grow overflow-y-auto px-4">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Rank
              </th>
              <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Club
              </th>
              <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Clean Sheets
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mostCleanSheets?.map((team, index) => {
                return (
                    <tr key={team.id}>
                        <td className="px-3 py-3.5 text-xs sm:text-sm text-gray-900">{index + 1}</td>
                        <td className="px-3 py-3.5 text-xs sm:text-sm text-gray-900"><CustomClubName data={team}/></td>
                        <td className="px-3 py-3.5 text-xs sm:text-sm text-gray-900">{team.clean_sheets}</td>
                    </tr>
                )
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
};
