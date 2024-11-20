import { useState } from "react";
import { Board } from "../components/Draft/Board";
import { DraftControls } from "../components/Draft/Controls/DraftControls";
import { KeySchedule } from "../components/Draft/KeySchedule/KeySchedule";
import ListViewDrawer from "../components/Draft/ListView/ListViewDrawer"; // Import here
import ScheduleDrawer from "../components/Draft/KeySchedule/ScheduleDrawer";

export const Draft = (): JSX.Element => {
  const [listViewShow, setListViewShow] = useState<boolean>(false);
  const [scheduleShow, setScheduleShow] = useState<boolean>(false);

  const openListView = () => {
    setListViewShow(true);
  };
  const closeListView = () => {
    setListViewShow(false);
  };

  const openSchedule = () => {
    setScheduleShow(true);
  };
  const closeSchedule = () => {
    setScheduleShow(false);
  };

  return (
    // Draft Page
    <div className="flex flex-col h-full">
      <div className="py-1  w-full px-4">
        <DraftControls openListView={openListView} openSchedule={openSchedule}/>
      </div>
      <div className="flex flex-row h-full">
        <div className="lg:w-3/4 w-full h-full relative z-0">
          <Board />
            <ListViewDrawer show={listViewShow} onHide={closeListView} />
        </div>

        <div className="lg:w-1/4 hidden lg:block">
          <KeySchedule />
          <ScheduleDrawer show={scheduleShow} onHide={closeSchedule}/>
        </div>
      </div>
    </div>
  );
};
