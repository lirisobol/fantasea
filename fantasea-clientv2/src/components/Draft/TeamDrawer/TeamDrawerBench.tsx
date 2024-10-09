import { useAppSelector } from "../../../store/store"
import { PlayerRemover } from "./PlayerRemover"
import { TeamDrawerMenu } from "./TeamDrawerMenu"
import { getJerseyPath, getTransfersDiff } from "./teamHelpers";

export const TeamDrawerBench = ():JSX.Element => {
    const draftedBenchPlayers = useAppSelector((state) => state.draft.players.bench);
    return (
        <>
            <ul role="list" className="divide-y divide-gray-200">
                {draftedBenchPlayers.filter(player => !player.isPlaceholder).map((player, index) => (                                            
                    <li key={player.web_name}>
                        <div className="group relative flex items-center px-5 py-6">
                                <div className="relative flex min-w-0 flex-1 items-center">
                                    <span className="relative inline-block flex-shrink-0">
                                      <img alt="" src={getJerseyPath(player.team_code)} className="h-10 w-10 rounded-full" />
                                    </span>
                                    <div className="ml-4 truncate">
                                        <p className="truncate text-sm font-medium text-gray-900">{player.first_name} {player.second_name}</p>

                                        <div className='
                                            flex flex-col sm:flex-row
                                            gap-0 sm:gap-3'>

                                            <p className="truncate text-sm text-gray-500">{'Price : ' + player.now_cost/10}m</p>
                                            <p className="truncate text-sm text-gray-500">{'PPG : ' + player.points_per_game}</p>
                                            {getTransfersDiff(player.transfers_in_event, player.transfers_out_event)}
                                        </div>
                                    </div>
                                </div>
                            <div className='flex flex-col sm:flex-row justify-center items-center content-center gap-0'>
                                <PlayerRemover index={index} elementType={player.element_type} isBench={true}/>
                                <TeamDrawerMenu />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>

    )
}