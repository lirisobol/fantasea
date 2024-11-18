import { Square3Stack3DIcon } from "@heroicons/react/20/solid";
import ActionsDropDown from "./Actions/ActionsDropDown";

interface DraftControlsProps {
  openListView: () => void;
  openSchedule: () => void;
}

export const DraftControls = ({
  openListView,
  openSchedule
}: DraftControlsProps): JSX.Element => {
  return (
    <div className="flex flex-row justify-between px-2 py-1.5">
      <div className="">
        <button
          onClick={openListView}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black text-white px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-white hover:text-black transition"
        >
          List View
        <Square3Stack3DIcon aria-hidden="true" className="-mr-1 size-4 lg:size-5 transition" />

        </button>
      </div>
      <div className="flex gap-2">
        
        <button
          onClick={openSchedule}
          className="lg:hidden inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black text-white px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-white hover:text-black transition"
        >
          Schedule
        <Square3Stack3DIcon aria-hidden="true" className="-mr-1 size-4 lg:size-5 transition" />

        </button>
        <ActionsDropDown />
      </div>
    </div>
  );
};
