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
    <div className="flex flex-row justify-between px-2 py-1">
      <div
        onClick={openListView}
        className="
      flex flex-col justify-center items-center text-xs gap-0.5 text-slate-700
      md:flex-row-reverse md:ring-1 md:ring-gray-400 md:px-4 md:py-2
       rounded-md    
      "
      >
        <button
          onClick={openListView}
          className="
          rounded-md
          px-5 py-2 md:px-0 md:py-0
          ring-1 ring-gray-400 ring-inset md:ring-0
          hover:bg-slate-100
          transition
          "
        >
          <Square3Stack3DIcon
            aria-hidden="true"
            className="size-4 lg:size-4 transition"
          />
        </button>
        <span className="text-[9px] md:text-xs md:mr-2">List View</span>
      </div>

      <div
        onClick={openSchedule}
        className="
      flex flex-col justify-center items-center text-xs gap-0.5 text-slate-700
        md:flex-row md:ring-1 md:ring-gray-400 md:px-4 md:py-2
        rounded-md
        lg:hidden

      "
      >
        <button
          onClick={openSchedule}
          className="
          rounded-md
          px-5 py-2 md:px-0 md:py-0
          ring-1 ring-gray-400 ring-inset md:ring-0
                    hover:bg-slate-100

          transition"
        >
          <CalendarDateRangeIcon
            aria-hidden="true"
            className="size-4 lg:size-4 transition"
          />
        </button>
        <span className="text-[9px] md:text-sm">Schedule</span>
      </div>

      <div className="flex gap-2">
        <ActionsDropDown />
      </div>
    </div>
  );
};
