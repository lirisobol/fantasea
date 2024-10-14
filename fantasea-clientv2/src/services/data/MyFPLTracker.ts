import axios from "axios";
import { appConfig } from "../../utils/AppConfig";
import { ManagerDetails } from "../../models/manager/ManagerDetails";

class MyFPLTrackerService {
    public async fetchManagerDetails(managerId:number):Promise<ManagerDetails> {
        console.log(`${appConfig.base_url}manager/${managerId}`);
        const response = await axios.get(`${appConfig.base_url}manager/${managerId}`)
        const managerDetails:ManagerDetails = response.data;
        return managerDetails       
    }
}
export const myFPLTrackerService = new MyFPLTrackerService();