import axios from "axios"
import { handleError } from "../utils/error-handler"
import { ManagerDetails } from "../models/manager/ManagerDetails";
import { ManagerHistory } from "../../../fantasea-clientv2/src/models/manager/ManagerHistory";
import { LeagueDetails } from "../models/manager/LeagueDetails";
import { ManagerPicks } from "../models/manager/ManagerPicks";

class MyFPLTrackerService {
    private managerDetailsEndpoint = "https://fantasy.premierleague.com/api/entry/"
    private leagueDetailsEndpoint = "https://fantasy.premierleague.com/api/leagues-classic/"
    // https://fantasy.premierleague.com/api/entry/{team-id}/event/{GW}/picks/
    private managerPicksEndpoint = "https://fantasy.premierleague.com/api/entry/"
    public async fetchManagerDetails(managerId:number):Promise<ManagerDetails> {
        try {
            const response = await axios.get(`${this.managerDetailsEndpoint}${managerId}`)
            const managerDetails:ManagerDetails = response.data
            managerDetails.manager_history = await this.fetchManagerHistory(managerId);
            return managerDetails
        }
        catch (err) {{handleError(err)}};
    }
    public async fetchManagerPicks(managerId:number, event:number):Promise<ManagerPicks> {
        try {
            const response = await axios.get(`${this.managerPicksEndpoint}${managerId}/event/${event}/picks`);
            const ManagerPicks:ManagerPicks = response.data;
            return ManagerPicks
        }
        catch (err) {{handleError(err)}};
    }
    public async fetchManagerHistory(managerId:number):Promise<ManagerHistory> {
        try {
            const response = await axios.get(`${this.managerDetailsEndpoint}${managerId}/history`);
            const managerHistory:ManagerHistory = response.data;
            return managerHistory;
        }
        catch (err) {{handleError(err)}};
    }
    public async fetchLeagueDetails(leagueId:number):Promise<LeagueDetails> {
        try {
            const response = await axios.get(`${this.leagueDetailsEndpoint}${leagueId}/standings`);
            const leagueDetails:LeagueDetails = response.data;
            leagueDetails.league_name = response.data.league.name;
            return leagueDetails;
        }
        catch (err) {{handleError(err)}};
    }
}
export const myFPLTrackerService = new MyFPLTrackerService()