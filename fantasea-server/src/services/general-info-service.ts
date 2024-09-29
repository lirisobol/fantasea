// services/GeneralInfoService.ts
import axios from "axios";
import GeneralInfo from "../models/general-info/general-info";
import { ResourceNotFoundError } from "../models/client-errors";
import { handleError } from "../utils/error-handler";
import { Fixture } from "../models/general-info/Fixture";
import { Event } from "../models/general-info/Event";

class GeneralInfoService {
    private generalInfoEndpoint = "https://fantasy.premierleague.com/api/bootstrap-static/";
    private fixturesEndpoint = "https://fantasy.premierleague.com/api/fixtures/";

    public async fetchGeneralInfo(): Promise<GeneralInfo> {
        try {
            // Fetch general information
            const generalInfoResponse = await axios.get(this.generalInfoEndpoint);

            if (!generalInfoResponse.data) {
                throw new ResourceNotFoundError("General Information Data is missing.");
            }

            // Initialize GeneralInfo with the fetched data
            const generalInfo = new GeneralInfo(generalInfoResponse.data);

            // Fetch fixtures
            const fixtures = await this.fetchFixtures();

            // Populate fixtures array under genInfo
            generalInfo.fixtures = fixtures;

            // Populate fixtures in Events
            this.populateFixturesInEvents(generalInfo, fixtures);

            // Populate fixtures in Teams
            this.populateFixturesInTeams(generalInfo, fixtures);

            // Find Current Game week 
            generalInfo.currentGameWeekId = this.getCurrentGameWeekId(generalInfo.events);
            // Find Next Game week
            generalInfo.nextGameWeekId = this.getNextGameWeekId(generalInfo.events);

            return generalInfo;
        } 
        catch (err) {
            handleError(err);
        }
    };
    private getCurrentGameWeekId(events: Event[]):number {
        const currentGameWeekId = events.find(event => event.is_current === true)?.id;
        return currentGameWeekId as number;
    };
    private getNextGameWeekId(events: Event[]):number {
        const nextGameWeekId = events.find(event => event.is_next === true)?.id;
        return nextGameWeekId as number;
    };

    // Fetch fixtures from the API
    private async fetchFixtures(): Promise<Fixture[]> {
        try {
            const response = await axios.get(this.fixturesEndpoint);
            if (!response.data) {
                throw new ResourceNotFoundError("Fixture Data is missing.");
            }
            return response.data as Fixture[];
        } 
        catch (err) {
            handleError(err);
        }
    }

    // Populate fixtures in events based on event ID
    private populateFixturesInEvents(generalInfo: GeneralInfo, fixtures: Fixture[]): void {
        // Create a map of events by event ID
        const eventMap = new Map<number, Fixture[]>();

        // Populate the map with fixtures categorized by their event ID
        fixtures.forEach((fixture) => {
            if (!eventMap.has(fixture.event)) {
                eventMap.set(fixture.event, []);
            }
            eventMap.get(fixture.event)!.push(fixture);
        });

        // Assign the fixtures to the corresponding event in GeneralInfo
        generalInfo.events.forEach((event) => {
            // Default to null if no fixtures found
            event.fixtures = eventMap.get(event.id) ?? null;
        });
    }
    // Populate fixtures in each team based on team_h and team_a
    private populateFixturesInTeams(generalInfo: GeneralInfo, fixtures: Fixture[]): void {
        const teamMap = new Map<number, Fixture[]>();

        // Initialize map with empty arrays for each team
        generalInfo.teams.forEach((team) => {
            teamMap.set(team.id, []);
        });

        // Map fixtures to the corresponding teams
        fixtures.forEach((fixture) => {
            // Add fixture to the home team
            if (teamMap.has(fixture.team_h)) {
                teamMap.get(fixture.team_h)!.push(fixture);
            }

            // Add fixture to the away team
            if (teamMap.has(fixture.team_a)) {
                teamMap.get(fixture.team_a)!.push(fixture);
            }
        });

        // Assign the mapped fixtures to each team in GeneralInfo
        generalInfo.teams.forEach((team) => {
            team.fixtures = teamMap.get(team.id) ?? null;
        });
    }
}

export const generalInfoService = new GeneralInfoService();
