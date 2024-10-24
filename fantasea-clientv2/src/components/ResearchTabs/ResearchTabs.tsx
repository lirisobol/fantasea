import React, { useState } from 'react';
import { Players as PlayersPageComponent } from '../../pages/Players';
import { FDR as FDRPageComponent } from '../../pages/FDR';
import { Compare as PlayerComparePageComponent } from '../../pages/Compare';

const tabComponents = {
  'Players': PlayersPageComponent,
  'FDR': FDRPageComponent,
  'Compare': PlayerComparePageComponent,
};

const tabs = [
  { name: 'Players', current: true },
  { name: 'FDR', current: false },
  { name: 'Compare', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ResearchTabs() {
  const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.current)?.name);
  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex flex-col h-full py-5">
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
      <div className="flex-grow h-full mt-5">
        {ActiveTabComponent && <ActiveTabComponent />}
      </div>
    </div>
  );
}
