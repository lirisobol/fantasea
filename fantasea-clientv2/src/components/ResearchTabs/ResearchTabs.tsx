import React, { useState } from 'react';
import { Players as PlayersPageComponent } from '../../pages/Players';
import { Clubs as ClubsPageComponent } from '../../pages/Clubs';
import { Compare as PlayerComparePageComponent } from '../../pages/Compare';

const tabComponents = {
    'Players': PlayersPageComponent,
    'Clubs': ClubsPageComponent,
    'Compare Players': PlayerComparePageComponent,
};

const tabs = [
    { name: 'Players', current: true },
    { name: 'Clubs', current: false },
    { name: 'Compare Players', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ResearchTabs() {
    const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.current)?.name);
    const ActiveTabComponent = tabComponents[activeTab];

    return (
        <div>
          <div className="hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select
              id="tabs"
              name="tabs"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className='h-full'>
            <div className="border-b border-gray-200">
              <nav aria-label="Tabs" className="-mb-px flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    aria-current={tab.name === activeTab ? 'page' : undefined}
                    className={classNames(
                      tab.name === activeTab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium',
                    )}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className='flex-1 h-full'>
              {ActiveTabComponent && <ActiveTabComponent />}
            </div>
          </div>
        </div>
      );
}
