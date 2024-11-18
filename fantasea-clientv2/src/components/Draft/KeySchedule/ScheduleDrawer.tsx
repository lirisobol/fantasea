import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { KeySchedule } from "./KeySchedule";
import { useAppSelector } from "../../../store/store";
import { KeyScheduleForDrawer } from "./KeyScheduleForDrawer";

interface ScheduleDrawerProps {
  show: boolean;
  onHide: () => void;
}

export default function ScheduleDrawer({
  show,
  onHide,
}: ScheduleDrawerProps): JSX.Element {
  const currentGameweek = useAppSelector<number | undefined>(
    (state) => state.genInfo.data?.currentGameWeekId
  );
  return (
    <Dialog open={show} onClose={onHide} className="relative z-10 opacity-95">
      <div className="absolute inset-0" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Updated Positioning */}
          <div className="pointer-events-none fixed inset-y-40 bottom-10 right-0 md:right-5 flex max-w-full rounded-lg px-2 sm:px-0">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col justify-between overflow-y-scroll bg-white rounded-lg shadow-xl">
                    <DialogTitle className="text-base font-semibold text-gray-900 w-full">
                      <div className="flex justify-center gap-4 bg-gradient-to-r from-emerald-400 to-cyan-400 py-5">
                        <h1 className="text-lg xl:text-2xl font-semibold text-white">
                          Welcome To Gameweek {currentGameweek + 1}
                        </h1>
                        <button
                        type="button"
                        onClick={onHide}
                        className="relative  rounded-md text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                      </button>
                      </div>
                    </DialogTitle>
                    {/* Adjusted Close Button Alignment */}
                    <div className="mr-3 flex h-7 items-center">

                </div>
                <div className="relative">
                  <KeyScheduleForDrawer />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
