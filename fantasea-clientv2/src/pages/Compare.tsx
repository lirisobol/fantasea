import { useCallback, useState } from "react"
import { ComparePlayersModalButton } from "../components/modals/ComparePlayersModal/ComparePlayersModalButton"
import ComparePlayersModal from "../components/modals/ComparePlayersModal/ComparePlayersModal";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Element } from "../models/gen-info/Element";
import { ClearAllButton } from "../components/PlayerComparison/ClearAllButton";
import ClearAllModal from "../components/PlayerComparison/ClearAllModal";
import { addPlayer, clearAllPlayers } from "../store/slices/player-compare";
import { PlayerComparisonCard } from "../components/PlayerComparison/PlayerComparison";
import { SelectionChangedEvent } from "ag-grid-community";

export const Compare = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const selectedPlayers: Element[] = useAppSelector(state => state.playerCompare.selectedPlayers ?? []);
    const [compareModalShow, setCompareModalShow] = useState<boolean>(false);
    const handleCompareModalOpen = () => setCompareModalShow(true);
    const handleCompareModalClose = () => setCompareModalShow(false);

    const [clearAllModalShow, setClearAllModalShow] = useState<boolean>(false);
    const handleClearAllModalOpen = () => setClearAllModalShow(true);
    const handleClearAllModalCloseRemove = () => {
        dispatch(clearAllPlayers());
        setClearAllModalShow(false)
    }; 
    const handleClearAllModalCloseCanceled = () => setClearAllModalShow(false); 

    const onSelectionChanged = useCallback((event:SelectionChangedEvent) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        const selectedData = selectedNode ? selectedNode.data : null;
        if (selectedData) {
            dispatch(addPlayer(selectedData))
            handleCompareModalClose();
        }
    }, [dispatch]);
    
    return (
        <div className="flex flex-col flex-wrap justify-center gap-4">
            <div className="flex justify-center gap-5">
                <ComparePlayersModalButton openModal={handleCompareModalOpen}/>
                <ClearAllButton openModal={handleClearAllModalOpen} />
                <ClearAllModal 
                    show={clearAllModalShow}
                    onHideCancel={handleClearAllModalCloseCanceled}
                    onHideRemove={handleClearAllModalCloseRemove}
                />
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-4">
                {selectedPlayers.map(player => (
                    <PlayerComparisonCard key={player.id} player={player}/>
                ))}

            </div>
            <ComparePlayersModal show={compareModalShow} onHide={handleCompareModalClose} onSelection={onSelectionChanged}/>
        </div>
    )
}
