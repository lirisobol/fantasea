import { useState } from "react";
import { DraftElement, pickPlayer } from "../../store/slices/draft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PlayerPickModal from "../modals/PlayerPickModal/PlayerPickModal";
import { useDispatch } from "react-redux";
import { Element } from "../../models/gen-info/Element";
interface EmptyCardProps {
  player: DraftElement;
}

export const EmptyCard = ({ player }: EmptyCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const [playerPickModalShow, setPlayerPickModalShow] =
    useState<boolean>(false);

  const openPlayerPickModal = () => {
    setPlayerPickModalShow(true);
  };

  const closePlayerPickModal = () => {
    setPlayerPickModalShow(false);
  };

  const handleAddPlayer = () => {
    openPlayerPickModal();
  };

  // Handle the selected player
  const onPlayerSelected = (selectedPlayer: Element) => {
    console.log("Selected player:", selectedPlayer);
    dispatch(
      pickPlayer({
        draftPosition: player.draftPosition,
        player: selectedPlayer,
      })
    );
    closePlayerPickModal();
  };

  return (
    <div
      onClick={handleAddPlayer}
      className="cursor-pointer bg-slate-100 opacity-80 w-full h-full flex justify-center items-center"
    >
      <div className="text-gray-400">
        <FontAwesomeIcon icon={faPlus} size="1xl" />
      </div>
      <PlayerPickModal
        show={playerPickModalShow}
        onHide={closePlayerPickModal}
        onSelection={onPlayerSelected}
        positionType={player.positionType}
      />
    </div>
  );
};
