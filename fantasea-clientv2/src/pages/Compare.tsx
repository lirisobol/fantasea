import { useState } from "react"
import { ComparePlayersModalButton } from "../components/modals/ComparePlayersModal/ComparePlayersModalButton"
import ComparePlayersModal from "../components/modals/ComparePlayersModal/ComparePlayersModal";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Element } from "../models/gen-info/Element";
import { PlayerComparison } from "../components/PlayerComparison/PlayerComparison";
import { ClearAllButton } from "../components/PlayerComparison/ClearAllButton";
import ClearAllModal from "../components/PlayerComparison/ClearAllModal";
import { clearAllPlayers } from "../store/slices/player-compare";

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
                    <PlayerComparison key={player.id} player={player}/>
                ))}

            </div>
            <ComparePlayersModal show={compareModalShow} onHide={handleCompareModalClose}/>
        </div>
    )
}
