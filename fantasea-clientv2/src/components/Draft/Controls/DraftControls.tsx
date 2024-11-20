import {
  CalendarDateRangeIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/20/solid";
import ActionsDropDown from "./Actions/ActionsDropDown";

interface DraftControlsProps {
  openListView: () => void;
  openSchedule: () => void;
}

export const DraftControls = ({
  openListView,
  openSchedule,
}: DraftControlsProps): JSX.Element => {
  return (
    <div className="flex flex-row justify-between px-2 py-1.5">
      <div
        className="
      flex flex-col justify-center items-center text-xs gap-1
      md:flex-row md:ring-1 md:ring-gray-400 md:px-4 md:py-2
      rounded-md    
      "
      >
        <button
          onClick={openListView}
          className="
          rounded-md
          px-5 py-5 md:px-0 md:py-0
          ring-1 ring-gray-400 ring-inset md:ring-0
          hover:bg-gray-100
          transition
          "
        >
          <Square3Stack3DIcon
            aria-hidden="true"
            className="size-4 lg:size-4 transition"
          />
        </button>
        List View
      </div>

      <div
        className="
      flex flex-col justify-center items-center text-xs gap-1
        md:flex-row md:ring-1 md:ring-gray-400 md:px-4 md:py-2
        rounded-md
        lg:hidden

      "
      >
        <button
          onClick={openSchedule}
          className="
          rounded-md
          px-5 py-5 md:px-0 md:py-0
          ring-1 ring-gray-400 ring-inset md:ring-0
          transition"
        >
          <CalendarDateRangeIcon
            aria-hidden="true"
            className="size-4 lg:size-4 transition"
          />
        </button>
        Schedule
      </div>

      <div className="flex gap-2">
        <ActionsDropDown />
      </div>
    </div>
  );
};
