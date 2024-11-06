import axios from "axios";
import { ManagerPicks } from "../../models/manager/ManagerPicks";
import { appConfig } from "../../utils/AppConfig";

class DraftService {
  /* 
        1. send currentGW
        2. send managerID
    */
  public async importManagerTeam(
    managerId: number,
    event: number
  ): Promise<ManagerPicks> {
    const route = `${appConfig.base_url}manager/${managerId}/${event}`    
    const response = await axios.get<ManagerPicks>(route);
    return response.data;
  }
}
export const draftService = new DraftService();
