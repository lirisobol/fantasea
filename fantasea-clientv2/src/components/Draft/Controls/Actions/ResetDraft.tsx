import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ResetDraft = (): JSX.Element => {
  return (
    <div
      className="border shadow-sm rounded-br-md rounded-tl-xl px-8 py-1 text-white bg-slate-700
      hover:bg-slate-600 hover:rounded transition
      "
    >
      Reset
      <FontAwesomeIcon icon={faRotateRight} style={{ marginLeft: 12 }} />
    </div>
  );
};
