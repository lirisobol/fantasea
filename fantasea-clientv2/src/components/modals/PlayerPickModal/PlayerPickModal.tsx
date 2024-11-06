// PlayerPickModal.tsx
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import PlayersTableTailwind from "../../Tables/PlayersTableTailwind";
import { PlayersDraftTableFilterGroup } from "../../Filters/PlayersDraftTableFilterGroup";
import { PlayersTableFilterGroup } from "../../Filters/PlayersTableFilterGroup";

interface PlayerPickModalProps {
  show: boolean;
  onHide: () => void;
  onSelection: (player: Element) => void;
  positionType: number;
}

export default function PlayerPickModal({
  show,
  onHide,
  onSelection,
  positionType,
}: PlayerPickModalProps) {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onHide}>
          {/* Background Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          {/* Modal Content */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              {/* Modal Panel */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-7xl max-h-[90vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  {/* Close Button */}
                  <div className="absolute right-0 top-0 pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      onClick={onHide}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Title */}
                  <Dialog.Title
                    as="div"
                    className="
                        flex flex-col md:flex-row items-center justify-center
                        p-2 text-gray-900
                        "
                  >
                    Pick a Player
                  </Dialog.Title>

                  {/* Body */}
                  <div className="flex flex-col gap-2">
                    <div>
                        <PlayersDraftTableFilterGroup />
                    </div>
                    <PlayersTableTailwind
                      onSelection={onSelection}
                      preSetPosition={positionType} // Pass position type for filtering
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
