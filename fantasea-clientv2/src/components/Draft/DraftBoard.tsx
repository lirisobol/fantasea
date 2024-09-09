import field from '../../assets/field.jpg';
import { useAppSelector } from '../../store/store';
import { PlayerCard } from './PlayerCard';

export const DraftBoard = () => {
    const boardBackground = `url(${field})`;
    const players = useAppSelector((state) => state.draft.players);
    return (
        <div 
            className="h-full flex flex-col"
            style={{ 
                backgroundImage: boardBackground,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="h-screen content-center"> {/* Squad section */}
                <div className="grid grid-rows-4 gap-20 px-4">
                    {/* Iterating over each position group and passing the index and elementType */}
                    {['goalkeepers', 'defenders', 'midfielders', 'attackers'].map((position, elementType) => (
                        <div className="flex justify-center w-full gap-1 sm:gap-20" key={position}>
                            {players.squad[position].map((player, index) => (
                                <PlayerCard
                                    key={player.id}
                                    player={player}
                                    index={index}
                                    elementType={elementType + 1} // elementType starts from 1 for goalkeepers
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-4 border-t-2 border-gray-300" /> {/* Divider */}

            <div className="flex-1 p-3 content-center"> {/* Bench section */}
                <div className="flex justify-around px-4">
                    {players.bench.map((player, index) => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            index={index}
                            elementType={0} // Example element type for bench could be 0 or another identifier
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
