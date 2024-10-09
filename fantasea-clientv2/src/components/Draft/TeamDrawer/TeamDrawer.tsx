import { Dialog, DialogPanel, DialogTitle} from '@headlessui/react';
import { XMarkIcon} from '@heroicons/react/20/solid';
import { TeamDrawerSquad } from './TeamDrawerSquad';
import { TeamDrawerBench } from './TeamDrawerBench';
import { useState } from 'react';
import { TeamDrawerBenchAndSquad } from './TeamDrawerBenchAndSquad';
import { DraftBudget } from '../DraftBudget';
import { SelectedCounter } from '../SelectedCounter';


const tabComponents = {
    'All' : TeamDrawerBenchAndSquad,
    'Squad': TeamDrawerSquad,
    'Bench': TeamDrawerBench
}
const tabs = [
    { name: 'All', current: true },
    { name: 'Squad', current: false },
    { name: 'Bench', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

interface TeamDrawerProps {
    show: boolean;
    handleClose: () => void;
}

export default function TeamDrawer({ show, handleClose }: TeamDrawerProps): JSX.Element {
    const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.current)?.name);
    const ActiveTabComponent = tabComponents[activeTab];

    return (
        <Dialog open={show} onClose={handleClose} className="relative z-10">


            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                    <DialogPanel
                        transition
                        className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Team</DialogTitle>

                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                              type="button"
                                              onClick={handleClose}
                                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                            >
                                              <span className="sr-only">Close panel</span>
                                              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-5 flex flex-col sm:flex-row justify-center gap-5'>
                                    <DraftBudget />
                                    <SelectedCounter />
                                </div>
                                <div className="px-6">
                                    <nav className="-mb-px flex space-x-6" aria-label='Tabs'>
                                        {tabs.map((tab) => (
                                            <button
                                            key={tab.name}
                                            onClick={() => setActiveTab(tab.name)}
                                            aria-current={tab.name === activeTab ? 'page' : undefined}
                                            className={classNames(
                                                tab.name === activeTab
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                                            )}
                                            >
                                            {tab.name}
                                          </button>
                                        ))}
                                    </nav>
                                </div>
                                {ActiveTabComponent && <ActiveTabComponent />}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
