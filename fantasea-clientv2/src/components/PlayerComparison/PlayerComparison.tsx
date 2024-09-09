import { Element } from "../../models/gen-info/Element"
import { PlayerRemoverButton } from "./PlayerRemoverButton";

interface PlayerComparisonCardProps {
    player: Element
}

export const PlayerComparisonCard = ({ player }: PlayerComparisonCardProps): JSX.Element => {
    console.log(player);
    const jerseyImagePath = player && player.team_code ? `/assets/images/kits/${player.team_code}.png` : '/assets/images/kits/default.png';

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div>
                    <div className="flex gap-10">
                        <p className="text-lg leading-6 font-medium text-gray-900">{player.first_name} {player.second_name}</p>
                        <img src={jerseyImagePath} alt="jersey" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and stats.</p>
                </div>
                <div>
                    <PlayerRemoverButton playerId={player.id}/>
                </div>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-6">
                        <div className="text-sm font-semibold text-gray-500">Key Details</div>
                        <div className="text-sm font-bold text-gray-500"></div>
                        <div className="text-sm font-normal text-gray-500">Price</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.now_cost / 10}m</div>
                        <div className="text-sm font-normal text-gray-500">Points Per Game</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.points_per_game}</div>
                        <div className="text-sm font-normal text-gray-500">Selected</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.selected_by_percent}%</div>
                    </div>
                    <div className="bg-white px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-6">
                        <div className="text-sm font-semibold text-gray-500">In-Game Form</div>
                        <div className="text-sm font-bold text-gray-500"></div>
                        <div className="text-sm font-normal text-gray-500">Minutes Played</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.minutes}</div>
                        <div className="text-sm font-normal text-gray-500">Goals</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.goals_scored}</div>
                        <div className="text-sm font-normal text-gray-500">Assists</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.assists}</div>
                        <div className="text-sm font-normal text-gray-500">Clean Sheets</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.clean_sheets}</div>
                        <div className="text-sm font-normal text-gray-500">BPS</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.bps}</div>
                        <div className="text-sm font-normal text-gray-500">Influence</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.influence}</div>
                        <div className="text-sm font-normal text-gray-500">Minutes</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.minutes}</div>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-6">
                        <div className="text-sm font-semibold text-gray-500">Transfer Details</div>
                        <div className="text-sm font-bold text-gray-500"></div>
                        <div className="text-sm font-normal text-gray-500">Transfers in</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.transfers_in_event}</div>
                        <div className="text-sm font-normal text-gray-500">Transfers out</div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0">{player.transfers_out_event}</div>
                    </div>
                </dl>
            </div>
        </div>
    )
}
