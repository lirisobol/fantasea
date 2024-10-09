import axios from "axios";
import { handleError } from "../utils/error-handler";
import { PlayerHistoryItem } from "../models/PlayerHistoryItems";

class PlayerHistoryService {
    private playerHistoryEndpoint = "https://fantasy.premierleague.com/api/element-summary/"
    public async fetchPlayerHistory(playerId:number): Promise<PlayerHistoryItem[]> {
        try {
            const response = await axios.get(`${this.playerHistoryEndpoint}${playerId}`)
            const history:PlayerHistoryItem[] = response.data.history;
            return history
        }
        catch (err) {{handleError(err)}};
    }
}
export const playerHistoryService = new PlayerHistoryService();