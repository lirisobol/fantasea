import field from '../../assets/field.jpg';
import { PlayerCard } from './PlayerCard';

export const DraftBoard = () => {
    const boardBackground = `url(${field})`;

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
                        <h3 className="text-md font-semibold"></h3>
                        <PlayerCard />
                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Defenders */}
                        <h3 className="text-md font-semibold"></h3>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <PlayerCard key={index}/>
                        ))}
                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Midfielders */}
                        <h3 className="text-md font-semibold"></h3>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <PlayerCard key={index}/>
                        ))}
                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Attackers */}
                        <h3 className="text-md font-semibold"></h3>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <PlayerCard key={index}  />
                        ))}
                    </div>
                </div>
            </div>

            <hr className="my-4 border-t-2 border-gray-300" /> {/* Divider */}

            <div className="flex-1 p-3 content-center"> {/* Bench section */}
                <div className="flex justify-around px-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <PlayerCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
