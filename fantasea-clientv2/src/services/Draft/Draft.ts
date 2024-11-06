import axios from "axios";
import { ManagerPicks } from "../../models/manager/ManagerPicks";
import { appConfig } from "../../utils/AppConfig";
import { DraftElement } from "../../store/slices/draft";
import { Element } from "../../models/gen-info/Element";

class DraftService {

  public async importManagerTeam(
    managerId: number,
    event: number
  ): Promise<ManagerPicks> {
    const route = `${appConfig.base_url}manager/${managerId}/${event}`    
    const response = await axios.get<ManagerPicks>(route);
    return response.data;
  }
  public mapManagerPicksToDraftElements(
    managerPicks: ManagerPicks,
    elements: Element[]
  ): DraftElement[] {
    const draftElements: DraftElement[] = [];
  
    managerPicks.picks.forEach((pick) => {
      const playerElement = elements.find((el) => el.id === pick.element);
      if (!playerElement) {
        console.error(`Player with ID ${pick.element} not found.`);
        return;
      }
  
      const draftPosition = pick.position - 1; 
      const isStarter = pick.position <= 11; // Positions 1-11 are starters
      const positionType = playerElement.element_type; // From Element data
  
      const draftElement: DraftElement = {
        positionType: positionType,
        draftPosition: draftPosition,
        isPicked: true,
        isCaptain: pick.is_captain,
        isViceCaptain: pick.is_vice_captain,
        isStarter: isStarter,
        stats: playerElement,
      };
  
      draftElements.push(draftElement);
    });
  
    return draftElements;
  }
}
export const draftService = new DraftService();
