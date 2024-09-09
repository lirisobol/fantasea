import { PlusIcon } from '@heroicons/react/20/solid';
import { Element } from '../../models/gen-info/Element';
interface PlayerCardProps {
    player: Element;
    onAddPlayer: () => void;
}
export const PlayerCard = ({ player, onAddPlayer }: PlayerCardProps): JSX.Element => {
    return (
        <div className="player-card bg-slate-300 rounded-lg flex flex-col justify-center content-center text-xs sm:text-base">
            {player && !player.isPlaceholder ? (
                <>
                    <div className='flex flex-col content-center justify-center items-center'>

                        <div className='flex flex-col p-3 items-center'>
                            <img src={`/assets/images/kits/${player.team_code}.png`} alt="Jersey" className="h-10 w-10 mr-1"/>
                            <div className='font-medium'>{player.web_name}</div>
                        </div>

                        <div className='bg-slate-500 w-full p-2 flex flex-row gap-3'>
                            <span className='text-slate-100 flex flex-col text-xs'>
                                <span>Price</span>
                                {player.now_cost / 10}m
                            </span>

                            <span className='text-slate-100 flex flex-col text-xs'>
                                <span>PPG</span>
                                {player.points_per_game}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <button onClick={onAddPlayer} className="flex flex-col items-center justify-center h-10 w-10 border-2 border-dashed border-gray-400 rounded-lg">
                    <PlusIcon className="h-5 w-5 text-gray-500"/>
                </button>
            )}
        </div>
    );
};