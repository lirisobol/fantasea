import { DraftElement } from "../../store/slices/draft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface EmptyCardProps {
  player: DraftElement;
}

export const EmptyCard = ({ player }: EmptyCardProps): JSX.Element => {
//   const dispatch = useDispatch();

  const handleAddPlayer = () => {
    alert(`add player test
           --------------
           picked:${player.isPicked} 
           cap:${player.isCaptain} 
           positionType:${player.positionType} 
           draftPosition:${player.draftPosition} 
        
        `)
    // Dispatch action to open player selection modal
    // Pass the positionType and draftPosition to the modal
    // dispatch(openPlayerSelectionModal(player));
  };

  return (
    <div onClick={handleAddPlayer} className="cursor-pointer bg-slate-100 opacity-80 w-full h-full flex justify-center items-center">
      <div className="text-gray-400">
        <FontAwesomeIcon icon={faPlus} size="2xl"/>
      </div>
    </div>
  );
};
