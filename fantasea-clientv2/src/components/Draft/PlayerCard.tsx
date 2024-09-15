import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Element } from '../../models/gen-info/Element';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useCallback, useState } from 'react';
import { addPlayerToSquad, addPlayerToBench, removePlayerFromSquad, removePlayerFromBench } from '../../store/slices/draft/draft';
import DraftPlayersModal from '../modals/DraftPlayersModal/DraftPlayersModal';
import { SelectionChangedEvent } from 'ag-grid-community';
import { useNextMatchForPlayer } from '../../hooks/useNextMatchForPlayer';

interface PlayerCardProps {
    player: Element;
    index: number;
    elementType: number;
    isBench: boolean; // Added to differentiate between bench and squad
}

export const PlayerCard = ({ player, index, elementType, isBench }: PlayerCardProps): JSX.Element => {
    const budget = useAppSelector((state) => state.draft.budget);
    const dispatch = useAppDispatch();
    const [draftModalShow, setDraftModalShow] = useState<boolean>(false);
    const nextOpponent = useNextMatchForPlayer(player);

    const handleDraftModalOpen = () => setDraftModalShow(true);
    const handleDraftModalClose = () => setDraftModalShow(false);

    const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        const selectedData = selectedNode ? selectedNode.data : null;
        if (selectedData) {
            if (selectedData.now_cost / 10 > budget) {
                console.log('Not enough budget');
                handleDraftModalClose();
            } else {
                if (isBench) {
                    dispatch(addPlayerToBench(selectedData));
                } else {
                    dispatch(addPlayerToSquad({ player: selectedData}));
                }
                handleDraftModalClose();
            }
        }
    }, [dispatch, budget, isBench]); // Include isBench in dependencies

    const removePlayer = useCallback(() => {
        if (isBench) {
            dispatch(removePlayerFromBench(index));
        } else {
            dispatch(removePlayerFromSquad({ index, element_type: elementType }));
        }
    }, [dispatch, index, elementType, isBench]);

    return (
        <div className="player-card text-xs sm:text-sm h-16 w-16 sm:h-28 sm:w-32">
            {player && !player.isPlaceholder ? (
                <>
                    <div className='flex flex-col border rounded-lg'>
                        <button
                            type="button"
                            onClick={removePlayer}
                            className="rounded-md text-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <div className='flex flex-col items-center justify-center content-center'>
                            <img src={`/assets/images/kits/${player.team_code}.png`} alt="Jersey" className="h-3/5 w-2/5"/>
                            <div className='font-medium bg-slate-300 w-full text-center'>{player.web_name}</div>
                        </div>

                        <div className='bg-slate-500 w-full flex flex-col rounded-lg'>
                            <span className='bg-slate-200 text-slate-700 flex flex-row justify-center text-xs p-1'>
                                {nextOpponent}
                            </span>
                            <span className='bg-slate-500 text-slate-100 flex flex-row justify-center text-xs p-1 rounded-lg'>
                                {player.now_cost / 10}m
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <button onClick={handleDraftModalOpen} 
                    className="
                    flex flex-col items-center justify-center 
                    h-16 w-16 sm:h-28 sm:w-32 
                    border-2 border-dashed border-gray-400 
                    bg-slate-600 
                    rounded-lg">
                    <PlusIcon className="h-5 w-5 text-gray-500"/>
                </button>
            )}
            <DraftPlayersModal show={draftModalShow} onHide={handleDraftModalClose} onSelection={onSelectionChanged} preSetPosition={elementType} />
        </div>
    );
};
