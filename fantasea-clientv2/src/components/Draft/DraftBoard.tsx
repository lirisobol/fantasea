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
            <div className="grid gap-20 sm:gap-12 p-1 justify-center">
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
                    <div className="flex p-2 justify-center w-full content-start gap-2 sm:gap-20"> {/* Bench section */}
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
