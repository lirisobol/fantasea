import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ShareDraft = (): JSX.Element => {
  return (
    <div
      className="
        border shadow-sm rounded-br-xl rounded-tl-xl px-8 py-1 text-white
        bg-gradient-to-r from-sky-400 to-blue-400
        hover:bg-gradient-to-r from-sky-500 to-blue-500
        hover:rounded
        transition"
    >
      Share Draft
      <FontAwesomeIcon  icon={faShare} style={{marginLeft:12}}/>
    </div>
  );
};
