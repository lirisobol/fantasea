import { useDispatch } from "react-redux";
import { setSquad } from "../../../../store/slices/draft";
import { useAppSelector } from "../../../../store/store";
import { Element } from "../../../../models/gen-info/Element";
import { draftService } from "../../../../services/Draft/Draft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { LoadingSpinner } from "../../../Loading/LoadingSpinner/LoadingSpinner";
import LoaderBar from "../../../Loading/LoaderBar/LoaderBar";

export const ImportDraft = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const elements = useAppSelector<Element[]>(
    (state) => state.genInfo.data?.elements
  );

  const currentEvent = useAppSelector<number>(
    (state) => state.genInfo.data?.currentGameWeekId
  );

  const importTest = async () => {
    setIsLoading(true);
    const managerId = 285005;
    const managerPicks = await draftService.importManagerTeam(
      managerId,
      currentEvent
    );

    if (!elements) {
      console.error("Elements data not available.");
      return;
    }

    const newSquad = draftService.mapManagerPicksToDraftElements(
      managerPicks,
      elements
    );

    // Calculate budget
    const budget =
      (managerPicks.entry_history.bank + managerPicks.entry_history.value) / 10;

    // Dispatch action to set squad
    dispatch(setSquad({ squad: newSquad, budget }));
    setIsLoading(false);
    console.log("Squad imported successfully.");
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
        {isLoading && <LoadingSpinner />}
      Import Draft
      <FontAwesomeIcon icon={faFileImport} style={{ marginLeft: 12 }} />
    </div>
    
  );
};
