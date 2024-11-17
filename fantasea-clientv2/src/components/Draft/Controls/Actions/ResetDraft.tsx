import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ResetDraft = (): JSX.Element => {
  return (
    <div
      className="
      flex items-center justify-center rounded-md
      border shadow-sm px-6 py-2 text-white bg-slate-700
      hover:bg-slate-600 hover:rounded transition
      "
    >
      Reset
      <FontAwesomeIcon icon={faRotateRight} style={{ marginLeft: 12 }} />
    </div>
  );
};
