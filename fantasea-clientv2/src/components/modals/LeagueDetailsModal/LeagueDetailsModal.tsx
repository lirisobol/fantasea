import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { myFPLTrackerService } from '../../../services/data/MyFPLTracker';
import { LeagueDetails } from '../../../models/manager/LeagueDetails';
import { LoadingSpinner } from '../../Loading/LoadingSpinner/LoadingSpinner';
import LeagueTable from '../../Tables/LeagueTable';



interface LeagueDetailsModal {
    show: boolean;
    onHide: () => void;
    leagueId: number;
}

export default function LeagueDetailsModal({ show, onHide, leagueId }: LeagueDetailsModal) {
    const [leagueDetails, setLeagueDetails] = useState<LeagueDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        setError('');
        setLeagueDetails(null);
        const fetchLeagueDetails = async () => {
            try {
                const data = await myFPLTrackerService.fetchLeagueDetails(leagueId);
                setLeagueDetails(data)
                setLoading(false)
            }
            catch (err) {
                setError(error)
            }
        }
        fetchLeagueDetails();
    },[error, leagueId])
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
                  className="w-full max-w-7xl max-h-[90vh] transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  {/* Close Button */}
                  <div className="absolute right-0 top-0 pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      onClick={() => onHide()}
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
                        flex flex-col md:flex-row items-start justify-start
                        p-2 text-gray-900
                        font-bold
                        text-lg
                        "
                    >
                        {leagueDetails?.league_name}
                  </Dialog.Title>

                  {/* Body */}
                  <div className="flex flex-col gap-2">
                    {loading && <LoadingSpinner />}
                    {leagueDetails && <LeagueTable league={leagueDetails} />}
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
