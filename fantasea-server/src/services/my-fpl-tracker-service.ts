import axios from "axios"
import { handleError } from "../utils/error-handler"

class MyFPLTrackerService {
    private managerDetailsEndpoint = "https://fantasy.premierleague.com/api/entry/"
    public async fetchManagerDetails(managerId:number):Promise<string> {
        try {
            console.log(`${this.managerDetailsEndpoint}${managerId}`);
            const response = await axios.get(`${this.managerDetailsEndpoint}${managerId}`)
            return response.data
        }
        catch (err) {{handleError(err)}}
    }
}
export const myFPLTrackerService = new MyFPLTrackerService()