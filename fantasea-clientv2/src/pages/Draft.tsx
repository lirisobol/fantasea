import { useState } from "react";
import { Board } from "../components/Draft/Board";
import { DraftControls } from "../components/Draft/Controls/DraftControls";
import { KeySchedule } from "../components/Draft/KeySchedule/KeySchedule";
import ListViewDrawer from "../components/Draft/ListView/ListViewDrawer"; // Import here

export const Draft = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  const openDrawer = () => {
    setShow(true);
  };
  const closeDrawer = () => {
    setShow(false);
  };

  return (
    // Draft Page
    <div className="flex flex-col h-full">
      <div className="py-1 w-3/4">
        <DraftControls openDrawer={openDrawer} />
      </div>
      <div className="flex flex-row h-full">
        <div className="lg:w-3/4 w-full h-full relative z-0">
          <Board />
            <ListViewDrawer show={show} onHide={closeDrawer} />
        </div>

        <div className="lg:w-1/4 hidden lg:block">
          <KeySchedule />
        </div>
      </div>
    </div>
  );
};
