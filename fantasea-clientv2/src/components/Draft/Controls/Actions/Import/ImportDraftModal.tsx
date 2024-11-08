import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ManagerSearch } from "../../../../MyFPL/Manager/ManagerSearch";
import { draftService } from "../../../../../services/Draft/Draft";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { setSquad } from "../../../../../store/slices/draft";
import { Element } from "../../../../../models/gen-info/Element";
import { LoadingSpinner } from "../../../../Loading/LoadingSpinner/LoadingSpinner";
import { ManagerIdGuide } from "./ManagerIdGuide";

interface ImportDraftModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ImportDraftModal({
  show,
  onHide,
}: ImportDraftModalProps) {
  const dispatch = useAppDispatch();
  const currentEvent = useAppSelector<number>(
    (state) => state.genInfo.data?.currentGameWeekId
  );
  const elements = useAppSelector<Element[]>(
    (state) => state.genInfo.data?.elements
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleManagerSearch = async (managerId: string) => {
    setLoading(true);
    setError("");
    const id = parseInt(managerId);
    try {
      if (!elements) {
        console.error("Elements data not available.");
        return;
      }

      // Now, importManagerTeam returns both squad and managerStats
      const { squad, managerStats } = await draftService.importManagerTeam(
        id,
        currentEvent,
        elements
      );

      // Calculate budget based on manager's bank and team value
      const budget = (managerStats.bank + managerStats.value) / 10;

      // Dispatch action to set squad and managerStats
      dispatch(setSquad({ squad, budget, managerStats }));

      onHide();
      setLoading(false);
      console.log("Squad imported successfully.");
    } catch (err) {
      console.error("Error Fetching Data", err);
      setError("Failed to fetch manager details");
    } finally {
      setLoading(false);
    }
  };
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
                <Dialog.Panel className="w-full max-w-7xl max-h-[90vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                        text-xl
                        font-semibold
                        "
                  >
                    Import Your Own FPL Team
                  </Dialog.Title>

                  {/* Body */}
                  <div className="flex flex-col justify-center items-center p-12 gap-12">
                    <div>
                      <ManagerSearch
                        onSubmit={handleManagerSearch}
                        loading={loading}
                        setError={setError}
                      />
                    </div>
                    <div className="w-full flex justify-center">
                        <ManagerIdGuide />
                    </div>
                    {loading && <LoadingSpinner />}
                    {error && <div className="p-4 text-red-500">{error}</div>}
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
