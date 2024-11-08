import axios from "axios";
import { ManagerPicks } from "../../models/manager/ManagerPicks";
import { appConfig } from "../../utils/AppConfig";
import { DraftElement, ManagerStats } from "../../store/slices/draft";
import { Element } from "../../models/gen-info/Element";

class DraftService {
  public async importManagerTeam(
    managerId: number,
    event: number,
    elements: Element[]
  ): Promise<{ squad: DraftElement[]; managerStats: ManagerStats }> {
    const route = `${appConfig.base_url}manager/${managerId}/${event}`;
    const response = await axios.get<ManagerPicks>(route);
    const managerPicks = response.data;

    const squad = this.mapManagerPicksToDraftElements(managerPicks, elements);

    const managerStats: ManagerStats = {
      bank: managerPicks.entry_history.bank,
      event: managerPicks.entry_history.event,
      event_transfers: managerPicks.entry_history.event_transfers,
      event_transfers_cost: managerPicks.entry_history.event_transfers_cost,
      overall_rank: managerPicks.entry_history.overall_rank,
      percentile_rank: managerPicks.entry_history.percentile_rank,
      points: managerPicks.entry_history.points,
      points_on_bench: managerPicks.entry_history.points_on_bench,
      rank: managerPicks.entry_history.rank,
      rank_sort: managerPicks.entry_history.rank_sort,
      total_points: managerPicks.entry_history.total_points,
      value: managerPicks.entry_history.value,
    };

    return { squad, managerStats };
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
