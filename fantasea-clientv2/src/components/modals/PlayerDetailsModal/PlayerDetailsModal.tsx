import { Fragment, useEffect, useState } from 'react';
import { Element } from '../../../models/gen-info/Element';
import { useAppSelector } from '../../../store/store';
import { Team } from '../../../models/gen-info/Team';
import { Dialog, Transition} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { ElementType } from '../../../models/gen-info/ElementType';
import { generalHelpers } from '../../../services/general-helpers/general-helpers';
import { PlayerDetailsTabs } from './PlayerDetailsTabs';
import { playerHistoryService } from '../../../services/data/PlayerHistory';
import { PlayerHistoryItem } from '../../../models/PlayerHistoryItems';
import { PlayerStats } from './PlayerStats';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface PlayerDetailsModalProps {
  show: boolean;
  onHide: () => void;
  player: Element;
}

export default function PlayerDetailsModal({ show, onHide, player }: PlayerDetailsModalProps) {
    const [playerHistoryData, setPlayerHistoryData] = useState<PlayerHistoryItem[] | null>(null);

    const currentGameWeekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);
    const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
    const elementTypes = useAppSelector<ElementType[]>((state) => state.genInfo.data?.element_types);
    const [team, setTeam] = useState<Team | null>(null);
    const [positionString, setPositionString] = useState<string>('');

    useEffect(() => {
        const fetchPlayerHistory = async () => {
            try {
                const data = await playerHistoryService.fetchPlayerHistory(player.id);
                setPlayerHistoryData(data);

            } catch (error) {
                console.error("Error fetching player history data:", error);
            } 
        };
    
        if (player && player.id) {
            fetchPlayerHistory();
        }
    }, [player]);

    useEffect(() => {
      if (!player.isPlaceholder) {
        const team = generalHelpers.getTeamByPlayer(player, teams);
        setTeam(team);
        const position = generalHelpers.getPlayerPositionStringByPlayer(player, elementTypes);
        setPositionString(position);
      }
    }, [teams, elementTypes, player, currentGameWeekId]);

    const jerseyImagePath = player && player.team_code ? `/assets/images/kits/${player.team_code}.png` : '/assets/images/kits/default.png';

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
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
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
                    className="flex flex-row justify-center items-center gap-10 p-4 text-lg font-medium leading-6 text-gray-900"
                  >
                    <div>
                      <img src={jerseyImagePath} alt="Jersey" className="h-24 w-24" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-900 text-xs shadow-md rounded-lg bg-teal-400 px-2 py-1 w-20">
                        {positionString}
                      </span>
                      <span className="">
                        {player.first_name} {player.second_name}
                      </span>
                      <span className="text-gray-500 text-sm">{team?.name}</span>
                    </div>
                  </Dialog.Title>

                  {/* Body */}
                  <div className="flex flex-col gap-2">
                    {/* Player Stats Section */}
                    <PlayerStats player={player} history={playerHistoryData} currentGameweek={currentGameWeekId}/>
                    <hr />
                    {/* Tabs with Fixed Height and Scrollable Content */}
                    <PlayerDetailsTabs player={player} history={playerHistoryData}/>
                    <hr />
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
