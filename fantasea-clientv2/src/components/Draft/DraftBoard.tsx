import { useCallback, useState } from 'react';
import field from '../../assets/field.jpg';
import { SelectionChangedEvent } from 'ag-grid-community';
import DraftPlayersModal from '../modals/DraftPlayersModal/DraftPlayersModal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { PlayerCard } from './PlayerCard';
import { addPlayerToSquad } from '../../store/slices/draft';

export const DraftBoard = () => {
    const boardBackground = `url(${field})`;
    const dispatch = useAppDispatch();
    const [draftModalShow, setDraftModalShow] = useState<boolean>(false);
    const handleDraftModalOpen = () => setDraftModalShow(true);
    const handleDraftModalClose = () => setDraftModalShow(false);


    const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        const selectedData = selectedNode ? selectedNode.data : null;
        if (selectedData) {
            dispatch(addPlayerToSquad({ player: selectedData, element_type: selectedData.element_type }));
            handleDraftModalClose();
        }
    }, [dispatch]);

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
                            <PlayerCard key={player.id} player={player} onAddPlayer={handleDraftModalOpen}/>
                        ))}
                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Defenders */}
                        {players.squad.defenders.map((player) => (
                            <PlayerCard key={player.id} player={player} onAddPlayer={handleDraftModalOpen}/>
                        ))}

                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Midfielders */}
                        {players.squad.midfielders.map((player) => (
                            <PlayerCard key={player.id} player={player} onAddPlayer={handleDraftModalOpen}/>
                        ))}

                    </div>
                    <div className="flex justify-center w-full gap-1 sm:gap-20"> {/* Attackers */}
                        {players.squad.attackers.map((player) => (
                            <PlayerCard key={player.id} player={player} onAddPlayer={handleDraftModalOpen}/>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="my-4 border-t-2 border-gray-300" /> {/* Divider */}

            <div className="flex-1 p-3 content-center"> {/* Bench section */}
                <div className="flex justify-around px-4">
                    {players.bench.map((player) => (
                            <PlayerCard key={player.id} player={player} onAddPlayer={handleDraftModalOpen}/>
                        ))}
                </div>
            </div>

            <DraftPlayersModal show={draftModalShow} onHide={handleDraftModalClose} onSelection={onSelectionChanged}/>
        </div>
    );
};
