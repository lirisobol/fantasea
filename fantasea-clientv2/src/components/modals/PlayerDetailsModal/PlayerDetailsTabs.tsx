import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element";
import { Team } from "../../../models/gen-info/Team";
import { useAppSelector } from "../../../store/store";
import { Fixture } from "../../../models/gen-info/Fixture";
import { generalHelpers } from "../../../services/general-helpers/general-helpers";
import { Tab } from "@headlessui/react";
import { PlayerHistoryItem } from "../../../models/PlayerHistoryItems";
import { FixtureHistoryTab } from "./Tabs/FixtureHistoryTab";
import { FixtureUpcomingTab } from "./Tabs/FixtureUpcomingTab";
import { PerformanceTab } from "./Tabs/PerformanceTab";



function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

interface PlayerDetailsTabsProps {
    player: Element;
    history: PlayerHistoryItem[];
}
export const PlayerDetailsTabs = ({ player, history }: PlayerDetailsTabsProps): JSX.Element => {
    const currentGameWeekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);
    const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
    const [fixtureHistory, setFixtureHistory] = useState<Fixture[]>([]);
    const [fixtureUpcoming, setFixtureUpcoming] = useState<Fixture[]>([]);

    useEffect(() => {
        if (!player.isPlaceholder) {
            const team = generalHelpers.getTeamByPlayer(player, teams);

            if (team && team.fixtures) {
                const history: Fixture[] = team.fixtures.filter(
                  (fixture) => fixture.event <= currentGameWeekId
                );
                setFixtureHistory(history);

                const upcoming: Fixture[] = team.fixtures.filter(
                  (fixture) => fixture.event > currentGameWeekId
                );
                setFixtureUpcoming(upcoming);
            }
        }
    }, [player, teams, currentGameWeekId]);

    return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          History
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Fixtures
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Performance
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2 max-h-80 overflow-y-auto">
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          )}
        >
            <FixtureHistoryTab
              player={player}
              fixtureHistory={fixtureHistory}
              teams={teams}
              playerHistory={history}
            />
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          )}
        >
            <FixtureUpcomingTab
                player={player}
                fixtureUpcoming={fixtureUpcoming}
                teams={teams}
            />
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          )}
        >
            <PerformanceTab 
                player={player}
                history={history}
            />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
