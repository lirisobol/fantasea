import { useCallback, useState } from "react";
import { PlayersTableFilterGroup } from "../components/Filters/PlayersTableFilterGroup";
import PlayerDetailsModal from "../components/modals/PlayerDetailsModal/PlayerDetailsModal";
import { Team } from "../models/gen-info/Team";
import { useAppSelector } from "../store/store";
import { SelectionChangedEvent } from "ag-grid-community";
import { Element } from "../models/gen-info/Element";
import { PlayersTableSelectable } from "../components/Tables/PlayersTableSelectable";

export const Players = ():JSX.Element => {
    const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
    const [selectedPlayer, setSelectedPlayer ] = useState<Element | null>(null);
    const [playerDetailsModalShow, setPlayerDetailsModalShow] = useState<boolean>(false);
    const handlePlayerDetailsModalOpen = () => setPlayerDetailsModalShow(true);
    const handlePlayerDetailsModalClose = () => setPlayerDetailsModalShow(false);

    const onSelect = useCallback((event: SelectionChangedEvent) => {
        const selectedNode = event.api.getSelectedNodes()[0];
        const selectedData = selectedNode ? selectedNode.data : null;
        if (selectedData) {
          setSelectedPlayer(selectedData);
          handlePlayerDetailsModalOpen();
        }
      }, [setSelectedPlayer, handlePlayerDetailsModalOpen]);
      
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex-shrink-0">
                <PlayersTableFilterGroup />
            </div>
            {teams && 
                <div className="flex-grow overflow-y-auto h-full">
                    <PlayersTableSelectable 
                        onSelection={onSelect}
                    />
                </div>
            }
            {selectedPlayer && (
                <PlayerDetailsModal 
                show={playerDetailsModalShow}
                onHide={handlePlayerDetailsModalClose}
                player={selectedPlayer}
            />
            )}

        </div>
    )
}