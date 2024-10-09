import axios from "axios";
import { appConfig } from "../../utils/AppConfig";
import { PlayerHistoryItem } from "../../models/PlayerHistoryItems";

class PlayerHistoryService {
    public async fetchPlayerHistory(playerId:number):Promise<PlayerHistoryItem[]> {
        const response = await axios.get(`${appConfig.base_url}player-history/${playerId}`)
        console.log(response.data);
        return response.data;
    }
}
export const playerHistoryService = new PlayerHistoryService();
// http://localhost:4000/api/player-history/54