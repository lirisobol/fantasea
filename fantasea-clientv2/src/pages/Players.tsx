import { useCallback, useState } from "react";
import { PlayersTableFilterGroup } from "../components/Filters/PlayersTableFilterGroup";
import PlayerDetailsModal from "../components/modals/PlayerDetailsModal/PlayerDetailsModal";
import { Element } from "../models/gen-info/Element";
import PlayersTableTailwind from "../components/Tables/PlayersTableTailwind";

export const Players = (): JSX.Element => {
  const [selectedPlayer, setSelectedPlayer] = useState<Element | null>(null);
  const [playerDetailsModalShow, setPlayerDetailsModalShow] = useState<boolean>(false);

  const handlePlayerDetailsModalOpen = () => setPlayerDetailsModalShow(true);
  const handlePlayerDetailsModalClose = () => setPlayerDetailsModalShow(false);

  const onSelection = useCallback(
    (player: Element) => {
      setSelectedPlayer(player);
      handlePlayerDetailsModalOpen();
    },
    [setSelectedPlayer, handlePlayerDetailsModalOpen]
  );

  return (
    <div className="border rounded-lg shadow-lg bg-white h-full flex flex-col">
      {/* Card Header */}
      <div className="px-4 py-10 bg-gray-800 border-b rounded-t-lg">
        <h2 className="text-3xl font-semibold text-gray-100">Players</h2>
      </div>

      {/* Filter Group */}
      <div className="px-4 py-4">
        <PlayersTableFilterGroup />
      </div>

      {/* Table */}
      <div className="overflow-y-auto">
        <PlayersTableTailwind onSelection={onSelection} />
      </div>

      {/* Player Details Modal */}
      {selectedPlayer && (
        <PlayerDetailsModal
          show={playerDetailsModalShow}
          onHide={handlePlayerDetailsModalClose}
          player={selectedPlayer}
        />
      )}
    </div>
  );
};
