import axios from "axios";
import { appConfig } from "../../utils/AppConfig";
import { ManagerDetails } from "../../models/manager/ManagerDetails";
import { LeagueDetails } from "../../models/manager/LeagueDetails";

class MyFPLTrackerService {
    public async fetchManagerDetails(managerId:number):Promise<ManagerDetails> {
        console.log(`${appConfig.base_url}manager/${managerId}`);
        const response = await axios.get(`${appConfig.base_url}manager/${managerId}`)
        const managerDetails:ManagerDetails = response.data;
        return managerDetails       
    }

    public async fetchLeagueDetails(leagueId:number):Promise<LeagueDetails> {
        console.log(`${appConfig.base_url}/manager/league/${leagueId}`);
        const response = await axios.get(`${appConfig.base_url}manager/league/${leagueId}`);
        const leagueDetails:LeagueDetails = response.data;
        return leagueDetails        
    }
}
export const myFPLTrackerService = new MyFPLTrackerService();