import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { draftService } from "../../../../services/Draft/Draft";
import { useAppSelector } from "../../../../store/store";

export const ImportDraft = (): JSX.Element => {
  const currentEvent = useAppSelector<number>(
    (state) => state.genInfo.data?.currentGameWeekId
  );

  const importTest = async () => {
    const managerId = 285005;
    const managerPicks = await draftService.importManagerTeam(
      managerId,
      currentEvent
    );
    console.log(managerPicks);
  };
  return (
    <div
      onClick={importTest}
      className="
        border shadow-sm rounded-br-md rounded-tl-xl px-8 py-1 text-white
        bg-gradient-to-r from-emerald-400 to-cyan-400
        hover:bg-gradient-to-r from-emerald-500 to-cyan-500
        hover:rounded"
    >
      Import Draft
      <FontAwesomeIcon icon={faFileImport} style={{ marginLeft: 12 }} />
    </div>
  );
};
