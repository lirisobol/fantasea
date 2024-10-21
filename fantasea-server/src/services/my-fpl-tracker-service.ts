import axios from "axios"
import { handleError } from "../utils/error-handler"
import { ManagerDetails } from "../models/manager/ManagerDetails";
import { ManagerHistory } from "../../../fantasea-clientv2/src/models/manager/ManagerHistory";
import { LeagueDetails } from "../models/manager/LeagueDetails";

class MyFPLTrackerService {
    private managerDetailsEndpoint = "https://fantasy.premierleague.com/api/entry/"
    private leagueDetailsEndpoint = "https://fantasy.premierleague.com/api/leagues-classic/"
    public async fetchManagerDetails(managerId:number):Promise<ManagerDetails> {
        try {
            console.log(`${this.managerDetailsEndpoint}${managerId}`);
            const response = await axios.get(`${this.managerDetailsEndpoint}${managerId}`)
            const managerDetails:ManagerDetails = response.data
            managerDetails.manager_history = await this.fetchManagerHistory(managerId);
            return managerDetails
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