import { useEffect, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setTeam } from '../../store/slices/filters';
import { Team } from '../../models/gen-info/Team';

export default function ClubSelect() {
    const dispatch = useAppDispatch();
    const teams = useAppSelector((state) => state.genInfo.data?.teams);
    const teamCode = useAppSelector((state) => state.filters.teamCode);

    const [selected, setSelected] = useState<Team | undefined>(teams?.find(team => team.code === teamCode));

    useEffect(() => {
        setSelected(teams?.find(team => team.code === teamCode));
    }, [teamCode, teams]);

    const handleClubChange = (newSelected: Team) => {
        setSelected(newSelected);
        dispatch(setTeam(newSelected.code));
    };

    const getJerseyPath = (teamCode: number) => `/assets/images/kits/${teamCode}.png`;

    return (
        <Listbox value={selected} onChange={handleClubChange}>
            <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        {selected ? (
                            <img alt={selected.name} src={getJerseyPath(selected.code)} className="h-5 w-5 flex-shrink-0 rounded-full" />
                        ) : (
                            <div className="h-5 w-5 flex-shrink-0 rounded-full bg-gray-200" /> // Placeholder for no image
                        )}
                        <span className="ml-3 block truncate">{selected ? selected.name : 'Select a team'}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                </ListboxButton>
                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {teams && teams.map((team) => (
                        <ListboxOption
                            key={team.code}
                            value={team}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-500 hover:text-white"
                        >
                            <div className="flex items-center">
                                <img alt={team.name} src={getJerseyPath(team.code)} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                <span className="ml-3 block truncate font-normal">
                                    {team.name}
                                </span>
                            </div>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 hidden group-hover:block">
                                <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}
