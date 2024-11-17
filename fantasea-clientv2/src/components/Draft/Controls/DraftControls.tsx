import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImportDraft } from "./Actions/Import/ImportDraft";
import { ResetDraft } from "./Actions/ResetDraft";
import { ShareDraft } from "./Actions/ShareDraft";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

interface DraftControlsProps {
  openDrawer: () => void;
}

export const DraftControls = ({
  openDrawer,
}: DraftControlsProps): JSX.Element => {
  return (
    <div className="flex flex-row justify-between items-center px-4 gap-4">
      <div className="border border-black text-sm py-2 px-6 rounded-md hover:bg-black hover:text-white transition flex flex-row items-center justify-center">
        <button
          onClick={openDrawer}
          className=""
        >
          <FontAwesomeIcon icon={faListUl} style={{marginRight:12}}/>
          List View
        </button>
      </div>
      {/* Actions */}
      <div className="flex flex-row gap-2">
        <ResetDraft />
        <ImportDraft />
        <ShareDraft />
      </div>
    </div>
  );
};
