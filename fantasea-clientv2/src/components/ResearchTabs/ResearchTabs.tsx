import React, { useState } from 'react';
import { Players as PlayersPageComponent } from '../../pages/Players';
import { Clubs as ClubsPageComponent } from '../../pages/Clubs';
import { Compare as PlayerComparePageComponent } from '../../pages/Compare';

const tabComponents = {
  'Players': PlayersPageComponent,
  'Clubs': ClubsPageComponent,
  'Compare': PlayerComparePageComponent,
};

const tabs = [
  { name: 'Players', current: true },
  { name: 'Clubs', current: false },
  { name: 'Compare', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ResearchTabs() {
  const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.current)?.name);
  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav aria-label="Tabs" className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              aria-current={tab.name === activeTab ? 'page' : undefined}
              className={classNames(
                tab.name === activeTab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium',
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      {/* Content Area */}
      <div className="flex-grow overflow-y-auto h-svh">
        {ActiveTabComponent && <ActiveTabComponent />}
      </div>
    </div>
  );
}
