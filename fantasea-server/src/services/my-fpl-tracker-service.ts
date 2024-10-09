import axios from "axios"
import { handleError } from "../utils/error-handler"
import { ManagerDetails } from "../models/ManagerDetails";

class MyFPLTrackerService {
    private managerDetailsEndpoint = "https://fantasy.premierleague.com/api/entry/"
    public async fetchManagerDetails(managerId:number):Promise<ManagerDetails> {
        try {
            console.log(`${this.managerDetailsEndpoint}${managerId}`);
            const response = await axios.get(`${this.managerDetailsEndpoint}${managerId}`)
            const managerDetails:ManagerDetails = response.data
            return managerDetails
        }
        catch (err) {{handleError(err)}}
    }
}
export const myFPLTrackerService = new MyFPLTrackerService()