import { useEffect, useState } from "react";
import { Element } from "../../../models/gen-info/Element";
import { Team } from "../../../models/gen-info/Team";
import { useAppSelector } from "../../../store/store";
import { Fixture } from "../../../models/gen-info/Fixture";
import { generalHelpers } from "../../../services/general-helpers/general-helpers";
import { Tab } from "@headlessui/react";
import { PlayerFixtureHistory } from "./PlayerFixtureHistory";
import { PlayerFixtureUpcoming } from "./PlayerFixtureUpcoming";
import { playerHistoryService } from "../../../services/data/PlayerHistory";
import { PlayerHistoryItem } from "../../../models/PlayerHistoryItems";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

interface PlayerDetailsTabsProps {
    player: Element;
}

export const PlayerDetailsTabs = ({ player }: PlayerDetailsTabsProps): JSX.Element => {
    const [playerHistoryData, setPlayerHistoryData] = useState<PlayerHistoryItem[] | null>(null);

    const currentGameWeekId = useAppSelector<number>((state) => state.genInfo.data?.currentGameWeekId);
    const teams = useAppSelector<Team[]>((state) => state.genInfo.data?.teams);
    const [fixtureHistory, setFixtureHistory] = useState<Fixture[]>([]);
    const [fixtureUpcoming, setFixtureUpcoming] = useState<Fixture[]>([]);
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
          Upcoming
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2 max-h-80 overflow-y-auto">
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          )}
        >
          {/* Fixture History Content */}
          <div className="flex flex-col w-full">
            {fixtureHistory.length > 0 ? (
              fixtureHistory.map((fixture) => (
                <PlayerFixtureHistory
                  key={fixture.id}
                  player={player}
                  fixture={fixture}
                  teams={teams}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No history available.</p>
            )}
          </div>
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          )}
        >
          {/* Upcoming Fixtures Content */}
          <div className="flex flex-col w-full">
            {fixtureUpcoming.length > 0 ? (
              fixtureUpcoming.map((fixture) => (
                <PlayerFixtureUpcoming
                  key={fixture.id}
                  player={player}
                  fixture={fixture}
                  teams={teams}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No upcoming fixtures.</p>
            )}
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
