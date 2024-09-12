import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Element } from '../../models/gen-info/Element';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useCallback, useState } from 'react';
import { addPlayerToSquad, removePlayerFromSquad } from '../../store/slices/draft';
import DraftPlayersModal from '../modals/DraftPlayersModal/DraftPlayersModal';
import { SelectionChangedEvent } from 'ag-grid-community';
import { useNextMatchForPlayer } from '../../hooks/useNextMatchForPlayer';
interface PlayerCardProps {
    player: Element;
    index: number;
    elementType: number;
}
export const PlayerCard = ({ player, index, elementType }: PlayerCardProps): JSX.Element => {
    const budget = useAppSelector((state) => state.draft.budget);
    const dispatch = useAppDispatch();
    const [draftModalShow, setDraftModalShow] = useState<boolean>(false);
    const nextOpponent = useNextMatchForPlayer(player);
    console.log(nextOpponent);
    

    const handleDraftModalOpen = () => setDraftModalShow(true);
    const handleDraftModalClose = () => setDraftModalShow(false);

    const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        const selectedData = selectedNode ? selectedNode.data : null;
        if (selectedData) {
            if(selectedData.now_cost/10 > budget) {
                console.log('not enough budget');
                handleDraftModalClose();
                
            }
            else {
                dispatch(addPlayerToSquad({ player: selectedData, element_type: selectedData.element_type }));
                handleDraftModalClose();
            }
        }
    }, [dispatch]);
    
    const removePlayer = useCallback(() => {
        dispatch(removePlayerFromSquad({ index, element_type: elementType }));
    }, [dispatch, index, elementType]);


    return (
        <div className="player-card text-xs sm:text-sm h-20 w-20">
            {player && !player.isPlaceholder ? (
                <>
                    <div className='flex flex-col border rounded-lg'>
                        <button
                            type="button"
                            onClick={() => removePlayer()}
                            className="rounded-md text-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                        <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                        <div className='flex flex-col items-center justify-center content-center'>
                            <img src={`/assets/images/kits/${player.team_code}.png`} alt="Jersey" className="h-14 w-14"/>
                            <div className='font-medium bg-slate-300 w-full text-center'>{player.web_name}</div>
                        </div>

                        <div className='bg-slate-500 w-full flex flex-col rounded-lg'>
                            <span className='bg-slate-200 text-slate-700 flex flex-row justify-center text-xs p-1'>
                                {nextOpponent}
                            </span>
                            <span className='text-slate-100 flex flex-row justify-between text-xs p-1'>
                                <span>Price</span>
                                {player.now_cost / 10}m
                            </span>
                            <hr></hr>
                            <span className='text-slate-100 flex flex-row justify-between text-xs p-1'>
                                <span>PPG</span>
                                {player.points_per_game}
                            </span>
                            <hr></hr>

                        </div>
                    </div>
                </>
            ) : (
                <button onClick={handleDraftModalOpen} className="flex flex-col items-center justify-center h-20 w-20 border-2 border-dashed border-gray-400 bg-slate-600 rounded-lg">
                    <PlusIcon className="h-5 w-5 text-gray-500"/>
                </button>
            )}
            <DraftPlayersModal show={draftModalShow} onHide={handleDraftModalClose} onSelection={onSelectionChanged} preSetPosition={elementType} />

        </div>
        
    );
};