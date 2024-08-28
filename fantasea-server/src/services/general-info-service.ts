// services/GeneralInfoService.ts
import axios from "axios";
import GeneralInfo from "../models/general-info/general-info";
import { ResourceNotFoundError } from "../models/client-errors";
import { handleError } from "../utils/error-handler";
import { Fixture } from "../models/general-info/Fixture";

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

            // Populate fixtures in GeneralInfo
            this.populateFixturesInEvents(generalInfo, fixtures);

            return generalInfo;
        } catch (err) {
            handleError(err);
        }
    }

    // Fetch fixtures from the API
    private async fetchFixtures(): Promise<Fixture[]> {
        try {
            const response = await axios.get(this.fixturesEndpoint);
            if (!response.data) {
                throw new ResourceNotFoundError("Fixture Data is missing.");
            }
            return response.data as Fixture[];
        } catch (err) {
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
}

export const generalInfoService = new GeneralInfoService();
