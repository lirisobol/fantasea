import { Fixture } from "../../models/general-info/Fixture";
import { Event } from "../../models/general-info/Event";

class GeneralTableConfig {

    // Helper function to get the upcoming fixtures for the next 5 games
    public getNextFiveFixtures(teamFixtures: Fixture[], currentGameweek: Event): Fixture[] {
        // Only consider fixtures that occur after the current gameweek
        const upcomingFixtures = teamFixtures.filter(fixture => fixture.event > currentGameweek.id);
        // Sort fixtures by gameweek number
        upcomingFixtures.sort((a, b) => a.event - b.event);
        // Return the next 5 fixtures
        return upcomingFixtures.slice(0, 5);
    }


}
export const generalTableConfig = new GeneralTableConfig();