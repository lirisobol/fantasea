import { useCallback, useState } from "react";
import { PlayersTableFilterGroup } from "../components/Filters/PlayersTableFilterGroup";
import PlayerDetailsModal from "../components/modals/PlayerDetailsModal/PlayerDetailsModal";
import { Team } from "../models/gen-info/Team";
import { useAppSelector } from "../store/store";
import { Element } from "../models/gen-info/Element";
import PlayersTableTailwind from "../components/Tables/PlayersTableTailwind";

export const Players = (): JSX.Element => {
  const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
  const [selectedPlayer, setSelectedPlayer] = useState<Element | null>(null);
  const [playerDetailsModalShow, setPlayerDetailsModalShow] =
    useState<boolean>(false);
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
    <div className="flex flex-col h-5/6">
      <div className="flex-shrink-0">
        <PlayersTableFilterGroup />
      </div>
      <div className="flex-grow overflow-y-auto">
        <PlayersTableTailwind onSelection={onSelection} />
      </div>
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
