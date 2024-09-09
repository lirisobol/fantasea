import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Element } from '../../models/gen-info/Element';
import { useAppDispatch } from '../../store/store';
import { useCallback, useState } from 'react';
import { addPlayerToSquad, removePlayerFromSquad } from '../../store/slices/draft';
import DraftPlayersModal from '../modals/DraftPlayersModal/DraftPlayersModal';
import { SelectionChangedEvent } from 'ag-grid-community';
interface PlayerCardProps {
    player: Element;
    index: number;
    elementType: number;
}
export const PlayerCard = ({ player, index, elementType }: PlayerCardProps): JSX.Element => {
    
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
    console.log(player);
    const removePlayer = useCallback(() => {
        dispatch(removePlayerFromSquad({ index, element_type: elementType }));
    }, [dispatch, index, elementType]);
    return (
        <div className="player-card bg-slate-300 rounded-lg flex flex-col justify-center content-center text-xs sm:text-base">
            {player && !player.isPlaceholder ? (
                <>
                    <div className='flex flex-col content-center justify-center items-center'>
                        <div className="relative right-5 top-0 hidden sm:block">
                            <button
                                type="button"
                                onClick={() => removePlayer()}
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
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
                <button onClick={handleDraftModalOpen} className="flex flex-col items-center justify-center h-10 w-10 border-2 border-dashed border-gray-400 rounded-lg">
                    <PlusIcon className="h-5 w-5 text-gray-500"/>
                </button>
            )}
            <DraftPlayersModal show={draftModalShow} onHide={handleDraftModalClose} onSelection={onSelectionChanged} preSetPosition={elementType} />

        </div>
        
    );
};