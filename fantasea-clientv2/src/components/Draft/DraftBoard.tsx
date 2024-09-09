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
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Goalkeepers */}
                        {players.squad.goalkeepers.map((player) => (
                            <PlayerCard key={player.id} player={player} elementType={1}/>
                        ))}
                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Defenders */}
                        {players.squad.defenders.map((player) => (
                            <PlayerCard key={player.id} player={player} elementType={2}/>
                        ))}

                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Midfielders */}
                        {players.squad.midfielders.map((player) => (
                            <PlayerCard key={player.id} player={player} elementType={3}/>
                        ))}

                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Attackers */}
                        {players.squad.attackers.map((player) => (
                            <PlayerCard key={player.id} player={player} elementType={4}/>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="my-4 border-t-2 border-gray-300" /> {/* Divider */}

            <div className="flex-1 p-3 content-center"> {/* Bench section */}
                <div className="flex justify-around px-4">
                    {players.bench.map((player) => (
                            <PlayerCard key={player.id} player={player} elementType={1}/>
                        ))}
                </div>
            </div>

        </div>
    );
};
