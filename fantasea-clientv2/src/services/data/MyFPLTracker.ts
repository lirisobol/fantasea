import axios from "axios";
import { appConfig } from "../../utils/AppConfig";

class MyFPLTrackerService {
    public async fetchManagerDetails(managerId:number):Promise<void> {
        console.log(`${appConfig.base_url}manager/${managerId}`);
        const response = await axios.get(`${appConfig.base_url}manager/${managerId}`)
        console.log(response.data);        
    }
}
export const myFPLTrackerService = new MyFPLTrackerService();