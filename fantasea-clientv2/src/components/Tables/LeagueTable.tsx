import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LeagueDetails } from "../../models/manager/LeagueDetails";
import { RankIndicator } from "../MyFPL/Manager/RankIndicator";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface LeagueTableProps {
    league: LeagueDetails;
}
export default function LeagueTable({league}:LeagueTableProps):JSX.Element {
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const copyToClipboard = (id: number) => {
        navigator.clipboard.writeText(id.toString())
        .then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
    return (
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300 ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                      Rank
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <div>
                        Name & <span className="text-gray-500 font-normal">Id</span>
                      </div>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      GW
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                      <span className="sr-only">Standings</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {league.standings.results.map((league) => (
                //   key
                    <tr key={league.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm font-medium text-gray-900">
                        <RankIndicator current_rank={league.rank} previous_rank={league.last_rank}/>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        <div>
                            {league.entry_name}
                        </div>
                        <div className="text-xs font-normal text-gray-500 mt-1">
                            <button onClick={() => copyToClipboard(league.entry)}>
                                {copiedId === league.entry ? 'Copied!' : league.entry}
                                <FontAwesomeIcon icon={faCopy} style={{ marginLeft: 5 }} />
                            </button>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm text-gray-900 sm:pl-6 lg:pl-8">
                        {league.event_total}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm text-gray-900 sm:pl-6 lg:pl-8">
                        {league.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}
  