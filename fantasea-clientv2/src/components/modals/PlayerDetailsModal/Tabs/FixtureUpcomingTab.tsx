import { Fixture } from "../../../../models/gen-info/Fixture";
import { Team } from "../../../../models/gen-info/Team";
import { Element } from "../../../../models/gen-info/Element";
import { PlayerFixtureUpcoming } from "../PlayerFixtureUpcoming";


interface FixtureUpcomingTabProps {
    player: Element;
    fixtureUpcoming: Fixture[];
    teams: Team[];
}
export const FixtureUpcomingTab = ({player, fixtureUpcoming, teams}: FixtureUpcomingTabProps):JSX.Element => {
    return (
        <div className="w-full">
            <div className="flex flex-col w-full">
                {fixtureUpcoming.length > 0 ? (
                    fixtureUpcoming.map((fixture) => (
                        <PlayerFixtureUpcoming 
                            key={fixture.id}
                            player={player}
                            fixture={fixture}
                            teams={teams}
                        />
                    ))): (
                        <p className="text-center text-gray-500">No history available.</p>
                    )
            }
            </div>
        </div>
    )
}