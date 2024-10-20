import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Leagues } from "../../../models/manager/ManagerDetails"
import { RankIndicator } from "./RankIndicator";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LeagueDetailsModal from "../../modals/LeagueDetailsModal/LeagueDetailsModal";

interface ManagerLeaguesProps {
    leagues: Leagues;
}
export default function ManagerLeagues({leagues}:ManagerLeaguesProps):JSX.Element {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [leagueId, setLeagueId] = useState<number | null>(null);

    const showModal = (id:number) => {
        setLeagueId(id)
        setModalShow(true);
    }
    const hideModal = () => {
        setModalShow(false);
    }
    
    
    console.log(leagues);
    const classicLeagues = leagues.classic;
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Leagues</h1>
            <p className="mt-2 text-sm text-gray-700">
              List of leagues you are currently competing in
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Rank
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                      <span className="sr-only">Standings</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {classicLeagues.map((league) => (
                //   key
                    <tr key={league.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {league.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-500">
                        <RankIndicator current_rank={league.entry_rank} previous_rank={league.entry_last_rank}/>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xs sm:text-sm font-medium sm:pr-6 lg:pr-8">
                        <button 
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => showModal(league.id)}
                            >
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {leagueId && 
            <LeagueDetailsModal show={modalShow} onHide={hideModal} leagueId={leagueId}/>
        }
      </div>
    )
}
  