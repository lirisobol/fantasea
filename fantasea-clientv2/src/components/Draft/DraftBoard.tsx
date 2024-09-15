import field from '../../assets/field.jpg';
import { useAppSelector } from '../../store/store';
import { PlayerCard } from './PlayerCard';

export const DraftBoard = () => {
    const boardBackground = `url(${field})`;
    const players = useAppSelector((state) => state.draft.players);
    return (
        <div  
            className="flex flex-col h-full"
            style={{ 
                backgroundImage: boardBackground,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="content-center h-5/6 p-2"> {/* Squad section */}
                <div className="grid gap-4 h-full">
                    {/* Iterating over each position group and passing the index and elementType */}
                    {['goalkeepers', 'defenders', 'midfielders', 'attackers'].map((position, elementType) => (
                        <div className="flex justify-center w-full gap-2 sm:gap-20" key={position}>
                            {players.squad[position].map((player, index) => (
                                <PlayerCard
                                    key={player.id}
                                    player={player}
                                    index={index}
                                    elementType={elementType + 1} // elementType starts from 1 for goalkeepers
                                    isBench={false}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-t-2 border-gray-300" /> {/* Divider */}

            <div className="content-center h-1/6 p-2"> {/* Bench section */}
                <div className="flex justify-around px-4 gap-4">
                    {players.bench.map((player, index) => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            index={index}
                            elementType={0} // Example element type for bench could be 0 or another identifier
                            isBench={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
