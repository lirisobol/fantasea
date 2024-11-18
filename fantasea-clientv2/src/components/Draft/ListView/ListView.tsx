// ListView component
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Disclosure,
    Transition,
  } from "@headlessui/react";
  import {
    EllipsisVerticalIcon,
    ChevronUpIcon,
    ChevronDownIcon,
  } from "@heroicons/react/20/solid";
  import { useAppSelector } from "../../../store/store";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faGripfire } from "@fortawesome/free-brands-svg-icons";
  
  export default function ListView(): JSX.Element {
    const draftTeam = useAppSelector((state) => state.draft.squad);
    console.log(draftTeam);
  
    const getImage = (teamCode: number) => {
      const url = `/assets/images/kits/${teamCode}.png`;
      return url;
    };
  
    // **Filter the draftTeam to only include picked players**
    const pickedPlayers = draftTeam.filter((player) => player.isPicked);
  
    return (
      <div className="flex flex-col h-full">
        {/* List Content */}
        <div className="">
          <ul role="list" className="divide-y divide-gray-100 px-4">
            {pickedPlayers.map((player) => (
              <Disclosure key={player.stats?.id}>
                {({ open }) => (
                  <li className="py-1">
                    <div className="flex justify-between items-center">
                      <div className="flex min-w-0 gap-x-4 items-center">
                        <img
                          alt=""
                          src={getImage(player.stats?.team_code as number)}
                          className="w-12 h-12 flex-none rounded-full bg-gray-50"
                        />
                        <div className="min-w-0 flex-auto">
                          <Disclosure.Button className="text-left w-full">
                            <div className="flex items-center">
                              <p className="text-sm font-semibold text-gray-900 flex-1">
                                {player.stats?.web_name}
                              </p>
                              <span>
                                {open ? (
                                  <ChevronUpIcon
                                    className="w-5 h-5 text-gray-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <ChevronDownIcon
                                    className="w-5 h-5 text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </div>
                          </Disclosure.Button>
                          <p className="mt-1 flex text-xs text-gray-500">
                            <span className="truncate">
                              Total Points:
                              <span className="font-semibold ml-2">
                                {player.stats?.total_points}pts
                              </span>
                            </span>
                          </p>
                          <p className="mt-1 flex text-xs text-gray-500">
                            <span className="truncate">
                              Point Per Game:
                              <span className="font-semibold ml-2">
                                {player.stats?.points_per_game}pts
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-x-6 ">
                        <Menu as="div" className="relative flex-none">
                          <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon
                              aria-hidden="true"
                              className="w-5 h-5"
                            />
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  className={`block w-full text-left px-3 py-1 text-sm text-gray-900 ${
                                    active ? "bg-gray-50" : ""
                                  }`}
                                >
                                  Replace
                                  <span className="sr-only">
                                    , {player.stats?.web_name}
                                  </span>
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  className={`block w-full text-left px-3 py-1 text-sm text-gray-900 ${
                                    active ? "bg-gray-50" : ""
                                  }`}
                                >
                                  Remove
                                  <span className="sr-only">
                                    , {player.stats?.web_name}
                                  </span>
                                </button>
                              )}
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </div>
                    </div>
                    {/* Add Transition to Disclosure.Panel */}
                    <Transition
                      enter="transition duration-200 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-150 ease-in"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="text-sm text-gray-500 bg-slate-100 rounded-md py-2 mt-2 flex justify-center">
                        {/* Additional stats go here */}
                        <div>
                          <p className="mt-1 flex text-xs text-gray-500">
                            <span className="truncate">
                              Transfers In:
                              <span className="font-semibold ml-2 text-gray-500">
                                {player.stats?.transfers_in_event}
                              </span>
                            </span>
                          </p>
                          <p className="mt-1 flex text-xs text-gray-500">
                            <span className="truncate">
                              Transfers Out:
                              <span className="font-semibold ml-2 text-gray-500">
                                {player.stats?.transfers_out_event}
                              </span>
                            </span>
                          </p>
                          <p className="mt-1 flex text-xs text-gray-500">
                            <span className="truncate">
                              Transfers Difference:
                              <span className="font-semibold ml-2 text-gray-500">
                                {player.stats &&
                                player.stats?.transfers_in_event -
                                  player.stats?.transfers_out_event >
                                  0 ? (
                                  <span className="text-teal-500">
                                    {player.stats?.transfers_in_event -
                                      player.stats?.transfers_out_event}
                                  </span>
                                ) : (
                                  <span className="text-rose-500">
                                    {player.stats &&
                                      player.stats?.transfers_in_event -
                                        player.stats?.transfers_out_event}
                                  </span>
                                )}
                              </span>
                            </span>
                          </p>
                          <p className="mt-1 flex text-xs text-gray-500">
                            <span className="truncate">
                              Selected By:
                              <span className="font-bold ml-2">
                                {player.stats?.selected_by_percent}%
                                {player.stats?.selected_by_percent > 30 && (
                                  <FontAwesomeIcon
                                    icon={faGripfire}
                                    style={{
                                      color: "red",
                                      marginLeft: 10,
                                      scale: "1.3",
                                    }}
                                  />
                                )}
                              </span>
                            </span>
                          </p>
                          {/* Add more stats as needed */}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </li>
                )}
              </Disclosure>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  